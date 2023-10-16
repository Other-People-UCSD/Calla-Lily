import React from 'react';
import { PropTypes } from 'prop-types';

import '../../styles/uc.module.scss';

export default function Option({ option: { id, title, state }, onSelectOption }) {
  let checkboxFillColor = "#cbcbcb";
  if (state === "SELECTED") {
    checkboxFillColor = "#333"
  }

  return (
    <li
      key={id}
      className='filterItem'
      onClick={onSelectOption}>

      <svg width="16" height="16" fill={checkboxFillColor} stroke={checkboxFillColor}
        className={"checkbox"}>
        <rect x="0" y="0" width="16" height="16" rx="4px" />
      </svg>

      <div>{title}</div>
    </li>
  );
}


Option.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  onSelectOption: PropTypes.func
}