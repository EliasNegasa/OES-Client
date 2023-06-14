import { StyledFlex } from "../ui/styledDashBoard";
import DashboardBox from "./DashboardBox";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { getCourses } from "../../services/course";
import { getUsers } from "../../services/user";
import { getExams } from "../../services/exam";
import { getQuestions } from "../../services/questions";
import { useQuery } from "@tanstack/react-query";
import ChartPie from "./ChartPie";
import ChartLine from "./ChartLine";

const DashBoard = () => {
  const { data: users } = useQuery(["users-list"], getUsers);
  const { data: courses } = useQuery(["courses-list"], getCourses);
  const { data: exams } = useQuery(["exams-list"], getExams);
  const { data: questions } = useQuery(["questions-list"], getQuestions);

  return (
    <>
      <Stack spacing={2} direction="column" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Dashboard
        </Typography>
        <StyledFlex>
          <DashboardBox
            blue
            label="Users"
            value={users?.data.length || 0}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Courses"
            value={courses?.data.length || 0}
            icon={<SpeakerNotesOutlinedIcon />}
          />
          <DashboardBox
            blue
            label="Exams"
            value={exams?.data.length || 0}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Questions"
            value={questions?.data.length || 0}
            icon={<SupervisedUserCircleOutlinedIcon />}
          />
        </StyledFlex>
      </Stack>
      {/* <Stack direction="row" spacing={2}>
        <ChartPie users={users} />
        <ChartLine />
      </Stack> */}
    </>
  );
};

export default DashBoard;
