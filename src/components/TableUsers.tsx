"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

import Swal from "sweetalert2";
import swal from "sweetalert";

import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Column {
  id: "name" | "email" | "role" | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
  actionsButtons?: boolean;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "role",
    label: "Role",
    minWidth: 170,
    align: "right",
    format: (value: string) => value.toUpperCase(),
  },
  {
    id: "actions",
    label: "Actions",
    align: "right",
    minWidth: 100,
    actionsButtons: true,
  },
];

export default function StickyHeadTable({ rows }: { rows: Users }) {
  const [usersRows, setUsersRows] = useState(rows);

  const { data, status } = useSession();

  let userData: any = data?.user;

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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      console.log("testing data: " + JSON.stringify(column));
                      console.log("testing data: " + JSON.stringify(row));

                      if (column.actionsButtons) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <DeleteIcon
                              onClick={() => {
                                Swal.fire({
                                  title:
                                    "Are you sure you want to delete this user: ",
                                  html:
                                    `Name: <b>${row.name}</b> <br/>` +
                                    `Role: <b>${row.role}</b> <br/>` +
                                    `Email: <b>${row.email}</b>`,
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#d33",
                                  cancelButtonColor: "#3085d6",
                                  confirmButtonText: "Delete",
                                }).then((response) => {
                                  if (response.isConfirmed && userData?.id) {
                                    var myHeaders = new Headers();
                                    myHeaders.append(
                                      "Authorization",
                                      "Bearer " + userData?.jwt
                                    );

                                    var requestOptions = {
                                      method: "DELETE",
                                      headers: myHeaders,
                                    };

                                    fetch(
                                      "http://3.145.60.30/api/v1/users/" +
                                        row._id,
                                      requestOptions
                                    )
                                      .then((result: any) => {
                                        console.log(
                                          "Result . status: ",
                                          result
                                        );
                                        if (result.status == 403) {
                                          throw Error(
                                            "You don't have the permissions."
                                          );
                                        }
                                        if (!result.ok) {
                                          throw Error(
                                            "There was an error from the server."
                                          );
                                        }
                                        swal({
                                          title:
                                            "User " +
                                            row.name +
                                            " was deleted.",
                                          text: "User role: " + row.role,
                                          icon: "success",
                                        });
                                        async function fetchUsers() {
                                          var myHeaders = new Headers();
                                          myHeaders.append(
                                            "Authorization",
                                            "Bearer " + userData?.jwt
                                          );

                                          var requestOptions = {
                                            method: "GET",
                                            headers: myHeaders,
                                          };
                                          const res = await fetch(
                                            "http://3.145.60.30/api/v1/users",
                                            requestOptions
                                          );
                                          const resJson = await res.json();
                                          let usersResponse =
                                            resJson?.data?.data;
                                          setUsersRows(usersResponse);
                                          console.log(
                                            "users Response is: " +
                                              usersResponse
                                          );
                                        }
                                        fetchUsers();
                                        console.log(
                                          "The result from deleting is: ",
                                          result
                                        );
                                      })
                                      .catch((error) => {
                                        swal({
                                          title:
                                            "User " +
                                            row.name +
                                            " was NOT deleted.",
                                          text: "Error: " + error?.message,
                                          icon: "error",
                                        });
                                        console.error("error", error);
                                      });
                                  }
                                });
                              }}
                              sx={{
                                ":hover": {
                                  transform: "scale(1.2)",
                                  cursor: "pointer",
                                },
                              }}
                            />
                          </TableCell>
                        );
                      }

                      const value = row[column.id];
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 25, 100]}
        component="div"
        count={usersRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
