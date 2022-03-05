import { useMemo } from 'react';
import {
  useTable,
  usePagination, useSortBy, CellProps,
} from 'react-table';

import type {
  Row,
  Column,
  TableInstance,
} from 'react-table';

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  // SortAscendingIcon,
  // SortDescendingIcon,
} from '@heroicons/react/solid';

import Button from '../Button';

// Required workaround for missing TypesScript definitions.
// Will be fixed in react-table v8
// see also https://github.com/tannerlinsley/react-table/issues/3064
// eslint-disable-next-line @typescript-eslint/ban-types
type TableTypeWorkaround<T extends Object> = TableInstance<T> & {
  page: Row<T>[];
  pageCount: number;
  pageOptions: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
  state: {
    pageIndex: number;
    pageSize: number;
  }
};

function NameCell({
  cell,
}: CellProps<User>) {
  const props = cell.getCellProps();
  // eslint-disable-next-line no-console
  console.log(props);
  return (
    <div className="flex items-center">
      test
    </div>
  );
}

// type SortIconProps = {
//   isSortedDesc: boolean;
// };

// function SortIcon({ isSortedDesc }: SortIconProps) {
//   return isSortedDesc
//   ? <SortDescendingIcon className="w-4 h-4" /> : <SortAscendingIcon className="w-4 h-4" />;
// }

export default function LeaderboardTable({ users }: { users: User[] }) {
  const data = useMemo(() => users, [users]);
  const columns = useMemo<Column<User>[]>(() => [
    {
      Header: 'Name',
      accessor: 'first_name',
      Cell: NameCell,
      disableSortBy: true,
      minWidth: 350,
      maxWidth: 350,
      totalWidth: 350,
    },
    {
      Header: 'Login',
      accessor: 'login',
      minWidth: 350,
      maxWidth: 350,
      totalWidth: 350,
    },
    {
      Header: 'Score',
      accessor: 'score',
      minWidth: 150,
      maxWidth: 150,
      totalWidth: 150,
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<User>(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  ) as TableTypeWorkaround<User>;

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="inline-flex">
                            {column.render('Header')}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td className="px-6 py-3 whitespace-nowrap" {...cell.getCellProps()}>
                            <div className="flex items-center">
                              {cell.render('Cell')}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 flex items-center justify-between sticky top-full">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button variant="icon" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
          <Button variant="icon" onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-gray-700">
              {`Page ${pageIndex + 1} of ${pageOptions.length}`}
            </span>
            <label htmlFor="pageSize">
              <span className="sr-only">Items Per Page</span>
              <select
                id="pageSize"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 20].map((size) => (
                  <option key={size} value={size}>{`Show ${size}`}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <Button
                variant="icon"
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Button>
              <Button
                variant="icon"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Button>
              <Button
                variant="icon"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Button>
              <Button
                variant="icon"
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
