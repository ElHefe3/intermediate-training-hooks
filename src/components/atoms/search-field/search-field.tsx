import React, { useState, useCallback, ChangeEvent } from 'react';
import _ from 'lodash';

import { SearchFieldProps } from './types';

export const SearchField: React.FC<SearchFieldProps> = ({ placeholder, onChange }) => {
  const [search, setSearch] = useState('');

  const validateInputDebounce = useCallback(
    _.debounce((value) => onChange(value), 500),
    [],
  );

  const onSearchChange = (e: ChangeEvent<any>) => {
    setSearch(e.target.value);
    validateInputDebounce(e.target.value);
  };

  return (
    <div className="flex mb-1">
      <input
        value={search}
        placeholder={placeholder}
        className="w-full"
        onChange={onSearchChange}
      />
    </div>
  );
};
