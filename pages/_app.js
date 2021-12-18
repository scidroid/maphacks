import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Layout from "components/Layout";
import "styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>KindlyMap</title>
      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
};

export default App;
