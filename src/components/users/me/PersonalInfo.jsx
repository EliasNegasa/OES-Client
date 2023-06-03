import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import BackdropLoader from "../../ui/Backdrop";
import NotificationSnackbars from "../../ui/Snackbar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/user";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const PersonalInfo = ({ userId }) => {
  const { isLoading, data, isError, error } = useQuery(["user", userId], () =>
    getUser(userId)
  );

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Personal Information
        </Typography>
      </Stack>
      {isLoading && <BackdropLoader />}
      {isError && (
        <NotificationSnackbars message={error?.message} severity="error" />
      )}
      {data && console.log("Data", data.data)}
      <Grid container spacing={4}>
        {data && (
          <Grid item key={data.data?.id} xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.data?.firstname} {data.data?.lastname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", fontSize: "12px" }}
                >
                  Academic Year: {data.data?.academic_year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.data?.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PersonalInfo;
