"use client";
import clsx from "clsx";
import React from "react";

import Card from "@/components/Card";
import SliderControl from "@/components/SliderControl";
import { range } from "@/utils";
import { LayoutGroup, motion } from "framer-motion";

import styles from "./DivisionGroupsDemo.module.css";
import Equation from "./Equation";

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  const reactId = React.useId();

  const [numOfGroups, setNumOfGroups] = React.useState(initialNumOfGroups);

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : null;

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        };

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <header className={styles.header}>
          <SliderControl
            label="Number of Groups"
            className={styles.slider}
            step={1}
            min={1}
            max={4}
            value={numOfGroups}
            onChange={(ev) => setNumOfGroups(Number(ev.target.value))}
          />
        </header>

        <div className={styles.demoWrapper}>
          <div className={clsx(styles.demoArea)} style={gridStructure}>
            {range(numOfGroups).map((groupIndex) => (
              <div key={groupIndex} className={styles.group}>
                {range(numOfItemsPerGroup).map((index) => {
                  const totalInPreviousGroups = groupIndex * numOfItemsPerGroup;
                  const layoutId = `${reactId}-${
                    totalInPreviousGroups + index
                  }`;

                  return (
                    <motion.div
                      layoutId={layoutId}
                      layout="position"
                      key={layoutId}
                      className={styles.item}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {includeRemainderArea && (
          <div className={styles.remainderArea}>
            <p className={styles.remainderHeading}>Remainder Area</p>

            {range(remainder).map((index) => {
              const totalInGroups = numOfGroups * numOfItemsPerGroup;
              const layoutId = `${reactId}-${totalInGroups + index}`;

              return (
                <motion.div
                  key={layoutId}
                  layout="position"
                  layoutId={layoutId}
                  className={styles.item}
                />
              );
            })}
          </div>
        )}

        <Equation
          dividend={numOfItems}
          divisor={numOfGroups}
          remainder={remainder}
        />
      </Card>
    </LayoutGroup>
  );
}

export default DivisionGroupsDemo;
