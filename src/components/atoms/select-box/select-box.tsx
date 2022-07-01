import React, { useCallback } from 'react';
import Select, { components, StylesConfig, MultiValueProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';

import { SelectBoxProps } from './types';

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
  maxSelect = 3,
}) => {
  const styles: StylesConfig = {
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
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: 'bold',
      textDecoration: 'underline',
    }),
  };

  const getAsyncOptions = (inputText: string) =>
    new Promise((resolve) => {
      setTimeout(resolve, 1, onLoadOptions(inputText));
    });

  const loadOptions = useCallback(
    _.debounce((inputText, callback) => {
      getAsyncOptions(inputText).then((response) => callback(response));
    }, 500),
    [],
  );

  const MultiValue: React.FC<MultiValueProps<any, any>> = (multiProps) => {
    const index = _.get(multiProps, 'index', 0);
    const { ...props } = multiProps;

    if (_.lt(index, maxSelect))
      return <components.MultiValue {...props}>{props.children}</components.MultiValue>;

    if (_.eq(index, maxSelect)) {
      const overflow = _.get(multiProps, 'getValue')()
        .slice()
        .map((_item) => _item.label);
      const _label = `+ ${overflow.length} selected`;

      return (
        <div
          className="bg-gray-200 ml-auto p-1 order-last rounded-sm text-xs"
          title={overflow.join(', ')}
        >
          {_label}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <label className={`mb-1 ${error ? 'text-danger' : ''}`}>{label}</label>
      <div className="z-20">
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
            components={{ MultiValue }}
          />
        )}
      </div>
      <div className="text-danger text-xs mt-1">{error}</div>
    </>
  );
};
