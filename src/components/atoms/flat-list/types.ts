import { ReactNode } from 'react';

export type FlatListProps = {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => ReactNode;
  ListEmptyComponent?: ReactNode | JSX.Element;
};
