import React from "react";

import StickyHeadTable from "@/components/TableUsers";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Alert } from "@mui/material";
import { fetchUsers } from "@/utils";

const DashBoard = async () => {
  const session: any = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    let users = await fetchUsers({ jwt: session?.user?.jwt });
    console.log("Users response: ", users);

    if (!Array.isArray(users)) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          There was a problem with the server.
        </Alert>
      );
    }

    if (users.length > 0) {
      <Alert severity="error">
        There are not users in the system, add one!
      </Alert>;
    }

    return <StickyHeadTable rows={users} />;
  } catch (error) {
    console.error("error implementation: ", error);
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        There was a problem with the server.
      </Alert>
    );
  }
};

export default DashBoard;
