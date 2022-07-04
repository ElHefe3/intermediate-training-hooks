import { getCoreRowModel, useTableInstance, getPaginationRowModel } from '@tanstack/react-table';

import { ActivityLoader } from '@project/components';
import { TableProps } from './types';

export const Table = <T extends Record<string, unknown>>({
  table,
  columns,
  data,
  isLoading = false,
  paginationSizeOptions = [10, 20, 30, 40, 50],
  pagination,
  setPagination,
}: TableProps<T>) => {
  const instance = useTableInstance(table, {
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="border border-gray-300 rounded-lg">
        <table className="table-auto min-w-full text-left divide-y divide-gray-300">
          <thead>
            {instance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} className="capitalize p-2">
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {instance.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {cell.renderCell()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1 px-2"
          onClick={() => instance.setPageIndex(0)}
          disabled={!instance.getCanPreviousPage() || isLoading}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1 px-2"
          onClick={instance.previousPage}
          disabled={!instance.getCanPreviousPage() || isLoading}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1 px-2"
          onClick={instance.nextPage}
          disabled={!instance.getCanNextPage() || isLoading}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1 px-2"
          onClick={() => instance.setPageIndex(instance.getPageCount() - 1)}
          disabled={!instance.getCanNextPage() || isLoading}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {instance.getState().pagination.pageIndex + 1} of {instance.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={instance.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              instance.setPageIndex(page);
            }}
            className="border border-gray-200 p-1 rounded w-16"
            disabled={isLoading}
          />
        </span>
        <select
          value={instance.getState().pagination.pageSize}
          onChange={(e) => {
            instance.setPageSize(Number(e.target.value));
          }}
          className="border-gray-200"
          disabled={isLoading}
        >
          {paginationSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <ActivityLoader isLoading={isLoading} />
      </div>
      <div>{instance.getRowModel().rows.length} Rows</div>
    </div>
  );
};
