import { Box, Show } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import LeftPane from "../components/common/sidePanes/LeftPane";
import { setAxiosAuthHeader } from "lib/config/axios.config";
import { fetchFavourites } from "lib/services/favourites-service";
import { getAuthState, setAccessToken } from "lib/store/slices/authSlice";
import { setFavourite } from "lib/store/slices/favouritesSlice";
import { useSelector } from "lib/store/store";
import { getSessionStorageToken, isAuthenticated } from "lib/utils/tokenUtils";

import Footer from "./footer/Footer";
import Header from "./header/Header";

type LayoutProps = {
  children: ReactNode;
};

export async function getStaticProps() {
  return { props: { title: "LeftPane" } };
}

/**
 * Layout Component that renders the entire Dashboard.
 */
const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getSessionStorageToken();
    if (token && token !== "") {
      setAxiosAuthHeader(token);
      dispatch(setAccessToken({ token }));
    }
  });

  const authState = useSelector(getAuthState);
  useEffect(() => {
    if (isAuthenticated(authState)) {
      fetchFavourites().then((fav) => dispatch(setFavourite(fav)));
    }
  }, [authState, authState.token, dispatch]);
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Box>
        <Header />
        <Show above="md">
          <aside className="asideLeftPane">
            <LeftPane />
          </aside>
        </Show>
        <Box as="main">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
