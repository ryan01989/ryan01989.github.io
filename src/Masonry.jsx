import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { gsap } from "gsap";

import "./App.css";

const useMedia = (
    queries,
    values,
    defaultValue
) => {
    const get = () =>
        values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

    const [value, setValue] = useState(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
        return () =>
            queries.forEach((q) =>
                matchMedia(q).removeEventListener("change", handler)
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries]);

    return value;
};

const useMeasure = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size];
};

const preloadImages = async (urls) => {
    await Promise.all(
        urls.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    console.log(`Preloading image: ${src}`);
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

const Masonry = ({
    items,
    ease = "power3.out",
    duration = 0.6,
    stagger = 0.05,
    animateFrom = "bottom",
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    colorShiftOnHover = false,
    maxWidth = null,
    itemsPerRow = 3,
}) => {
    const [containerRef, { width }] = useMeasure();
    const [imagesReady, setImagesReady] = useState(false);

    const getInitialPosition = (item) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return { x: item.x, y: item.y };

        let direction = animateFrom;

        if (animateFrom === "random") {
            const directions = ["top", "bottom", "left", "right"];
            direction = directions[
                Math.floor(Math.random() * directions.length)
            ];
        }

        switch (direction) {
            case "top":
                return { x: item.x, y: -200 };
            case "bottom":
                return { x: item.x, y: window.innerHeight + 200 };
            case "left":
                return { x: -200, y: item.y };
            case "right":
                return { x: window.innerWidth + 200, y: item.y };
            case "center":
                return {
                    x: containerRect.width / 2 - item.w / 2,
                    y: containerRect.height / 2 - item.h / 2,
                };
            default:
                return { x: item.x, y: item.y + 100 };
        }
    };

    useEffect(() => {
        preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
    }, [items]);

    const grid = useMemo(() => {
        if (!width) return [];

        const itemsPerRow = 3; // Fixed number of items per row
        const columnWidth = width / itemsPerRow;

        return items.map((child, index) => {
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;

            const x = columnWidth * col;
            let y = 0;

            // Calculate y position based on previous rows
            for (let r = 0; r < row; r++) {
                const rowStartIndex = r * itemsPerRow;
                const rowEndIndex = Math.min((r + 1) * itemsPerRow, items.length);
                const rowItems = items.slice(rowStartIndex, rowEndIndex);

                // Find the tallest item in this row to determine row height
                const maxRowHeight = Math.max(...rowItems.map(item => {
                    if (typeof item.height === 'string' && item.height.includes('%')) {
                        const percentage = parseFloat(item.height) / 100;
                        return window.innerHeight * percentage;
                    } else if (typeof item.height === 'number' && item.height <= 1) {
                        return window.innerHeight * item.height;
                    } else {
                        return item.height / 2;
                    }
                }));

                y += maxRowHeight;
            }

            // Calculate height for current item
            let height;
            if (typeof child.height === 'string' && child.height.includes('%')) {
                const percentage = parseFloat(child.height) / 100;
                height = window.innerHeight * percentage;
            } else if (typeof child.height === 'number' && child.height <= 1) {
                height = window.innerHeight * child.height;
            } else {
                height = child.height / 2;
            }

            return { ...child, x, y, w: columnWidth, h: height };
        });
    }, [items, width]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady || grid.length === 0) return;

        // Batch GSAP operations for better performance
        const timeline = gsap.timeline();

        grid.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const animationProps = {
                x: item.x,
                y: item.y,
                width: item.w,
                height: item.h,
            };

            if (!hasMounted.current) {
                const initialPos = getInitialPosition(item);
                timeline.fromTo(selector,
                    {
                        opacity: 0,
                        x: initialPos.x,
                        y: initialPos.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: "blur(10px)" }),
                    },
                    {
                        opacity: 1,
                        ...animationProps,
                        ...(blurToFocus && { filter: "blur(0px)" }),
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    index * stagger
                );
            } else {
                timeline.to(selector, {
                    ...animationProps,
                    duration: duration,
                    ease: ease,
                }, 0); // Start all animations at the same time
            }
        });

        hasMounted.current = true;
    }, [grid, imagesReady]);

    const handleMouseEnter = (e, item) => {
        const element = e.currentTarget;
        const selector = `[data-key="${item.id}"]`;

        if (scaleOnHover) {
            gsap.to(selector, {
                scale: hoverScale,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (colorShiftOnHover) {
            const overlay = element.querySelector(".color-overlay");
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0.3,
                    duration: 0.3,
                });
            }
        }
    };

    const handleMouseLeave = (e, item) => {
        const element = e.currentTarget;
        const selector = `[data-key="${item.id}"]`;

        if (scaleOnHover) {
            gsap.to(selector, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (colorShiftOnHover) {
            const overlay = element.querySelector(".color-overlay");
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3,
                });
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className="list"
            style={{
                ...(maxWidth && { maxWidth, margin: '0 auto' })
            }}
        >
            {grid.map((item) => {
                return (
                    <div
                        key={item.id}
                        data-key={item.id}
                        className="item-wrapper"
                        onClick={() => {
                            // Option A: Open image directly
                            window.open(item.img, "_blank", "noopener");

                            // Option B: Open with custom viewer (uncomment if using image-viewer.html)
                            // window.open(`/image-viewer.html?img=${encodeURIComponent(item.img)}&title=${encodeURIComponent(item.id)}`, "_blank", "noopener");
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, item)}
                        onMouseLeave={(e) => handleMouseLeave(e, item)}
                    >
                        <div className="item-img">
                            <img
                                src={item.img}
                                alt=""
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                            {colorShiftOnHover && (
                                <div
                                    className="color-overlay"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background:
                                            "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                                        opacity: 0,
                                        pointerEvents: "none",
                                        borderRadius: "8px",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Masonry;