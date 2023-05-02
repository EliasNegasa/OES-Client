import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/joy/CircularProgress";

export default function BackdropLoader() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(true);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
