import React, { useState, useCallback, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';

import { SearchFieldProps } from './types';

export const SearchField: React.FC<SearchFieldProps> = ({ placeholder, onChange }) => {
  const [search, setSearch] = useState('');

  const validateInputDebounce = useCallback(
    debounce((value) => onChange(value), 500),
    [],
  );

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    validateInputDebounce(e.target.value);
  };

  return (
    <div className="mb-1 flex">
      <input
        value={search}
        placeholder={placeholder}
        className="w-full"
        onChange={onSearchChange}
      />
    </div>
  );
};
