const API_BASE_PATH = "api/v1/";
export const API_HOST: string = process.env.API_HOST || "localhost";
export const API_PORT: string = process.env.API_PORT || "8081";
export const API_URL = `http://${API_HOST}:${API_PORT}/${API_BASE_PATH}`;
