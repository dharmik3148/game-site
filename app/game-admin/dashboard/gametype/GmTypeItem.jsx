"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const GmTypeItem = ({ id, image, name }) => {
  const router = useRouter();

  const setLoader = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoader(false);
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game-type?"
    );

    if (confirmDelete) {
      setLoader(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/gametype`,
        {
          headers: {
            id,
            "Cache-Control": "no-store",
          },
        }
      );

      if (res.data.status !== true) {
        setLoader(false);
        return toast.error(res.data.message);
      }

      toast.success(res.data.message);
      router.push("/game-admin/dashboard/gametype", { scroll: false });
      router.refresh();
      setLoader(false);
    } else {
      return toast.info("Not Deleted");
    }
  };

  return (
    <div
      className="flex items-center border-2 border-[#2a2a2a] p-[7px] item-hover"
      key={id}
    >
      <img
        src={image}
        width={100}
        height={100}
        alt={id}
        className="h-[50px] w-[50px] rounded-md"
        loading="lazy"
      />

      <span className="ml-[10px]">{name}</span>

      <div className="flex gap-[10px] h-full ml-auto">
        <Link
          className="bg-yellow-500 px-[8px] border-2 border-[#2a2a2a] flex items-center justify-center"
          href={`/game-admin/dashboard/gametype/${id}`}
          onClick={() => setLoader(true)}
        >
          Edit
        </Link>
        <button
          className="bg-red-500 px-[8px] border-2 border-[#2a2a2a]"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GmTypeItem;
