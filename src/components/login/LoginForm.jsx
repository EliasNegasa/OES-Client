import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormInput from "../ui/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import auth, { login } from "../../services/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";

const schema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
});

const LoginForm = () => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState();

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      await auth.login(data);
      window.location = "/";
      // Navigate("/");
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 401 || ex.response.status === 404)
      ) {
        console.log("CATCH", ex.response.data);
        const { message } = ex.response.data;
        setError(message);
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, minWidth: "400px" }}
          >
            <FormInput
              name="email"
              control={control}
              label="Email Address"
              errors={errors}
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
            />

            <FormInput
              name="password"
              control={control}
              label="Password"
              errors={errors}
              type="password"
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
            />
            {error && (
              <Alert severity="error" sx={{ m: 1 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;
