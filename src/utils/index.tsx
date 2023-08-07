export const fetchUsers: ({
  jwt,
}: {
  jwt: string;
}) => Promise<User[]> = async ({ jwt }) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const res = await fetch("http://3.145.60.30/api/v1/users", requestOptions);
  const resJson = await res.json();
  return resJson?.data?.data;
};
