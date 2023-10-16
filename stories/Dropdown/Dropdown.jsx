import React from 'react';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

import Option from './Option';
import ToolbarOption from './ToolbarOption';
import './dropdown.scss';

export default function Dropdown({ options }) {
  const [showDropdown, setShowDropdown] = useState(false);

  function displayDropdownMenu() {
    setShowDropdown(!false);
  }

  return (
    <div className='multiselectContainer'>
      <div className={'multiselectToolbar'}
        onClick={displayDropdownMenu}>
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
      {showDropdown &&
            <div className={`multiselectDropdown`}>
              {
                // filterData.colleges.map((college, idx) => {
                //   const collegeTitle = college.toUpperCase();
                //   let checkboxFillColor = "#cbcbcb";
                //   if (filter.has(filterData.colleges[idx])) {
                //     checkboxFillColor = "#333"
                //   }
                //   return <li key={idx}
                //     onClick={(e) => handleFilterChange(e, idx)}
                //     className={ucStyles.filterItem}>
                //     <svg width="16" height="16" fill={checkboxFillColor} stroke={checkboxFillColor}
                //       className={ucStyles.checkbox}>
                //       <rect x="0" y="0" width="16" height="16" rx="4px" />
                //     </svg>
                //     <div>{collegeTitle}</div>
                //   </li>
                // })
              }
            </div>
          }
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}