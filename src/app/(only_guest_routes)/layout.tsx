import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const GuestLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/profile");
  }

  return <>{children}</>;
};

export default GuestLayout;
