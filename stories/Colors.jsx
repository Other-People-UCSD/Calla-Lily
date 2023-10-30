import React from "react";

import styles from "./colors.module.scss";

export default function Colors() {
  return (
    <div>
      <h2>Background</h2>
      <h3>White: #fff</h3>
      <ForeBackContainer foregroundColor={"#151515"} backgroundColor={"#fff"} />
      <h3>Black: #151515</h3>
      <ForeBackContainer foregroundColor={"#fff"} backgroundColor={"#151515"} />
    </div>
  );
}


const ForeBackContainer = ({ foregroundColor, backgroundColor }) => {
  return <div className={styles["foreback-container"]}>
      <Square s={100} fill={backgroundColor} className={styles["background-square"]} />
      <Square s={75} fill={foregroundColor} className={styles["foreground-square"]} />
    </div>
}

const Square = ({ s, fill, className }) => {
  return <svg width={s} height={s} className={className}>
    <rect width={s} height={s} fill={fill} stroke="#000"></rect>
  </svg>
}