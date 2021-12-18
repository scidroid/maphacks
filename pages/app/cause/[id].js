import Image from "next/image";

const Cause = ({ cause }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={cause.image}
        alt={cause.name}
        width="900px"
        height="300px"
        objectFit="cover"
      />
      <h1 className="m-2 font-extrabold text-center text-7xl">{cause.name}</h1>
      <h2 className="m-2 font-bold text-3xl">{cause.place}</h2>
      <div className="flex flex-row flex-wrap justify-around items-center">
        <div
          className="w-2/5 container-cause"
          dangerouslySetInnerHTML={{ __html: cause.description }}
        ></div>
        <iframe
          className="w-2/5 h-96"
          src={`https://www.youtube.com/embed/${
            cause.url.split("https://www.youtube.com/watch?v=")[1]
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(process.env.AUTH0_BASE_URL + "/api/data");
  const causes = await res.json();
  const { id } = context.query;
  const cause = causes.filter((n) => n.key === id)[0];

  return {
    props: {
      cause,
    },
  };
};

export default Cause;