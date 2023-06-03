import { StyledFlex } from "../ui/styledDashBoard";
import DashboardBox from "./DashboardBox";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const DashBoard = () => {
  return (
    <>
      <Stack spacing={2} direction="column" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Dashboard
        </Typography>
        <StyledFlex>
          <DashboardBox
            blue
            label="Courses"
            value="20+"
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Reports"
            value="Repo"
            icon={<SpeakerNotesOutlinedIcon />}
          />
          <DashboardBox
            blue
            label="Exams"
            value="100"
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Active Users"
            value="10+"
            icon={<SupervisedUserCircleOutlinedIcon />}
          />
        </StyledFlex>
      </Stack>
    </>
  );
};

export default DashBoard;
