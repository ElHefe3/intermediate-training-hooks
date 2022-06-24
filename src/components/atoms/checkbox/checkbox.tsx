import React from 'react';

import { CheckboxProps } from './types';

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  color = 'primary',
  checked,
  onChange,
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      id={name}
      color={color}
      className="rounded-sm focus:outline-none focus:ring-0"
      checked={checked}
      onChange={onChange}
    />
  );
};
