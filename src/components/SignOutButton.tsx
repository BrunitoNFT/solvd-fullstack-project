"use client";
import React from "react";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button
      color="inherit"
      variant="outlined"
      sx={{ ml: 2 }}
      onClick={() => signOut()}
    >
      Log Out
    </Button>
  );
};

export default SignOutButton;
