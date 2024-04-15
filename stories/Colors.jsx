import React from "react";

import styles from "./colors.module.scss";

export default function Colors() {
  return (
    <div>
      <h2>Base Colors</h2>
      <h3>White: #FFFDF8</h3>
      <ForeBackContainer foregroundColor={"#F4BAB980"} backgroundColor={"#FFFDF8"} />
      <h3>Black: #303030</h3>
      <ForeBackContainer foregroundColor={"#F4BAB980"} backgroundColor={"#303030"} />

      <div className={styles.color__section}>
        <h2>Main Tags</h2>
        <div className={styles.color__section__flexbox}>
          <ColorContainer color="#DF7D64" dark tag="Poetry"  />
          <ColorContainer color="#9A2A55" dark tag="Fiction"  />
          <ColorContainer color="#438DCC" dark tag="Nonfiction" />
          <ColorContainer color="#558D61" dark tag="Visual" />
          <ColorContainer color="#000000" dark tag="Content" />
        </div>
      </div>

      <div className={styles.color__section}>
        <h2>Collections</h2>
        <div className={styles.color__section__flexbox}>
          <ColorContainer color="#F5CFE0" tag="1" dark />
          <ColorContainer color="#5F7F2A" tag="2" dark />
          <ColorContainer color="#FDC436" tag="3" dark />
          <ColorContainer color="#7450DC" tag="4" dark  />
          <ColorContainer color="#256A90" tag="3" dark  />
          <ColorContainer color="#C1345E" tag="4" dark  />
        </div>
      </div>

    </div>
  );
}


const ForeBackContainer = ({ foregroundColor, backgroundColor }) => {
  return <div className={styles["foreback-container"]}>
    <Circle s={100} fill={backgroundColor} className={styles["background-square"]} text={backgroundColor} />
    <Circle s={75} fill={foregroundColor} className={styles["foreground-square"]} text={foregroundColor} />
  </div>
}

const Circle = ({ s, fill, text, className }) => {
  return <svg width={2 * s + 10} height={2 * s + 10} className={className}>
    <circle cx={s + 5} cy={s + 5} r={s} fill={fill} stroke="#303030"></circle>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">{text}</text>
  </svg>
}

const ColorContainer = ({ tag, color, dark }) => {
  const darkText = dark ? `${styles['circle__text--dark']}` : '';  
  return <div>
    <CircleDiv fill={color} text={color} textClass={darkText}></CircleDiv>
    <p style={{ textAlign: "center"}}>{tag}</p>
  </div>
}

const CircleDiv = ({ fill, text, circleClass='', textClass='' }) => {
  return <div title={text}  className={`${styles.circle} ${circleClass}`} style={{ backgroundColor: fill, width: "100px", height: "100px" }}>
    <p className={`${styles.circle__text} ${textClass}`}>{text}</p>
  </div>
}