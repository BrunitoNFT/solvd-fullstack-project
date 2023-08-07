interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  _id: string;
}

type Users = User[];
