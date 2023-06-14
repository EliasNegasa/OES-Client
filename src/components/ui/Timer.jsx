import React, { memo } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import Countdown from "react-countdown";
import NotificationSnackbars from "./Snackbar";

const Timer = memo(({ duration, start }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (minutes == 2 && seconds < 59) {
      return (
        <NotificationSnackbars
          message={`You only have ${minutes} minutes`}
          severity="warning"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />
      );
    }

    if (completed) {
      return <></>;
      // return <Completionist />;
    } else {
      return (
        <>
          {hours}:{minutes}:{seconds}
        </>
      );
    }
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={600000}>
        <Alert
          variant="filled"
          severity="info"
          sx={{ width: "100%" }}
          icon={<AccessAlarmsIcon />}
        >
          <AlertTitle>
            Given Time: {duration}
            <span style={{ fontSize: "12px" }}>min</span>
          </AlertTitle>
          Time left:{" "}
          <Countdown date={Date.now() + duration * 60000} renderer={renderer} />
        </Alert>
      </Snackbar>
    </>
  );
});

export default Timer;
