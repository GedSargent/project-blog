"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { LayoutGroup, motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [colorIndex, setColorIndex] = React.useState(0);

  const reactId = React.useId();

  React.useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setColorIndex((index) => {
          return (index + 1) % COLORS.length;
        });

        setTimeElapsed((time) => time + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPlaying]);

  // Cycle through the colors in the COLORS array:
  const selectedColor = COLORS[colorIndex];

  const handleReset = () => {
    setTimeElapsed(0);
    setColorIndex(0);
    setIsPlaying(false);
  };

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            const layoutId = `${reactId}`;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layout="position"
                    layoutId={layoutId}
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause /> : <Play />}
              <VisuallyHidden>{isPlaying ? "Pause" : "Play"}</VisuallyHidden>
            </button>
            <button onClick={handleReset}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </LayoutGroup>
  );
}

export default CircularColorsDemo;
