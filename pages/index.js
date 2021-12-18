import createGlobe from "cobe";
import { useRef, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";

const Landing = () => {
  const { user, isLoading } = useUser();
  const mapRef = useRef();
  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(mapRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [{ location: [-74.7963, 10.9638], size: 0 }],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);
  return (
    <>
      <section className={"flex flex-col items-center justify-center"}>
        <canvas
          ref={mapRef}
          style={{
            width: "500px",
            height: "500px",
          }}
        />
        <h2 className={"text-3xl text-center font-bold"}>
          A lot of people in the world needs help.
        </h2>
        <h2 className={"text-2xl text-center font-semibold text-red-600"}>
          But few get it
        </h2>
        <svg className={"animate-bounce w-10 h-14 m-8"}>
          <g>
            <path d="M36.885,32.535C36.712,32.206,36.372,32,36,32H26V0h-2v32H14c-0.372,0-0.712,0.206-0.885,0.535   c-0.173,0.329-0.149,0.726,0.061,1.032l11,16C24.362,49.838,24.671,50,25,50c0.329,0,0.638-0.162,0.824-0.434l11-16   C37.035,33.261,37.058,32.863,36.885,32.535z M24,34v11.78L15.901,34H24z M26,45.78V34h8.099L26,45.78z" />
          </g>
        </svg>
      </section>
      <section className={"flex flex-col items-center justify-center"}>
        <h2 className={"text-6xl font-bold mt-8 m-4 text-center"}>
          But{" "}
          <span
            className={
              "leading-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-400"
            }
          >
            you
          </span>{" "}
          have the{" "}
          <span
            className={
              "leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700"
            }
          >
            solution
          </span>
        </h2>
        <p className={"text-center min-w-medium max-w-md w-2/3 text-lg"}>
          You can impact your community, help others and contribute to global
          change at the click of a button. Start discovering causes in your
          community and around the world. Helping is in your hands.
        </p>
        <Link href={isLoading ? "/" : user ? "/app" : "/api/auth/login"}>
          <a className={"btn-black m-4"}>
            {isLoading ? "Loading..." : user ? "Start now" : "Login to start"}
          </a>
        </Link>
      </section>
      <section
        className={"flex flex-row flex-wrap p-20 justify-evenly items-center"}
      >
        <Image src={"/person.png"} width={300} height={450} alt={"person"} />
        <article className={"m-4 max-w-sm"}>
          <h2 className="text-5xl m-2 font-bold text-center">Our misssion is help without comissions</h2>
          <ul>
            <li className={"m-2 text-2xl text-center"}>No fees for anyone</li>
            <li className={"m-2 text-2xl text-center"}>Verified causes</li>
            <li className={"m-2 text-2xl text-center"}>Automatic donations</li>
          </ul>
        </article>
      </section>
      <section
        className={"flex flex-row flex-wrap justify-evenly items-center m-6"}
      >
        <section className={"flex flex-col justify-center items-center"}>
          <h2 className={"text-5xl font-bold m-4 text-center"}>
            Start buildind a better <span className={"underline"}>world!</span>
          </h2>
          <p className={"m-4 text-xl text-center max-w-lg"}>
            You already have everything to start, login and help your community in minutes.
          </p>
        </section>
        <Link href={isLoading ? "/" : user ? "/app" : "/api/auth/login"}>
          <a className={"btn-black"}>
            {isLoading
              ? "Loading..."
              : user
              ? "Start now"
              : "Login to start"}
          </a>
        </Link>
      </section>
    </>
  );
};

export default Landing;
