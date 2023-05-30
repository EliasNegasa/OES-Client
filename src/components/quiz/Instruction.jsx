import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";

const Instruction = ({ duration, number }) => {
  const instructionList = [
    {
      icon: <AccessAlarmsIcon />,
      text: `The total duration of this exam is ${duration} minutes.`,
    },
    {
      icon: <LiveHelpOutlinedIcon />,
      text: "You are required to complete all the questions within this timeframe.",
    },
    {
      icon: <FormatListNumberedOutlinedIcon />,
      text: `This exam/quiz consists of ${number} questions.`,
    },
    {
      icon: <QuestionAnswerOutlinedIcon />,
      text: "The questions may include multiple-choice, true/false, or short answer format.",
    },
    {
      icon: <AccessAlarmsIcon />,
      text: "The remaining time will be displayed at the top of the screen.",
    },
    {
      icon: <AccessAlarmsIcon />,
      text: "Keep track of your time to ensure completion within the allotted duration.",
    },
    {
      icon: <InfoOutlinedIcon />,
      text: "Please note that the timer will continue running even if you close the exam/quiz window.",
    },
  ];
  return (
    <>
      <>
        Please carefully read and follow the instructions below before
        proceeding:
      </>
      <List>
        {instructionList.map((instruction) => (
          <ListItem key={instruction.text}>
            <ListItemIcon>{instruction.icon}</ListItemIcon>
            <ListItemText primary={instruction.text} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Instruction;
