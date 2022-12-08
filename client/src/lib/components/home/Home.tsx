import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Dashboard from "../dashboard/Dashboard";
import { setAxiosAuthHeader } from "lib/config/axios.config";
import { setAccessToken } from "lib/store/slices/authSlice";
import { showSuccess } from "lib/utils/toastUtils";
import { setSessionStorageToken } from "lib/utils/tokenUtils";

/**
 * Home entry point component.
 *
 * @returns Home
 */
const Home = () => {
  const router = useRouter();
  const accessToken: string = router.query.token as string;
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      setAxiosAuthHeader(accessToken);
      setSessionStorageToken(accessToken);
      dispatch(setAccessToken({ token: accessToken }));
      router.push({
        pathname: `/`,
      });
      showSuccess("User logged In Successfully");
    }
  }, [accessToken, dispatch, router]);

  return (
    <>
      <NextSeo title="Home" />
      <Dashboard />
    </>
  );
};

export default Home;
