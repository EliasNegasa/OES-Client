import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import Popper from "@mui/material/Popper";
import auth from "../../services/auth";
import Box from "@mui/material/Box";

const Profile = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleLogout = () => {
    auth.logout();
    window.location = "auth/signin";
  };

  return (
    <>
      <Stack direction="row">
        <Typography>Email</Typography>
        <div>
          <div onClick={handleClick}>
            <Stack direction="row" spacing={2}>
              <Avatar alt="ENs" src="/" />
            </Stack>
          </div>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box
              onClick={handleLogout}
              sx={{ border: 1, p: 1, bgcolor: "background.paper", zIndex: 999 }}
            >
              Logout
            </Box>
          </Popper>
        </div>
      </Stack>
    </>
  );
};

export default Profile;
