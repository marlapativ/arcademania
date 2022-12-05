export const parseJwtAndGet = (token: string, property = "id") => {
  if (!token) return undefined;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64))[property];
};
