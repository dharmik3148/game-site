"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const PolicyItem = ({ id, heading, content }) => {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const setLoader = useLoadingStore((state) => state.setLoading);

  const toggleAccordion = () => {
    setToggle(!toggle);
  };

  const handleDelete = async (e, id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this policy topic?"
    );

    if (confirmDelete) {
      e.stopPropagation();

      setLoader(true);

      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/privacypolicy`,

        {
          headers: { id: id, "Cache-Control": "no-store" },
        }
      );

      if (res.data.status !== true) {
        setLoader(false);
        return toast.error(res.data.message);
      }

      toast.success(res.data.message);

      router.push("/game-admin/dashboard/privacy-policy", { scroll: false });
      router.refresh();
      setLoader(false);
    } else {
      return toast.info("Item not deleted");
    }
  };

  return (
    <>
      <h2 id={`accordion-collapse-heading-${id}`}>
        <button
          type="button"
          className="flex item-hover cursor-default items-center justify-between w-full p-3 font-medium border-2 border-[#2a2a2a] gap-3"
          onClick={toggleAccordion}
          aria-expanded={toggle}
          aria-controls={`accordion-collapse-body-${id}`}
        >
          <span className="font-bold">{heading}</span>

          <div className="flex gap-[25px] items-center">
            <i
              className="bi bi-trash-fill text-red-500 cursor-pointer flex text-[18px]"
              onClick={(e) => handleDelete(e, id)}
            ></i>

            <Link
              href={`/game-admin/dashboard/privacy-policy/${id}`}
              onClick={() => setLoader(true)}
            >
              <i className="bi bi-pencil-square text-yellow-500 cursor-pointer flex text-[18px]"></i>
            </Link>

            <svg
              data-accordion-icon
              className={`w-3 h-3 shrink-0 ${toggle ? "" : "rotate-180"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </div>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${id}`}
        className={`${toggle ? "" : "hidden"} mt-[-10px]`}
        aria-labelledby={`accordion-collapse-heading-${id}`}
      >
        <div className="p-3 border-b-2 border-l-2 border-r-2 border-[#2a2a2a]">
          {content}
        </div>
      </div>
    </>
  );
};

export default PolicyItem;
