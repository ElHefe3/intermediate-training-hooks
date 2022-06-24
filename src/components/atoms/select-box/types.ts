import { BaseOption } from '@project/types';

export type SelectBoxProps = {
  name: string;
  label: string;
  placeholder: string;
  options: BaseOption[] | any;
  onChange: (arg0: any) => void;
  isMulti?: boolean;
  defaultValue?: any | undefined;
  value?: any | undefined;
  error?: string;
  isAsync?: boolean;
  onLoadOptions?: (arg0: any) => any[];
  maxSelect?: number;
};
