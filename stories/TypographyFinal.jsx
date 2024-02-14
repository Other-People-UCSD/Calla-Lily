import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import styles from './stylesheet.module.scss';

export function TypoVariant({ typography: {size, usage, example, weight, color }, family}) {
  const exampleStyle = {
    fontSize: size,
    fontWeight: weight,
    color: color,
    fontFamily: family,
    margin: 0,
    lineHeight: 1.2,
  }

  return (
    <>
      <div className={styles["typo-token__item"]}>
        <div>
          <p className={styles["typo-token__item__header"]}>Font Size</p>
          <p className={styles["typo-token__item__info"]}>{size}</p>
          <p className={styles["typo-token__item__header"]}>Usage</p>
          <p className={styles["typo-token__item__info"]}>{usage}</p>
        </div>
        <div>
          <p className={styles["typo-token__item__header"]}>Example</p>
          <p style={exampleStyle}>{example}</p>
        </div>
      </div>
    </>
  )
}


const FontSize = styled.span(props => ({
  color: props.color,
  fontFamily: props.family,
  marginRight: '8px',
}));

export default function TypoFamily({ familyName, family, typoFamilyItems }) {
  return (
    <div className={styles.family}>
      <p className={styles["family__header"]}>Font Family</p>
      <h2>{familyName}</h2>
      {
        typoFamilyItems.map((item, idx) => {
          console.log(item)
          console.log(family)
          return <TypoVariant key={idx} typography={item} family={family} />
        })
      }
    </div>
  );
}

TypoFamily.PropTypes = {
  family: PropTypes.string,
  typoFamilyItems: PropTypes.array,
}

TypoVariant.PropTypes = {
  item: PropTypes.shape({
    size: PropTypes.string,
    weight: PropTypes.string,
    text: PropTypes.string,
  }),
}