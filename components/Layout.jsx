import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  if (router.pathname === "/app") {
    return <main>{children}</main>;
  }
  return (
    <div className={"min-h-screen flex flex-col justify-between"}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
