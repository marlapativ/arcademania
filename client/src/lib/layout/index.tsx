import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import SideBar from "../components/common/leftPane/LeftBar";

import Footer from "./footer/Footer";
import Header from "./header/Header";

type LayoutProps = {
  children: ReactNode;
};

export async function getStaticProps() {
  return { props: { title: "SideBar" } };
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Box>
        <Header />
        <aside className="asideLeftPane">
          <SideBar />
        </aside>
        <Box as="main">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
