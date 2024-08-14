"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleABoutUs = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const setLoader = useLoadingStore((state) => state.setLoading);

  const router = useRouter();

  const params = useParams();

  useEffect(() => {
    setLoader(true);
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/aboutus/${params.id}`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );

      if (res.data.status !== true) {
        setLoader(false);
        return toast.error(res.data.message);
      }

      setHeading(res.data?.data?.heading);
      setContent(res.data?.data?.content);

      setLoader(false);
    };

    fetch();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoader(true);

    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/aboutus/${params.id}`,
      { id: params.id, heading, content },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );

    if (res.data.status !== true) {
      return toast.error(res.data.message);
    }

    setHeading("");
    setContent("");

    toast.success(res.data.message);

    router.push("/game-admin/dashboard/about-us", { scroll: false });
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-[10px] w-[50%] mx-auto">
      <p className="text-[20px] py-1 flex items-center justify-center font-extrabold bg-[#2a2a2a] text-white">
        About-Us Update Form
      </p>
      <span className="font-bold ml-1">Heading :</span>
      <input
        type="text"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        placeholder="heading or title ..."
        className="outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
      />
      <span className="font-bold ml-1 mt-2">Content :</span>
      <textarea
        rows="10"
        placeholder="about-us content here ..."
        className="resize-none outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="button"
        className="border-2 border-[#2a2a2a] p-[10px] bg-yellow-500 item-hover"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default SingleABoutUs;
