import { Directory, UserFile } from '@sherapp/sher-shared';
import React, { useMemo, useState } from 'react';
import {
  Column,
  Row,
  useFlexLayout,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import IndeterminateCheckbox from '../../../../components/IndeterminateCheckbox';
import {
  withControlDownPolicy,
  withoutModifierPolicy,
  withShiftDownPolicy
} from './selectionPolicies';

type DirectoryOrFile = Directory | UserFile;

interface Props {
  data: DirectoryOrFile[];
}

const DirectoryContentsTable = ({ data }: Props) => {
  const [lastClickedId, setLastClickedId] = useState(0);
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
    prepareRow,
    toggleRowSelected
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

  const getSelectionPolicy = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (e.shiftKey) return withShiftDownPolicy;
    if (e.ctrlKey) return withControlDownPolicy;
    return withoutModifierPolicy;
  };

  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    id: string
  ) => {
    const selectionState = rows.map((r) => r.isSelected);
    const policy = getSelectionPolicy(e);
    const newState = policy(selectionState, +id, lastClickedId);

    for (let i = 0; i < newState.length; i++) {
      toggleRowSelected(i.toString(), newState[i]);
    }

    setLastClickedId(+id);
  };

  return (
    <div className="rounded overflow-hidden border dark:border-gray-600">
      <table className="w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="bg-white dark:bg-gray-800 border-b-2 dark:border-gray-600 p-4"
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
        <tbody
          {...getTableBodyProps()}
          className="divide-y dark:divide-gray-600"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="bg-white dark:bg-gray-800 p-4 select-none"
                onClick={(e) => handleRowClick(e, row.id)}
                {...row.getRowProps()}
              >
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
