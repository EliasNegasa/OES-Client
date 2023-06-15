import * as React from "react";
import { useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Typography, Button, Chip } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import BackdropLoader from "../../ui/Backdrop";
import NotificationSnackbars from "../../ui/Snackbar";
import { filterResults, getResults } from "../../../services/results";
import { CurrentUserContext } from "../../../App";
import { Link } from "react-router-dom";

export default function MyResults() {
  const currentUser = useContext(CurrentUserContext);
  const role = currentUser.roles[0].role_name;
  const userId = currentUser.id;

  const {
    isLoading,
    data: results,
    isError,
    error,
  } = useQuery(
    ["results-list", currentUser.id],
    role == "admin" ? getResults : getResults,
    // : () => filterResults(`enrollment_id=${currentUser.id}`),
    {
      enabled: true,
    }
  );

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Results
        </Typography>
      </Stack>
      <>{isLoading && <BackdropLoader />}</>
      <>
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
      </>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ "*": { fontWeight: 700 } }}>
            <TableRow>
              <TableCell>Exam</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Percent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results &&
              results?.data.map(
                (result) =>
                  userId == result.enrollment?.user.id && (
                    <>
                      <TableRow
                        key={result.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {result.exam.exam_name}
                        </TableCell>
                        <TableCell>
                          {result.score}/{result.status}
                        </TableCell>
                        <TableCell>
                          {((result.score / result.status) * 100).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {(result.score / result.status) * 100 < 50 ? (
                            <Chip
                              label="Failed"
                              color="error"
                              size="small"
                              sx={{ minWidth: "94px" }}
                            />
                          ) : (
                            <Chip
                              label="Passed"
                              color="success"
                              size="small"
                              sx={{ minWidth: "94px" }}
                            />
                          )}
                        </TableCell>

                        <TableCell>
                          <Stack direction="row">
                            <Link to={`/results/print/${result?.id}`}>
                              <Button
                                variant="secondary"
                                sx={{ minWidth: "10px" }}
                              >
                                <PrintOutlinedIcon
                                  color="warning"
                                  sx={{ fontSize: "1rem" }}
                                />
                              </Button>
                            </Link>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </>
                  )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
