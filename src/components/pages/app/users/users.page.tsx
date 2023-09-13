import { useLocation, useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import _ from 'lodash';

import { Button, Table, User } from '@project/components';
import { usePagination } from '@project/hooks';
import { UserPageProps } from './types';
import { useUsersQuery } from '@project/queries';

export const UsersPage = ({ isArchived }: UserPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pagination, setPagination] = usePagination();
  const { data, isLoading } = useUsersQuery(
    pagination.pageIndex,
    pagination.pageSize,
    isArchived ?? false,
  );
  const columnHelper = createColumnHelper<User>();

  const onEdit = (id: number) => {
    navigate(isArchived ? `/users/archived/${id}/edit` : `/users/${id}/edit`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: () => <span>ID</span>,
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.getValue(),
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor('firstName', {
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
    }),
    columnHelper.accessor('lastName', {
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
    }),
    columnHelper.display({
      id: 'Actions',
      cell: ({ row }) => {
        const { id } = row.original;

        return (
          <span>
            <Button isDisabled={_.isUndefined(id)} onClick={() => onEdit(id ?? 0)}>
              Edit
            </Button>
          </span>
        );
      },
    }),
  ];

  const onNewUser = () => {
    navigate(`/users/new`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  return (
    <div className="space-y-2 p-2">
      <h1 className="text-3xl">{isArchived && 'Archived '}Users</h1>
      {!isArchived && <Button onClick={onNewUser}>New User</Button>}
      <Table
        columns={columns}
        data={data?.users ?? []}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={data?.pagination?.totalPages}
      />
    </div>
  );
};
