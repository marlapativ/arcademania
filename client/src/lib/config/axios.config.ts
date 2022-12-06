import axios from "axios";

export const setAxiosAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `bearer ${token}`;
};

export default axios;
