import { Paper } from "@mui/material";
import { Pie, PieChart } from "recharts";

const data01 = [
  {
    name: "Lecturers",
    value: 400,
  },
  {
    name: "Students",
    value: 300,
  },
  {
    name: "Admins",
    value: 200,
  },
];

const ChartPie = () => {
  return (
    <Paper>
      <PieChart width={500} height={250}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        />
      </PieChart>
    </Paper>
  );
};

export default ChartPie;
