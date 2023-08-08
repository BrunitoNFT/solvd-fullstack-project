import PrivateLayout from "./(only_private_routes)/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

interface User {
  name: string;
  email: string;
  image?: string | undefined; // Puedes añadir | undefined si image puede ser undefined
  role: string;
  id: string;
  jwt: string;
}

export default async function Home() {
  const session: { user: User } | null = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in");
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + session?.user?.jwt);

  var raw = JSON.stringify({
    query:
      "query ExampleQuery { getMyTodos { id todo status user {id name} } }",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const res = await fetch("http://3.145.60.30/graphql", requestOptions);
  const resJson = await res.json();
  return (
    <PrivateLayout>
      <Box component="main" sx={{ p: 3 }}>
        {Array.isArray(resJson.data.getMyTodos) &&
          (resJson.data.getMyTodos.length > 0 ? (
            resJson.data.getMyTodos.map((item: any) => (
              <Box
                key={item.id}
                sx={{
                  border: "1px solid black",
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all .1s ease-in-out",
                  ":hover": {
                    transform: "scale(1.01)",
                  },
                }}
              >
                <Typography variant="h4">{item.todo}</Typography>
                {item.status === "done" ? (
                  <Typography
                    variant="body1"
                    sx={{ color: "green", fontWeight: "bold", fontSize: 18 }}
                  >
                    {item.status.toUpperCase()}
                  </Typography>
                ) : item.status === "pending" ? (
                  <Typography variant="body1" sx={{ color: "blue" }}>
                    {item.status.toUpperCase()}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    {item.status.toUpperCase()}
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <h1>No todos yet</h1>
          ))}
      </Box>
    </PrivateLayout>
  );
}
