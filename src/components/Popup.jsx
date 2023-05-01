import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup({
  openPopup,
  setOpenPopup,
  setSingleUser,
  title,
  children,
}) {
  const handleClose = () => {
    setOpenPopup(false);
    setSingleUser("");
  };
  return (
    <Dialog open={openPopup}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="secondary">
            <CloseIcon />
          </Button>
        </DialogActions>
      </Stack>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
