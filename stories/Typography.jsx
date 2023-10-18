import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import sheetStyles from './stylesheet.module.scss';

export function TypographyObject({ typography: {size, weight, color, family, text}}) {
  const styles = {
    fontSize: size,
    fontWeight: weight,
    color: color,
    fontFamily: family,
    margin: '0',
    lineHeight: '1.2',
    textWrap: 'nowrap',
  }

  return (
    <p style={styles}>
      {text}
    </p>
  )
}


const FontSize = styled.span(props => ({
  color: props.color,
  fontFamily: props.family,
  marginRight: '8px',
}));

export default function Typography({ typographyList }) {
  return (
    <div className={sheetStyles.block}>
      {typographyList.map((typography, idx) => {
        return (
          <div className={sheetStyles.block__row}>
            <FontSize {...typography}>{typography.size}</FontSize>
            <TypographyObject typography={typography} key={idx} />
          </div>
        );
      })}
    </div>
  );
}

Typography.PropTypes = {
  typographyList: PropTypes.array,
}

TypographyObject.PropTypes = {
  typography: PropTypes.shape({
    size: PropTypes.string,
    weight: PropTypes.string,
    color: PropTypes.string,
    family: PropTypes.string,
    text: PropTypes.string,
  }),
}