"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

import CircularProgress from "@mui/material/CircularProgress";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useRouter } from "next/navigation";

export default function SignInSide() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState({
    name: "The first name should have at least three characters and no spaces.",
    errorBoolean: false,
  });
  const [lastNameError, setLastNameError] = useState({
    name: "The last name should have at least three characters and no spaces.",
    errorBoolean: false,
  });
  const [emailError, setEmailError] = useState({
    name: "The email should be valid",
    errorBoolean: false,
  });
  const [passwordError, setPasswordError] = useState({
    name: "Password should have at least eigth characters.",
    errorBoolean: false,
  });
  const [passwordConfirmError, setPasswordConfirmError] = useState({
    name: "Password and confirmPassword be equal.",
    errorBoolean: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

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

    const isValidName = (
      name: string | null,
      nameType: "first" | "last"
    ): boolean => {
      // Expresión regular para validar nombres (mínimo 3, máximo 20 caracteres sin espacios)
      const nameRegex = /^[^\s]{3,20}$/;
      console.log("name is: ", name);
      if (typeof name == "string") {
        if (nameType === "first") {
          if (nameRegex.test(name)) {
            setFirstNameError({ ...firstNameError, errorBoolean: false });
            return true;
          } else {
            setFirstNameError({ ...firstNameError, errorBoolean: true });
            return false;
          }
        } else {
          if (nameRegex.test(name)) {
            setLastNameError({ ...lastNameError, errorBoolean: false });
            return true;
          } else {
            setLastNameError({ ...lastNameError, errorBoolean: true });
            return false;
          }
        }
      }
      if (nameType === "first") {
        setFirstNameError({ ...firstNameError, errorBoolean: true });
      } else {
        setLastNameError({ ...lastNameError, errorBoolean: true });
      }
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

    const isValidConfirmPassword = (pass: string, conf: string) => {
      if (pass === conf) {
        setPasswordConfirmError({
          ...passwordConfirmError,
          errorBoolean: false,
        });
        return true;
      }
      setPasswordConfirmError({
        ...passwordConfirmError,
        errorBoolean: true,
      });
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
      isValidName(dataObj.firstName, "first") &&
      isValidName(dataObj.lastName, "last") &&
      isValidEmail(dataObj.email) &&
      isValidPassword(dataObj.password) &&
      isValidConfirmPassword(dataObj.password, dataObj.confirmPassword);

    if (isValidData) {
      // Los datos del objeto son válidos, puedes proceder con el envío o la acción correspondiente.
      console.log("Los datos son válidos:", dataObj);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let obj = JSON.stringify({
        name: dataObj.fullName,
        email: dataObj.email,
        password: dataObj.password,
        passwordConfirm: dataObj.confirmPassword,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: obj,
      };

      fetch("https://3.145.60.30/api/v1/users/signup", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          toast.success("Signed up successfully");
          console.log(result);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        })
        .catch((error) => {
          toast.error("There was an error: " + JSON.stringify(error));
          console.log("error", error);
        })
        .finally(() => {
          console.log("finally");
          setLoading(false);
        });
    } else {
      // Los datos del objeto no cumplen con las validaciones.
      console.log("Los datos no son válidos:", dataObj);
      toast.error("Do it again");
    }
  };

  return (
    <>
      <Toaster richColors expand={true} position="top-center" />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/todoImg.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "blue" }}>
              <AssignmentIndIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={firstNameError.errorBoolean}
                    helperText={
                      firstNameError.errorBoolean && firstNameError.name
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={lastNameError.errorBoolean}
                    helperText={
                      lastNameError.errorBoolean && lastNameError.name
                    }
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordError.errorBoolean}
                    helperText={
                      passwordError.errorBoolean && passwordError.name
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label="ConfirmPassword"
                    type="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    error={passwordConfirmError.errorBoolean}
                    helperText={
                      passwordConfirmError.errorBoolean &&
                      passwordConfirmError.name
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Sign up"
                )}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
