import React from 'react';
import { PropTypes } from 'prop-types';

import Option from './Option';

export default function OptionList({ options, onSelectOption }) {
  const events = {
    onSelectOption
  };

  return (
    <ul className='optionList'>
      {options.map(option => (
        <Option key={option.id} option={option} {...events} />
      ))}
    </ul>
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