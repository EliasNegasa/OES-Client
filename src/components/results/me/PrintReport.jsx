import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import html2pdf from "html2pdf.js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getResult } from "../../../services/results";

const handlePrintClicked = () => {
  const element = document.getElementById("printable-content");
  html2pdf().from(element).save("printable.pdf");
};

const PrintReport = () => {
  const { reportId } = useParams();

  const {
    isLoading,
    data: result,
    isError,
    error,
  } = useQuery(["results-list", reportId], () => getResult(reportId), {
    enabled: true,
  });

  return (
    <>
      {console.log("PRINT", result?.data)}
      <Stack spacing={2} direction="row" sx={{ mb: 2, float: "right" }}>
        <Button
          variant="contained"
          onClick={handlePrintClicked}
          startIcon={<PrintOutlinedIcon />}
        >
          Print Report
        </Button>
      </Stack>
      <div id="printable-content" style={{ margin: "3rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Report Details
        </Typography>
        <TableContainer>
          <Table sx={{ maxWidth: 450 }} component={Paper}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "500" }}>Name</TableCell>
                <TableCell>
                  {result?.data.enrollment?.user.firstname}{" "}
                  {result?.data.enrollment?.user.lastname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "500" }}>Course</TableCell>
                <TableCell>{result?.data.exam?.course?.course_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "500" }}>Exam</TableCell>
                <TableCell>{result?.data.exam?.exam_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "500" }}>Score</TableCell>
                <TableCell>
                  {result?.data.score}/{result?.data.status}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "500" }}>Percent</TableCell>
                <TableCell>
                  {((result?.data.score / result?.data.status) * 100).toFixed(
                    2
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "500" }}>Status</TableCell>
                <TableCell>
                  {(result?.data.score / result?.data.status) * 100 < 50 ? (
                    <span>Failed</span>
                  ) : (
                    <span>Passed</span>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default PrintReport;
