import type { AuthInfo } from "lib/types/components/common";
// url of the backend server
const url = 'http://localhost:8080/api/v1/'

/**
 * This function is used to get all todos
 * @returns array of todos
 */
export const getAccessToken = async (data : JSON) => {
    const newurl = url + `auth/signin`;
    
    return fetch(newurl, {
      method: 'POST',
      headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json'
      },
      body: JSON.stringify(data)
  });
  }