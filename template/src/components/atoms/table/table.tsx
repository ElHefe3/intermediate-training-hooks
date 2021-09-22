import { Button, Icon } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import _ from 'lodash';

import { ActivityLoader } from '../activity-loader/activity-loader';
import { TableProps } from '../../../types';

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  isLoading,
  hasPagination = true,
  pageNumber,
  onPageChange,
  maxPage,
  onRowClick = () => undefined,
  maxCount,
}) => {
  const [canPreviousPage, setCanPreviousPage] = useState(false);
  const [canNextPage, setCanNextPage] = useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: maxPage,
    },
    usePagination,
  );

  useEffect(() => {
    if (pageNumber <= 1) {
      setCanPreviousPage(false);
    } else {
      setCanPreviousPage(true);
    }
    if (maxPage > pageNumber) {
      setCanNextPage(true);
    } else {
      setCanNextPage(false);
    }
  }, [pageNumber, maxPage]);

  const onNextPage = () => {
    nextPage();
    onPageChange(pageNumber + 1);
  };

  const onPreviousPage = () => {
    previousPage();
    onPageChange(pageNumber - 1);
  };

  const Pagination = () => {
    if (!hasPagination) {
      return null;
    }

    return (
      <div className="pagination flex items-center">
        <Button onClick={onPreviousPage} disabled={!canPreviousPage}>
          <Icon className={canPreviousPage ? 'color-black' : 'color-grey-200'}>chevron_left</Icon>
        </Button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageNumber} of {pageCount}
          </strong>
        </span>
        <Button onClick={onNextPage} disabled={!canNextPage}>
          <Icon className={canNextPage ? 'color-black' : 'color-grey-200'}>chevron_right</Icon>
        </Button>{' '}
        <div>{maxCount} records found</div>
        <div className="mx-1">
          <ActivityLoader isLoading={isLoading} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Pagination />
      <div className="align-middle inline-block w-full">
        <div className="shadow border-b border-gray-200 sm:rounded-lg">
          <table {...getTableProps} className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} onClick={() => onRowClick(_.get(row, 'original.id'))}>
                    {row.cells.map((cell) => {
                      return (
                        <td className="px-6 py-4 whitespace-nowrap" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
