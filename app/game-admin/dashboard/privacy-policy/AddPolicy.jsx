"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddPolicy = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const setLoader = useLoadingStore((state) => state.setLoading);

  const router = useRouter();

  const handleAddPolicy = async (e) => {
    e.preventDefault();

    if (!heading || !content) {
      return toast.warning("All fields are required");
    }

    setLoader(true);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/privacypolicy`,
      { heading, content },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );

    if (res.data.status !== true) {
      setLoader(false);
      return toast.error(res.data.message);
    }

    toast.success(res.data.message);
    setHeading("");
    setContent("");

    router.push("/game-admin/dashboard/privacy-policy", { scroll: false });
    router.refresh();
    setLoader(true);
  };

  return (
    <>
      <input
        type="text"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        placeholder="heading or title ..."
        className="outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
      />
      <textarea
        rows="10"
        placeholder="policy content here ..."
        className="resize-none outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="button"
        className="border-2 border-[#2a2a2a] p-[10px] bg-green-500 item-hover"
        onClick={handleAddPolicy}
      >
        Submit
      </button>
    </>
  );
};

export default AddPolicy;
