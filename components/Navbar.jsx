import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Navbar = () => {
  const { user, isLoading } = useUser();
  return (
    <header
      className={
        "w-full p-4 bg-white flex flex-row items-center justify-around flex-wrap"
      }
    >
      <h1>
        <Link href={"/"}>
          <a className={"text-2xl text-black text-center font-bold"}>
            MapHacks
          </a>
        </Link>
      </h1>
      <Link
        href={isLoading ? "/" : user ? "/api/auth/logout" : "/api/auth/login"}
      >
        <a className={"btn-black"}>
          {isLoading ? "Loading..." : user ? "Logout" : "Login"}
        </a>
      </Link>
    </header>
  );
};

export default Navbar;
