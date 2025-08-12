import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { gsap } from "gsap";
import "./App.css";

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
    itemsPerRow = 3
}) => {
    const [containerRef, { width }] = useMeasure();
    const [loadedItems, setLoadedItems] = useState({});
    const hasMounted = useRef(false);

    // Progressive image load
    const handleImageLoad = (id) => {
        setLoadedItems((prev) => ({ ...prev, [id]: true }));
    };

    // Compute grid layout in O(n)
    const grid = useMemo(() => {
        if (!width) return [];
        const columnWidth = width / itemsPerRow;
        const rowHeights = [];
        return items.map((child, index) => {
            const col = index % itemsPerRow;
            const row = Math.floor(index / itemsPerRow);
            const y = rowHeights.slice(0, row).reduce((a, b) => a + b, 0);

            let height;
            if (typeof child.height === "string" && child.height.includes("%")) {
                height = (parseFloat(child.height) / 100) * window.innerHeight;
            } else if (typeof child.height === "number" && child.height <= 1) {
                height = window.innerHeight * child.height;
            } else {
                height = child.height / 2;
            }

            if (!rowHeights[row]) rowHeights[row] = height;

            return {
                ...child,
                x: columnWidth * col,
                y,
                w: columnWidth,
                h: height
            };
        });
    }, [items, width, itemsPerRow]);

    // Animate only once on mount
    useLayoutEffect(() => {
        if (!hasMounted.current && grid.length > 0) {
            const tl = gsap.timeline();
            const containerRect = containerRef.current?.getBoundingClientRect();
            grid.forEach((item, index) => {
                const initialPos = getInitialPosition(item, animateFrom, containerRect);
                tl.fromTo(
                    `[data-key="${item.id}"]`,
                    {
                        opacity: 0,
                        x: initialPos.x,
                        y: initialPos.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: "blur(10px)" })
                    },
                    {
                        opacity: 1,
                        x: item.x,
                        y: item.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: "blur(0px)" }),
                        duration: 0.8,
                        ease,
                    },
                    index * stagger
                );
            });
            hasMounted.current = true;
        }
    }, [grid, ease, stagger, animateFrom, blurToFocus]);

    // On resize → cheap position/size updates
    useLayoutEffect(() => {
        if (hasMounted.current) {
            grid.forEach((item) => {
                gsap.set(`[data-key="${item.id}"]`, {
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h
                });
            });
        }
    }, [grid]);

    const handleMouseEnter = (item) => {
        if (scaleOnHover) {
            gsap.to(`[data-key="${item.id}"]`, {
                scale: hoverScale,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = (item) => {
        if (scaleOnHover) {
            gsap.to(`[data-key="${item.id}"]`, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="list"
            style={{
                ...(maxWidth && { maxWidth, margin: "0 auto" })
            }}
        >
            {grid.map((item) => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className="item-wrapper"
                    onClick={() => window.open(item.img, "_blank", "noopener")}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={() => handleMouseLeave(item)}
                >
                    <div className="item-img">
                        <img
                            src={item.img}
                            alt=""
                            onLoad={() => handleImageLoad(item.id)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                                opacity: loadedItems[item.id] ? 1 : 0,
                                transition: "opacity 0.5s ease"
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
                                    borderRadius: "8px"
                                }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

function getInitialPosition(item, animateFrom, containerRect) {
    let direction = animateFrom;
    if (animateFrom === "random") {
        const dirs = ["top", "bottom", "left", "right"];
        direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    switch (direction) {
        case "top": return { x: item.x, y: -200 };
        case "bottom": return { x: item.x, y: window.innerHeight + 200 };
        case "left": return { x: -200, y: item.y };
        case "right": return { x: window.innerWidth + 200, y: item.y };
        case "center": return {
            x: containerRect.width / 2 - item.w / 2,
            y: containerRect.height / 2 - item.h / 2
        };
        default: return { x: item.x, y: item.y + 100 };
    }
}

export default Masonry;
