import { Paper } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Exam 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Exam 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Exam 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Exam 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Exam 5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Exam 6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Exam 7",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChartLine = () => {
  return (
    <Paper sx={{ margin: "2rem" }}>
      <LineChart
        width={500}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </Paper>
  );
};

export default ChartLine;
