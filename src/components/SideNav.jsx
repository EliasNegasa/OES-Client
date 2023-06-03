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
import { useContext } from "react";
import { CurrentUserContext } from "../App";

const Navs = [
  {
    label: "Dashboard",
    type: "all",
    url: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "My Dashboard",
    type: "student",
    url: "/me/dashboard",
    icon: <DashboardIcon />,
  },
  { label: "Users", type: "admin", url: "/users", icon: <PeopleOutlineIcon /> },
  {
    label: "Personal Info.",
    type: "student",
    url: "/me/users",
    icon: <PeopleOutlineIcon />,
  },
  {
    label: "Courses",
    type: "all",
    url: "/courses",
    icon: <AutoStoriesIcon />,
  },
  {
    label: "My Courses",
    type: "student",
    url: "/me/courses",
    icon: <AutoStoriesIcon />,
  },
  { label: "Exams", type: "admin", url: "/exams", icon: <DescriptionIcon /> },
  {
    label: "My Exams",
    type: "student",
    url: "/me/exams",
    icon: <DescriptionIcon />,
  },
  { label: "Questions", type: "admin", url: "questions", icon: <QuizIcon /> },
  {
    label: "Answers",
    type: "admin",
    url: "/answers",
    icon: <QuestionAnswerIcon />,
  },
  {
    label: "Enrollments",
    type: "admin",
    url: "/enrollments",
    icon: <DescriptionIcon />,
  },
  {
    label: "My Enrollments",
    type: "student",
    url: "me/enrollments",
    icon: <DescriptionIcon />,
  },
  {
    label: "Monitor-Live",
    type: "admin",
    url: "/monitor-live",
    icon: <LiveTvIcon />,
  },
  {
    label: "My Results",
    type: "student",
    url: "/me/results",
    icon: <CreditScoreIcon />,
  },
];

const SideNav = () => {
  const theme = useTheme();
  const currentUser = useContext(CurrentUserContext);
  const role = currentUser.roles[0].role_name;

  return (
    <>
      <p>{console.log("CONTEXT USER", role)}</p>
      <List>
        {Navs.map(
          (nav) =>
            role === nav.type && (
              <NavLink to={nav.url} key={nav.label}>
                <ListItem disablePadding sx={{ display: "block" }}>
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
                      {nav.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={nav.label}
                      sx={{ color: "#8a9199" }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            )
        )}
      </List>
    </>
  );
};

export default SideNav;