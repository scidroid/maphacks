import toast, { Toaster } from "react-hot-toast";
import { PayPalButton } from "react-paypal-button-v2";
import { useState } from "react";
import confetti from "canvas-confetti";

const Cause = ({ cause, donationTotal }) => {
  const [donation, setDonation] = useState(0);
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <Toaster />
      <iframe
        className="w-4/5 h-96"
        src={`https://www.youtube-nocookie.com/embed/${
          cause.url.split("https://www.youtube.com/watch?v=")[1]
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Cause video"
      />
      <h1 className={"font-bold text-4xl text-center m-2"}>{cause.name}</h1>
      <h2 className={"font-bold text-3xl text-center m-2"}>
        {"progress: $" + donationTotal + " of $" + cause.nedeed}
      </h2>
      <div className={"flex flex-row items-center justify-center"}>
        <div
          className="w-2/5 container-cause"
          dangerouslySetInnerHTML={{ __html: cause.description }}
        ></div>
        <section className="w-2/5">
          <h2 className={"text-3xl font-bold text-center m-4"}>
            How much money do you want to donate?
          </h2>
          <input
            input={"number"}
            onChange={(e) => setDonation(e.target.value)}
            className={"w-full h-12 p-2 border border-gray-400 mt-4 mb-4"}
          />
          <PayPalButton
            amount={donation}
            onSuccess={(details, data) => {
              confetti({
                particleCount: 500,
                spread: 150,
                origin: { y: 0 },
              });
              toast.success(
                "Transaction completed by " +
                  details.payer.name.given_name +
                  " for $" +
                  details.purchase_units[0].amount.value,
                {
                  duration: 10000,
                }
              );
              return fetch("/api/donation", {
                method: "post",
                body: JSON.stringify({
                  cause: cause.key,
                  money: details.purchase_units[0].amount.value,
                }),
              });
            }}
          />
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(process.env.AUTH0_BASE_URL + "/api/data");
  const causes = await res.json();
  const { id } = context.query;
  const cause = causes.filter((n) => n.key === id)[0];
  const res2 = await fetch(
    process.env.AUTH0_BASE_URL + "/api/donation?id=" + id
  );
  const donations = await res2.json();
  const donationTotal = donations.money;

  return {
    props: {
      cause,
      donationTotal,
    },
  };
};

export default Cause;
