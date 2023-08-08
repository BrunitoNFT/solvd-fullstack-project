import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import React from "react";
import { Toaster } from "sonner";

import SignInForm from "@/components/forms/SignInForm";

const SignIn = () => {
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
            backgroundColor: "gray",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <SignInForm />
      </Grid>
    </>
  );
};

export default SignIn;
