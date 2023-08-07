import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AuthButton from "./AuthButton";
import { Icon } from "@mui/material";
import Link from "next/link";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <img
                src="/SolvdIcon.png"
                width={50}
                height={50}
                alt="Business logo"
              />
            </Link>
            <Typography variant="h6" sx={{ ml: 2 }}>
              Todo App
            </Typography>
          </Box>
          <AuthButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
