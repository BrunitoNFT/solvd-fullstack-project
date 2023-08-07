import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";

const AdminPrivateLayout = async ({ children }: { children: ReactNode }) => {
  const session: any = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (!(session?.user?.role === "admin")) {
    redirect("/");
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default AdminPrivateLayout;
