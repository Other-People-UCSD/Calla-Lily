import React from 'react';
import { PropTypes } from 'prop-types';

import '../../styles/uc.module.scss';

export default function ToolbarOption({ option: { id, title }, onRemoveOption }) {
  return (
    <li
      key={id}
      className='selectedFilterItem'
      onClick={(e) => onRemoveOption(e, id)}>

      {title}

      <svg width={20} height={20}>
        <circle cx="10" cy="10" r="5" fill='black' stroke="black"></circle>
      </svg>
    </li>
  );
}


ToolbarOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onRemoveOption: PropTypes.func
}