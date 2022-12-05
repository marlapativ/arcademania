// url of the backend server
const url = "http://localhost:8080/api/v1";
const defaultContentType = "application/json";

/**
 * This function is used to get all todos
 * @returns array of todos
 */
export const getAccessToken = async (data: JSON) => {
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
