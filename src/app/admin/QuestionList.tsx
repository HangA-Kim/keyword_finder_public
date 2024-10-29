"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { darkBrown } from "~/styles/colors";

interface Column {
  id: "state" | "title" | "email" | "questionDate" | "answerDate";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "state", label: "상태", minWidth: 170 },
  { id: "title", label: "제목", minWidth: 100 },
  {
    id: "email",
    label: "작성자",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "questionDate",
    label: "문의일시",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "answerDate",
    label: "답변일시",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  state: string;
  title: string;
  email: number;
  questionDate: number;
  answerDate: string;
}

function createData(
  state: string,
  title: string,
  email: number,
  questionDate: number,
  answerDate: string
): Data {
  return { state, title, email, questionDate, answerDate };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263, ""),
  createData("China", "CN", 1403500365, 9596961, ""),
  createData("Italy", "IT", 60483973, 301340, ""),
  createData("United States", "US", 327167434, 9833520, ""),
  createData("Canada", "CA", 37602103, 9984670, ""),
  createData("Australia", "AU", 25475400, 7692024, ""),
  createData("Germany", "DE", 83019200, 357578, ""),
  createData("Ireland", "IE", 4857000, 70273, ""),
  createData("Mexico", "MX", 126577691, 1972550, ""),
  createData("Japan", "JP", 126317000, 377973, ""),
  createData("France", "FR", 67022000, 640679, ""),
  createData("United Kingdom", "GB", 67545757, 242495, ""),
  createData("Russia", "RU", 146793744, 17098246, ""),
  createData("Nigeria", "NG", 200962417, 923768, ""),
  createData("Brazil", "BR", 210147125, 8515767, ""),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: darkBrown,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function QuestionList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: "100%", height: "70vh", overflow: "hidden", mt: "20px" }}
    >
      <TableContainer sx={{ maxHeight: "calc(70vh - 40px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
