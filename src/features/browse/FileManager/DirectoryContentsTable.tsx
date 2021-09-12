import { Directory, UserFile } from '@sherapp/sher-shared';
import React, { useMemo } from 'react';
import {
  Column,
  Row,
  useFlexLayout,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import IndeterminateCheckbox from '../../../components/IndeterminateCheckbox';

type DirectoryOrFile = Directory | UserFile;

interface Props {
  data: DirectoryOrFile[];
}

const DirectoryContentsTable = ({ data }: Props) => {
  const columns: Column<DirectoryOrFile>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (i) => ('name' in i ? i.name : i.fileName),
        width: 600
      },
      {
        Header: 'Size',
        accessor: (i) => ('length' in i ? i.length : '-')
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<DirectoryOrFile>(
    { data: data, columns },
    useFlexLayout,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }: { row: Row<DirectoryOrFile> }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
          width: 50
        },
        ...columns
      ]);
    }
  );

  return (
    <div className="rounded overflow-hidden border">
      <table className="w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="bg-white border-b-2 p-4"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-left"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="bg-white p-4" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryContentsTable;
