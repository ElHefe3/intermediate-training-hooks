import { useLocation, useNavigate } from 'react-router-dom';
import { createTable } from '@tanstack/react-table';

import { Button, Table } from '@project/components';
import { useUsersData, usePagination } from '@project/hooks';
import { User } from '@project/queries';
import { UserPageProps } from './types';

export const UsersPage = ({ isArchived }: UserPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useUsersData(isArchived);
  const [pagination, setPagination] = usePagination(userData.pagination.currentPage);
  const table = createTable().setRowType<User>();

  const onEdit = (id: number) => {
    navigate(isArchived ? `/users/archived/${id}/edit` : `/users/${id}/edit`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  const columns = [
    table.createDataColumn('id', {
      cell: (info) => info.getValue(),
      header: () => <span>ID</span>,
    }),
    table.createDataColumn('email', {
      cell: (info) => info.getValue(),
      header: () => <span>Email</span>,
    }),
    table.createDataColumn('firstName', {
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
    }),
    table.createDataColumn('lastName', {
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
    }),
    table.createDisplayColumn({
      id: 'Actions',
      cell: ({ row }) => {
        const { id } = row.original as User;

        return (
          <span>
            <Button onClick={() => onEdit(id)}>Edit</Button>
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
    <div className="p-2 space-y-2">
      <h1 className="text-3xl">{isArchived && 'Archived '}Users</h1>
      {!isArchived && <Button onClick={onNewUser}>New User</Button>}
      <Table
        table={table}
        columns={columns}
        data={userData.users}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};
