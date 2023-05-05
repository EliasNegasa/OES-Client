import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/user";
import { useParams } from "react-router-dom";
import BackdropLoader from "../ui/Backdrop";
import { Stack, Typography } from "@mui/material";
import NotificationSnackbars from "../ui/Snackbar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserDetails() {
  const { userId } = useParams();

  const { isLoading, data, isError, error } = useQuery(["user", userId], () =>
    getUser(userId)
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Personal" {...a11yProps(0)} />
          <Tab label="Courses" {...a11yProps(1)} />
          <Tab label="Exams" {...a11yProps(2)} />
          <Tab label="Results" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Personal Details
          </Typography>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Courses
          </Typography>
        </Stack>
        {isLoading && <BackdropLoader />}
        {isError && (
          <NotificationSnackbars message={error?.message} severity="error" />
        )}
        {data && console.log("Data", data)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Exams
          </Typography>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Results
          </Typography>
        </Stack>
      </TabPanel>
    </Box>
  );
}
