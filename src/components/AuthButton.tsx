import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

const AuthButton = async () => {
  const session: any = await getServerSession(authOptions);
  console.log("sesion private is: ", session);
  if (session?.user) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>{session?.user?.name}</Typography>
        <SignOutButton />
        {session?.user?.role === "admin" && (
          <Link href="/admin/dashboard">
            <Button
              color="inherit"
              variant="outlined"
              sx={{ mx: 2, color: "white" }}
            >
              ADMIN PANEL
            </Button>
          </Link>
        )}
      </Box>
    );
  } else {
    return <Button color="inherit">Login</Button>;
  }
};

export default AuthButton;
