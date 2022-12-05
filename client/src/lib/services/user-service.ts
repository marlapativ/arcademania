import type { UserInfo } from "lib/types/components/common";

const url = "http://localhost:8080/api/v1";
const defaultContentType = "application/json";

export const getUser = (): UserInfo => {
  const newurl = `${url}/auth/getUser`;
  const user = {
    userId: "",
    name: "",
  };
  fetch(newurl, {
    method: "GET",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
      authorization: "token",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      user.userId = data.id;
      user.name = data.name;
    });

  return user;
};
