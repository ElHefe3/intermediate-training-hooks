import React from 'react';
import _ from 'lodash';

import { FlatListProps } from '../../../types';

export const FlatList: React.FC<FlatListProps> = ({
  data,
  renderItem,
  ListEmptyComponent = undefined,
}) => {
  const forEachItem = (item) => renderItem({ item });

  if (data.length === 0) {
    return <>{ListEmptyComponent}</>;
  }

  return <>{_.map(data, forEachItem)}</>;
};
