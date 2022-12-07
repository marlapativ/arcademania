import { NextSeo } from "next-seo";

import Dashboard from "../dashboard/Dashboard";

/**
 * Home entry point component.
 *
 * @returns Home
 */
const Home = () => {
  return (
    <>
      <NextSeo title="Home" />
      <Dashboard />
    </>
  );
};

export default Home;
