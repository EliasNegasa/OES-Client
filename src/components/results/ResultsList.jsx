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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import Popup from "../ui/Popup";
import { filterResults, getResults } from "../../services/results";
import EditResult from "./EditResult";
import { CurrentUserContext } from "../../App";

export default function ResultList() {
  const currentUser = useContext(CurrentUserContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [result, setResult] = useState("");
  const role = currentUser.roles[0].role_name;

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

  const handleEditClicked = (result) => {
    setOpenPopup(true);
    setResult(result);
    console.log("US", result);
  };

  const handleCreateClicked = () => {
    setResult("");
    setOpenPopup(true);
  };

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
              <TableCell>Name</TableCell>
              <TableCell>Exam</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Percent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results &&
              results?.data.map((result) => (
                <TableRow
                  key={result.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {result.enrollment?.user.firstname}{" "}
                    {result.enrollment?.user.lastname}
                  </TableCell>
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
                      <Button
                        onClick={() => handleEditClicked(result)}
                        variant="secondary"
                        sx={{ minWidth: "10px" }}
                      >
                        <EditOutlinedIcon
                          color="warning"
                          sx={{ fontSize: "1rem" }}
                        />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Update Result Information"
      >
        <EditResult
          result={result}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </>
  );
}
