import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import QuizIcon from "@mui/icons-material/Quiz";
import DescriptionIcon from "@mui/icons-material/Description";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";

const SideNav = () => {
  const theme = useTheme();

  return (
    <>
      <List>
        {[
          "Dashboard",
          "Users",
          "Courses",
          "Exams",
          "Questions",
          "Answers",
          "Results",
          "Enrollments",
          "Monitor Live",
        ].map((text) => (
          <NavLink to={text.toLowerCase()} key={text}>
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.9,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#8a9199",
                  }}
                >
                  {text == "Dashboard" && <DashboardIcon />}
                  {text == "Users" && <PeopleOutlineIcon />}
                  {text == "Courses" && <AutoStoriesIcon />}
                  {text == "Exams" && <DescriptionIcon />}
                  {text == "Questions" && <QuizIcon />}
                  {text == "Answers" && <QuestionAnswerIcon />}
                  {text == "Results" && <CreditScoreIcon />}
                  {text == "Enrollments" && <DescriptionIcon />}
                  {text == "Monitor Live" && <LiveTvIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "#8a9199" }} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </>
  );
};

export default SideNav;
