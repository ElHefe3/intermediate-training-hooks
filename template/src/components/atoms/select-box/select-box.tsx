import React, { useCallback } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { InputLabel, Paper } from '@material-ui/core';
import _ from 'lodash';

import { SelectBoxProps } from '../../../types';

export const SelectBox: React.FC<SelectBoxProps> = ({
  name,
  label,
  placeholder,
  options,
  onChange,
  isMulti = false,
  defaultValue,
  value,
  error,
  isAsync = false,
  onLoadOptions = () => [],
}) => {
  const styles = {
    control: ({ ...provided }) => ({
      ...provided,
      border: 0,
      padding: 6,
      '&:hover': {
        borderColor: 'transparent',
      },
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 100,
    }),
  };

  const getAsyncOptions = (inputText) =>
    new Promise((resolve) => {
      setTimeout(resolve, 1, onLoadOptions(inputText));
    });

  const loadOptions = useCallback(
    _.debounce((inputText, callback) => {
      getAsyncOptions(inputText).then((response) => callback(response));
    }, 500),
    [],
  );

  return (
    <div>
      <InputLabel className={`mb-1 ${error ? 'text-danger' : ''}`}>{label}</InputLabel>
      <Paper className="z-20">
        {isAsync ? (
          <AsyncSelect
            menuPosition="fixed"
            isMulti={isMulti}
            defaultOptions={options}
            placeholder={placeholder}
            value={defaultValue}
            loadOptions={loadOptions}
            onChange={onChange}
            styles={styles}
          />
        ) : (
          <Select
            menuPosition="fixed"
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            isMulti={isMulti}
            name={name}
            options={options}
            onChange={onChange}
            styles={styles}
          />
        )}
      </Paper>
      <div className="text-danger text-xs mt-1">{error}</div>
    </div>
  );
};
