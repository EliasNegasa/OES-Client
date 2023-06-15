import React, { memo } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import Countdown from "react-countdown";

const Timer = memo(({ duration, start, setTimerIsUp }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setTimerIsUp(true);
      return (
        <>
          <Snackbar open={open} autoHideDuration={5000}>
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: "100%" }}
              icon={<AccessAlarmsIcon />}
            >
              <AlertTitle>Time is up</AlertTitle>
            </Alert>
          </Snackbar>
        </>
      );
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
