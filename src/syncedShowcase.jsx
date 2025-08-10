import React, { useState, useEffect } from "react";
import CardSwap, { Card } from "./CardSwap";
import FadingParagraph from "./FadingParagraph";

const SyncedShowcase = () => {
  const delay = 8000; // same delay for both

  const [index, setIndex] = useState(0);
  const totalItems = 3; // number of cards/texts

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalItems);
    }, delay);

    return () => clearInterval(interval);
  }, [totalItems, delay]);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* CardSwap with controlled index */}
      <CardSwap
        activeIndex={index} // you'll modify CardSwap to accept this
        delay={delay}
        autoPlay={false} // prevent CardSwap from running its own timer
      >
        <Card>
          <h3>ResearchSphereU</h3>
          <img
            style={{
              width: "100%",
              height: "85%",
              overflow: "hidden",
              borderRadius: "0px 0px 12px 12px",
            }}
            src="./assets/researchsphereupreview.png"
            alt="ResearchSphereU"
          />
        </Card>
        <Card>
          <h3>AIDRIN</h3>
          <img
            style={{
              width: "100%",
              height: "86%",
              overflow: "hidden",
              borderRadius: "0px 0px 12px 12px",
            }}
            src="./assets/AIDRINpreview.png"
            alt="AIDRIN"
          />
        </Card>
        <Card>
          <h3>Task Manager Desk Lamp</h3>
          <img
            style={{
              width: "100%",
              height: "85%",
              overflow: "hidden",
              borderRadius: "0px 0px 12px 12px",
            }}
            src="./assets/Lamppreview.JPEG"
            alt="Task Manager Desk Lamp"
          />
        </Card>
      </CardSwap>

      {/* FadingParagraph with controlled index */}
      <div className="fading-paragraph">
        <FadingParagraph activeIndex={index} delay={delay} />
      </div>
    </div>
  );
};

export default SyncedShowcase;
