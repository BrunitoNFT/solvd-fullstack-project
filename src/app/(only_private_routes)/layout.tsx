import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";

const PrivateLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PrivateLayout;
