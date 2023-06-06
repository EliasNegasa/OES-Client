import * as React from "react";
import { useEffect, useState } from "react";
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
import { getAnswers } from "../../services/answer";
import EditAnswer from "./EditAnswer";
import Popup from "../ui/Popup";

export default function AnswerList() {
  const [openPopup, setOpenPopup] = useState(false);
  const [answer, setAnswer] = useState("");

  const {
    isLoading,
    data: answers,
    isError,
    error,
  } = useQuery(["answers-list"], getAnswers, { enabled: true });

  const handleEditClicked = (answer) => {
    setOpenPopup(true);
    setAnswer(answer);
    console.log("US", answer);
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Answer
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
              <TableCell>Answer Text</TableCell>
              <TableCell>Correct?</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers &&
              answers?.data.map((answer) => (
                <TableRow
                  key={answer.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {answer.answer_text}
                  </TableCell>
                  <TableCell>
                    {answer.is_correct ? (
                      <Chip
                        label="True"
                        color="success"
                        size="small"
                        sx={{ minWidth: "94px" }}
                      />
                    ) : (
                      <Chip
                        label="False"
                        color="warning"
                        size="small"
                        sx={{ minWidth: "94px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{answer?.question.question_text}</TableCell>

                  <TableCell>
                    <Stack direction="row">
                      <Button
                        onClick={() => handleEditClicked(answer)}
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
        title={"Update Answer Information"}
      >
        <EditAnswer
          answer={answer}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </>
  );
}
