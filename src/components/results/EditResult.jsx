import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Divider, Stack } from "@mui/material";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { useMutation } from "@tanstack/react-query";
import BackdropLoader from "../ui/Backdrop";
import NotificationSnackbars from "../ui/Snackbar";
import ResultSchema from "../../validations/result";
import { updateResult } from "../../services/results";

export default function EditResult({ setOpenPopup, result }) {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      id: result.id,
      score: result.score,
      status: result.status,
    },
    resolver: yupResolver(ResultSchema()),
  });

  const { errors } = formState;

  const { mutate, isLoading, isError, isSuccess, error } =
    useMutation(updateResult);

  const onSubmit = (data) => {
    console.log("Data", data);
    mutate(data, {
      onSuccess: () => {
        setOpenPopup(false);
      },
    });
  };

  return (
    <>
      {isLoading && <BackdropLoader />}

      {isError && (
        <NotificationSnackbars message={error?.message} severity="error" />
      )}
      {isSuccess && (
        <NotificationSnackbars
          message="Result updated successfully"
          severity="success"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
          }}
        >
          <Stack direction="row">
            <FormInput
              name="score"
              control={control}
              label="Score"
              errors={errors}
            />
          </Stack>
          <Stack direction="row">
            <FormInput
              name="status"
              control={control}
              label="Number of Questions"
              errors={errors}
            />
          </Stack>

          <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlinedIcon />}
            sx={{ float: "right", right: "5px" }}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
