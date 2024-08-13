"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageAdsTxt = () => {
  const router = useRouter();

  const [content, setContent] = useState("");

  const setLoader = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/adstxt`,
        { headers: { "Cache-Control": "no-store" } }
      );

      if (res.data.status !== true) {
        return toast.error(res.data.message);
      }

      setContent(res.data.content);
    };

    fetch();
    setLoader(false);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoader(true);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/adstxt`,
      { content },
      { headers: { "Cache-Control": "no-store" } }
    );

    if (res.data.status !== true) {
      setLoader(false);
      return toast.error(res.data.message);
    }

    toast.success("ads.txt updated");

    router.push("/game-admin/dashboard/ads-txt");
    router.refresh();
    setLoader(false);
  };

  return (
    <>
      <textarea
        rows={15}
        className="border-2 border-[#2a2a2a] resize-none mb-[10px] p-[10px] outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-[10px]">
        <button
          type="button"
          className="border-2 item-hover border-[#2a2a2a] w-fit p-[10px] px-[20px] bg-yellow-500"
          onClick={handleUpdate}
        >
          Update
        </button>
        <Link
          href={"/ads.txt"}
          className="border-2 item-hover border-[#2a2a2a] w-fit p-[10px] px-[20px] bg-green-500"
          target="_blank"
        >
          Check ads.txt
        </Link>
      </div>
    </>
  );
};

export default ManageAdsTxt;
