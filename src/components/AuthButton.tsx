import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import SignOutButton from "./SignOutButton";

const AuthButton = async () => {
  const session = await getServerSession(authOptions);
  console.log("sesion private is: ", session);
  if (session?.user) {
    return (
      <>
        <Typography>{session?.user?.name}</Typography>
        <SignOutButton />
      </>
    );
  } else {
    return <Button color="inherit">Login</Button>;
  }
};

export default AuthButton;
