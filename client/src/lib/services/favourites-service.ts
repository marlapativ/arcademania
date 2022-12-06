import axios from "lib/config/axios.config";
import { API_URL } from "lib/config/config";
import type { GameFavourites } from "lib/types/components/common";
import { raiseError } from "lib/utils/toastUtils";

export const updateFavourite = (
  id: number,
  isFavourite = true
): Promise<GameFavourites[]> => {
  const url = `${API_URL}favourites/${id}`;
  const promise = isFavourite
    ? axios.post<GameFavourites[]>(url)
    : axios.delete<GameFavourites[]>(url);
  return promise
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      return {} as GameFavourites[];
    });
};

export const fetchFavourites = () => {
  const url = `${API_URL}favourites`;
  return axios
    .get<GameFavourites[]>(url)
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      return [] as GameFavourites[];
    });
};
