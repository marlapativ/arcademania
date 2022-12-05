import axios from "axios";

export const setAxiosAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = token;
};

export default axios;
