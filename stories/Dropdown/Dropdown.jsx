import React from 'react';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

import Option from './Option';
import ToolbarOption from './ToolbarOption';
import './dropdown.css';

export default function Dropdown({ options }) {

  return (
    <div className='multiselectContainer'>
      <div className={'multiselectToolbar'}
        onClick={() => {null}}>
        {
          options.size > 0 ?
            [...options].map((title, idx) => {
              const upperTitle = title.toUpperCase();
            })
            :
            <div className='placeholder'>College</div>
        }
        <svg width="32" height="32" stroke="#ccc" fill="#ccc"
          className={`checkbox`}
          id="dropdown-arrow">
          <path d="m4 16 l 8 8 l 8 -8" />
        </svg>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}