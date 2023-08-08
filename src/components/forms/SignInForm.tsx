"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { toast } from "sonner";

import { signIn } from "next-auth/react";

import CircularProgress from "@mui/material/CircularProgress";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({
    name: "The email should be valid",
    errorBoolean: false,
  });
  const [passwordError, setPasswordError] = useState({
    name: "Password should have at least eigth characters.",
    errorBoolean: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const isValidEmail = (email: string | null): boolean => {
      // Expresión regular para validar emails
      console.log("mail is: ", email);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof email == "string") {
        if (emailRegex.test(email)) {
          console.log("test ok");
          setEmailError({ ...emailError, errorBoolean: false });
          return true;
        } else {
          console.log("test fs");

          setEmailError({ ...emailError, errorBoolean: true });
          return false;
        }
      }
      setEmailError({ ...emailError, errorBoolean: true });
      return false;
    };

    const isValidPassword = (password: string | null): boolean => {
      // Verificar si la contraseña tiene al menos 8 caracteres
      if (typeof password == "string") {
        const passwordRegex = /^[^\s]{8,100}$/;
        if (passwordRegex.test(password)) {
          setPasswordError({ ...passwordError, errorBoolean: false });
          return true;
        } else {
          setPasswordError({ ...passwordError, errorBoolean: true });
          return false;
        }
      }
      setPasswordError({ ...passwordError, errorBoolean: true });
      return false;
    };

    const dataObj = {
      firstName: (data.get("firstName") as string) || "",
      lastName: (data.get("lastName") as string) || "",
      fullName: data.get("firstName") + " " + data.get("lastName"),
      email: (data.get("email") as string) || "",
      password: (data.get("password") as string) || "",
      confirmPassword: (data.get("confirmPassword") as string) || "",
    };
    const isValidData =
      isValidEmail(dataObj.email) && isValidPassword(dataObj.password);

    if (isValidData) {
      setLoading(true);

      console.log("antes");
      const res = await signIn("credentials", {
        email: dataObj.email,
        password: dataObj.password,
        redirect: false,
      });
      console.log("Termino!: ", res);
      if (res?.error) {
        toast.error(res.error);
      } else if (res?.error === null) {
        toast.success("Signed in successfully.");
        router.push("/");
      }

      setLoading(false);
    } else {
      // Los datos del objeto no cumplen con las validaciones.
      console.log("Los datos no son válidos:", dataObj);
      toast.error("Fill in the form again correctly.");
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "blue" }}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError.errorBoolean}
                helperText={emailError.errorBoolean && emailError.name}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={passwordError.errorBoolean}
                helperText={passwordError.errorBoolean && passwordError.name}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress sx={{ color: "white" }} /> : "Sign in"}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              You don&apos;t have an account?
              <Link href="/sign-up" variant="body2" sx={{ ml: 1 }}>
                Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
