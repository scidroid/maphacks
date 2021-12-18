import { useState } from "react";
import { Widget } from "@uploadcare/react-widget";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

const mdParser = new MarkdownIt();

const AddForm = () => {
  const router = useRouter();
  const { lat, lng } = router.query;
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const handleEditorChange = ({ html, text }) => {
    setValue(html);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data["image"] = image;
    data["lat"] = parseFloat(lat);
    data["lng"] = parseFloat(lng);
    data["description"] = value;
    console.log(data);
    toast.promise(
      fetch("/api/data", { method: "post", body: JSON.stringify(data) }),
      {
        loading: "Saving...",
        success: <b>Yor cause was saved!</b>,
        error: <b>Could not save. :(</b>,
      }
    );
    confetti({
      particleCount: 500,
      spread: 150,
      origin: { y: 0 },
    });
  };
  console.log(errors);
  const handleClick = () => {
    setCounter(counter + 1);
  };
  return (
    <div className={"flex items-center justify-center"}>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-3/6 flex flex-col items-center justify-center"}
      >
        {counter === 0 && (
          <>
            <h2 className={"text-2xl font-bold m-2 text-center"}>
              Start adding an image
            </h2>
            <Widget
              publicKey="624de14caf2cf3c7f75c"
              onChange={(info) => {
                setImage(info.cdnUrl);
                handleClick();
              }}
              id="file"
              previewStep="true"
            />
          </>
        )}
        {counter === 1 && (
          <>
            <h2 className={"text-2xl font-bold m-2 text-center"}>
              Nice! let's adding a name
            </h2>
            <input
              className={"border"}
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            <button
              className={"btn-black cursor-pointer m-2"}
              onClick={() => handleClick()}
            >
              Continue
            </button>
          </>
        )}
        {counter === 2 && (
          <>
            <h2 className={"text-2xl font-bold m-2 text-center"}>
              Where your cause is located?
            </h2>
            <input
              className={"border"}
              type="text"
              placeholder="e.g: Barranquilla, Colombia"
              {...register("place", { required: true })}
            />
            <button
              className={"btn-black cursor-pointer m-2"}
              onClick={() => handleClick()}
            >
              Continue
            </button>
          </>
        )}
        {counter === 3 && (
          <>
            <h2 className={"text-2xl font-bold m-2 text-center"}>
              Awesome name, now, how much money do you need?
            </h2>
            <input
              className={"border"}
              type="number"
              min={1}
              placeholder="Amount"
              {...register("nedeed", { required: true })}
            />
            <button
              className={"btn-black cursor-pointer m-2"}
              onClick={() => handleClick()}
            >
              Continue
            </button>
          </>
        )}
        {counter === 4 && (
          <>
            <h2 className={"text-2xl font-bold m-2 text-center"}>
              Ok, talk about why do you need the money, and how you are going to
              use it
            </h2>
            <MdEditor
              className={"w-5/6 h-96"}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              preview="edit"
            />
            <button
              className={"btn-black cursor-pointer m-2"}
              onClick={() => handleClick()}
            >
              Continue
            </button>
          </>
        )}
        {counter === 5 && (
          <>
            <h2 className={"text-2xl font-bold m-2 text-center"}>
              Nice!, this is the last past, upload an youtube video and paste
              here the link.
            </h2>
            <input
              className={"border"}
              type="url"
              placeholder="Youtube URL"
              {...register("url", { required: true })}
            />
            <input
              className={"btn-black cursor-pointer m-2"}
              type={"submit"}
              value={"Submit"}
            />
          </>
        )}
      </form>
      <section
        className={"w-3/6 h-100 flex flex-col items-center justify-center"}
      >
        <img
          src={
            "https://ayudaenaccion.org/ong/wp-content/uploads/2017/12/que-es-una-ong.png"
          }
          alt={"ong image"}
          className={"h-full"}
        />
      </section>
    </div>
  );
};

export default AddForm;
