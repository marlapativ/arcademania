import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import defaultSEOConfig from "../../next-seo.config";
import { wrapper } from "../lib/store/store";
import { Chakra } from "lib/components/common/Chakra";
import Layout from "lib/layout";
import "lib/styles/globals.scss";
import "swiper/css/bundle";

/**
 * NextJS Entrypoint.
 *
 * @returns App Component.
 */
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Chakra>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Chakra>
    </Provider>
  );
};

export default MyApp;
