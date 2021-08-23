import React, { Fragment } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Strong,
  useMediaQuery,
} from "@chakra-ui/react"

import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const gotoFilter = (column) => {
    return column.filter ? <Filter column={column} /> : null;
  };


  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };


  return (
    <Fragment>
      <Row style={{ maxWidth: "100%", margin: '0 auto', textAlign: 'left' }}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'|< '}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {' < '}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {' > '}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {' >|'}
        </Button>{' '}
        <span>
          Pag{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Ir para a pag:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[3, 10, 20, 30, 0].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Vê {pageSize} / Pag.
            </option>
          ))}
        </select>
      </Row>

      <Table variant="simple" bordered hover {...getTableProps()}>
        <Thead bg="gray.100" >
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  fontWeight="bold"
                  fontSize="sm"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  <div>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  {gotoFilter(column)}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <Tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </Tr>
                {row.isExpanded && (
                  <Tr>
                    <Td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </Td>
                  </Tr>
                )}
              </Fragment>
            );
          })}
        </Tbody>
      </Table>

    </Fragment>
  );
};

export default TableContainer;