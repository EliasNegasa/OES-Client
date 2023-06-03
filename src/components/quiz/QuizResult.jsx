import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Popup from "../ui/Popup";

const QuizResult = ({
  exam_name,
  score,
  amount,
  openPopup,
  setOpenPopup,
  status,
}) => {
  return (
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Result">
      <Container component="main">
        <Grid container alignItems="flex-end">
          <Grid item sx={{ minWidth: "400px" }}>
            <Card>
              <CardHeader
                subheader={exam_name}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                  color: "#fff",
                }}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "#fff",
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    {score}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /{amount}
                  </Typography>
                </Box>
              </CardContent>
              {!status == [] && (
                <CardActions>
                  <Button
                    fullWidth
                    onClick={() => {
                      setOpenPopup(false);
                    }}
                  >
                    View Answers
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Popup>
  );
};

export default QuizResult;
