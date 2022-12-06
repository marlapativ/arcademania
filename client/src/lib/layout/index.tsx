import { Box, Show } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import LeftPane from "../components/common/sidePanes/LeftPane";
import { setAxiosAuthHeader } from "lib/config/axios.config";
import { setAccessToken } from "lib/store/slices/authSlice";
import { getSessionStorageToken } from "lib/utils/tokenUtils";

import Footer from "./footer/Footer";
import Header from "./header/Header";

type LayoutProps = {
  children: ReactNode;
};

export async function getStaticProps() {
  return { props: { title: "LeftPane" } };
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getSessionStorageToken();
    if (token && token !== "") {
      setAxiosAuthHeader(token);
      dispatch(setAccessToken({ token }));
    }
  });
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Show above="md">
        <aside className="asideLeftPane">
          <LeftPane />
        </aside>
      </Show>
      <Box>
        <Header />
        <Box as="main">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
