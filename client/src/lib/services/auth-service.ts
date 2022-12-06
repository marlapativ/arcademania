// url of the backend server
const url = "http://localhost:8081/api/v1";
const defaultContentType = "application/json";

/**
 * This function is used to signin the user
 * @returns array of todos
 */
export const signIn = async (data: JSON) => {
  const newurl = `${url}/auth/signin`;

  return fetch(newurl, {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
    },
    body: JSON.stringify(data),
  });
};

export const createUser = async (data: JSON) => {
  const newurl = `${url}/auth/signup`;

  return fetch(newurl, {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
    },
    body: JSON.stringify(data),
  });
};

export const updateUser = async (userId: number, data: JSON) => {
  const newurl = `${url}/auth/updateProfile?id=${userId}`;

  return fetch(newurl, {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
    },
    body: JSON.stringify(data),
  });
};

export const getUser = async (token: string) => {
  const newurl = `${url}/auth/getUser`;

  return fetch(newurl, {
    method: "GET",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
      authorization: `Bearer ${token}`,
    },
  });
};
