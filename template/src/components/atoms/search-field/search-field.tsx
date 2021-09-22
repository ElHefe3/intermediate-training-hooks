import React, { useState, useCallback } from 'react';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import _ from 'lodash';

import { SearchFieldProps } from '../../../types';

export const SearchField: React.FC<SearchFieldProps> = ({ placeholder, onChange }) => {
  const [search, setSearch] = useState('');

  const validateInputDebounce = useCallback(
    _.debounce((value) => onChange(value), 500),
    [],
  );

  const onSearchChange = (e: any) => {
    setSearch(e.target.value);
    validateInputDebounce(e.target.value);
  };

  return (
    <Paper className="flex mb-1">
      <IconButton>
        <Search />
      </IconButton>
      <InputBase
        value={search}
        placeholder={placeholder}
        className="w-full"
        onChange={onSearchChange}
      />
    </Paper>
  );
};
