import React, { ReactNode } from 'react';

type SubItem = {
  name: string;
  link: string;
  matchLinks: string[] | [];
  ignoreLinks?: string[] | [];
};

export type DrawerItemProps = {
  name: string;
  link?: string;
  icon: string;
  subItems?: SubItem[] | [];
  matchLinks?: string[] | [];
  ignoreLinks?: string[] | [];
  strict?: boolean;
};

export type NavIconButtonProps = {
  icon: string;
  count: number;
};

export type SearchFieldProps = {
  placeholder: string;
  onChange: any;
};

export type LoaderProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

export type ActivityLoaderProps = {
  isLoading: boolean;
};

export type SelectBoxProps = {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[] | any;
  onChange: any;
  isMulti?: boolean;
  defaultValue?: any | undefined;
  value?: any | undefined;
  error?: string;
  isAsync?: boolean;
  onLoadOptions?: Function;
};

export type TableProps = {
  columns: {}[];
  data: {}[];
  isLoading: boolean;
  hasPagination?: boolean;
  pageNumber?: number;
  onPageChange?: Function;
  onRowClick?: ((id: number) => void) | (() => void);
  maxPage?: number;
  maxCount?: number;
};

export type FlatListProps = {
  data: any[];
  renderItem: ({ item }: { item: any }) => ReactNode;
  ListEmptyComponent?: ReactNode;
};
