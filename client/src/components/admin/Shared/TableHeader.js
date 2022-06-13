import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

function TableHeader({ headCells, order, orderBy, onRequestSort }) {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow className="bg-header dark:bg-slate-800  dark:text-gray-200">
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? headCell.align : 'center'}
            className="text-sm font-semibold dark:text-gray-200 dark:hover:text-gray-400 dark:border-b-gray-400"
            padding="none"
            style={{
              padding: 10,
              fontWeight: 600,
              fontSize: '0.875rem',
              lineHeight: '1.25rem'
            }}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.sort ? (
              <TableSortLabel
                // active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                className="dark:text-gray-200 dark:hover:text-gray-400 dark:active:text-gray-200">
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box
                    component="span"
                    sx={visuallyHidden}
                    className="dark:text-gray-200 dark:hover:text-gray-200">
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
