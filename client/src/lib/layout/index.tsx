import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import LeftPane from "../components/common/SidePanes/LeftPane";

import Footer from "./footer/Footer";
import Header from "./header/Header";

type LayoutProps = {
  children: ReactNode;
};

export async function getStaticProps() {
  return { props: { title: "LeftPane" } };
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Box>
        <Header />
        <aside className="asideLeftPane">
          <LeftPane />
        </aside>
        <Box as="main">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
