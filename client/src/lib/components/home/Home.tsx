import { NextSeo } from "next-seo";

import Dashboard from "../dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <NextSeo title="Home" />
      <Dashboard />
    </>
  );
};

export default Home;
