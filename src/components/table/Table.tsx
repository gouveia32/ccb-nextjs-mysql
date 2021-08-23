import React from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import PaginationPerso, { PageProps } from "./Pagination";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  useMediaQuery,
} from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";


function onRowClick(row) {
  console.log("row:", row)
}

interface TablePersoProps {
  data: any;
  columns: any;
  isResponsive?: boolean;
  onRowClick?: (row: any) => void;
  responsiveView?: React.ReactElement<{ data: Array<any> }>;
  isPaginate?: boolean;
  currentPage?: number;
  totalRecords?: number;
  pageLimit?: number;
  onPageChanged?: (f: PageProps) => void;
}

const Table2: React.FC<TablePersoProps> = ({
  columns,
  data,
}: TablePersoProps): React.ReactElement => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);


  // Use the state and functions returned from useTable to build your UI
  const {
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
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
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'|< '}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {' < '}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {' > '}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {' >|'}
        </button>{' '}
        <span>
          Page{' '}
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
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <Table size="sm" variant="simple" {...getTableProps()}>
        <Thead bg="gray.300" >
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  fontWeight="bold"
                  fontSize="sm"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr
                onClick={(): void => onRowClick(row)}
                _active={{ bg: "green.25", borderRadius: "10px" }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <Td
                    fontSize="sm"
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>

      </Table>

      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
    </>
  )
}

export default Table2
