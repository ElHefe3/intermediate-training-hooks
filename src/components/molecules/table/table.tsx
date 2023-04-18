import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import { ActivityLoader } from '../../atoms';
import { TableProps } from './types';

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  isLoading = false,
  paginationSizeOptions = [10, 20, 30, 40, 50],
  pagination,
  setPagination,
  pageCount = 1,
}: TableProps<T>) => {
  const instance = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: pageCount,
  });

  return (
    <div>
      <div className="rounded-lg border border-gray-300">
        <table className="min-w-full table-auto divide-y divide-gray-300 text-left">
          <thead>
            {instance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} className="p-2 capitalize">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
          className="rounded border p-1 px-2"
          onClick={() => instance.setPageIndex(0)}
          disabled={!instance.getCanPreviousPage() || isLoading}
        >
          {'<<'}
        </button>
        <button
          className="rounded border p-1 px-2"
          onClick={instance.previousPage}
          disabled={!instance.getCanPreviousPage() || isLoading}
        >
          {'<'}
        </button>
        <button
          className="rounded border p-1 px-2"
          onClick={instance.nextPage}
          disabled={!instance.getCanNextPage() || isLoading}
        >
          {'>'}
        </button>
        <button
          className="rounded border p-1 px-2"
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
            className="w-16 rounded border border-gray-200 p-1"
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
