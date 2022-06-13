import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Spinner from '../Spinner';

export function TableLoader({ headCells }) {
  return (
    <TableRow className="text-gray-100">
      <TableCell align="center" colSpan={headCells.length}>
        <Spinner size={20} />
      </TableCell>
    </TableRow>
  );
}

export function EmptyTableRow({ headCells }) {
  return (
    <TableRow>
      <TableCell
        align="center"
        colSpan={headCells.length}
        className="dark:text-gray-200 dark:border-b-gray-500">
        Sorry, No data available.
      </TableCell>
    </TableRow>
  );
}
