import axios from "lib/config/axios.config";
import { API_URL } from "lib/config/config";
import { raiseError } from "lib/utils/toastUtils";

export const setFavourite = async (id: number, isFavourite = true) => {
  const url = `${API_URL}favourites/${id}`;
  const promise = isFavourite ? axios.post(url) : axios.delete(url);
  return promise
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
    });
};
