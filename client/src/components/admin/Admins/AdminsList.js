import React, { useState, useEffect, useCallback } from 'react';
import { EditIcon } from '../../../icons';
import { headCells, setAdminArr, filteredData } from './helper';
import { BiRevision } from 'react-icons/bi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import TableHeader from '../Shared/TableHeader';
import { stableSort, getComparator } from '../Shared/Helper';
import Switch from '@mui/material/Switch';
import Toolbar from '../Shared/Toolbar';
import { TableLoader, EmptyTableRow } from '../../shared/Tables';
import { _FIRST_NAME, ADMINS } from './constants';
import {
  ASC,
  DESC,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
  CENTER,
  EDIT,
  SMALL
} from '../../shared/Constants';
import ComponentHeader from '../../shared/ComponentHeader';

function AdminsList({
  data,
  loading,
  onClickEdit,
  onHandleEnableChange,
  refreshAdminList,
  onResentInvitation
}) {
  const [admins, setAdmins] = useState([]);
  const [tempAdmins, setTempAdmin] = useState([]);
  const [order, setOrder] = useState(ASC);
  const [orderBy, setOrderBy] = useState(_FIRST_NAME);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  useEffect(() => {
    if (data) {
      setAdmins(setAdminArr(data));
      setTempAdmin(setAdminArr(data));
    }
  }, [data]);

  const requestSearch = useCallback(
    (searchedVal) => {
      if (!searchedVal) {
        setAdmins(tempAdmins);
      }
      setAdmins(filteredData(searchedVal, tempAdmins));
    },
    [tempAdmins]
  );

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === ASC;
      setOrder(isAsc ? DESC : ASC);
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return (
    <>
      <div className="">
        <ComponentHeader
          data={admins}
          setData={setTempAdmin}
          page={page}
          count={admins.length}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          onSearch={requestSearch}
        />
      </div>

      <Paper className="rounded-sm bg-slate-50 dark:bg-slate-600 custom-paper">
        <TableContainer>
          <Table sx={{ width: '100%' }} aria-labelledby={ADMINS}>
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {loading ? (
                <TableLoader headCells={headCells} />
              ) : admins && admins.length > 0 ? (
                stableSort(admins, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell
                          align={CENTER}
                          style={{ textTransform: 'capitalize' }}
                          className="dark:text-gray-200 dark:border-b-gray-500">
                          {row.firstName}
                        </TableCell>
                        <TableCell
                          align={CENTER}
                          style={{ textTransform: 'capitalize' }}
                          className="dark:text-gray-200 dark:border-b-gray-500">
                          {row.lastName}
                        </TableCell>
                        <TableCell
                          align={CENTER}
                          className="dark:text-gray-200 dark:border-b-gray-500">
                          {row.email}
                        </TableCell>
                        <TableCell
                          align={CENTER}
                          className="dark:text-gray-200 dark:border-b-gray-500">
                          <Switch
                            defaultChecked={row.enabled}
                            onChange={(e) =>
                              onHandleEnableChange(e.target.checked, row.id)
                            }
                            className="text-blue-600 dark:text-blue-300"
                          />
                        </TableCell>
                        <TableCell
                          align={CENTER}
                          className="dark:text-gray-200 dark:border-b-gray-500">
                          <div className="flex items-center justify-center">
                            <Tooltip title="Edit Admin">
                              <div>
                                {' '}
                                <IconButton
                                  aria-label={EDIT}
                                  size={SMALL}
                                  onClick={() => onClickEdit(row)}
                                  className="dark:text-blue-600">
                                  <EditIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                </IconButton>
                              </div>
                            </Tooltip>
                            <Tooltip title="Resend Email">
                              <div>
                                <IconButton
                                  aria-label={EDIT}
                                  size={SMALL}
                                  onClick={() => onResentInvitation(row.id)}
                                  className="dark:text-blue-600">
                                  <BiRevision className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                </IconButton>
                              </div>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <EmptyTableRow headCells={headCells} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="dark:text-gray-300"
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={admins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default AdminsList;
