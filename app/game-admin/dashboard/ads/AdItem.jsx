"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const AdItem = ({
  id,
  ad_name,
  ad_client,
  ad_slot,
  ad_format,
  ad_fullWidthResponsive,
}) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const setLoader = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoader(false);
  }, []);

  const toggleAccordion = () => {
    setToggle(!toggle);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    setLoader(true);

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/ads`,
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
    router.push("/game-admin/dashboard/ads", { scroll: false });
    router.refresh();
    setLoader(false);
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
          <span className="font-bold">{ad_name}</span>
          <div className="flex gap-[25px] items-center">
            <i
              className="bi bi-trash-fill text-red-500 cursor-pointer flex text-[18px]"
              onClick={(e) => handleDelete(e, id)}
            ></i>

            <Link
              href={`/game-admin/dashboard/ads/${id}`}
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
        className={`${toggle ? "" : "hidden"} mt-[-8px]`}
        aria-labelledby={`accordion-collapse-heading-${id}`}
      >
        <div className="p-3 border-b-2 border-l-2 border-r-2 border-[#2a2a2a]">
          <code className="text-[15px] text-red-500">
            data-ad-client="<span className="text-green-600">{ad_client}</span>"
          </code>
          <br />
          <code className="text-[15px] text-red-500">
            data-ad-slot="<span className="text-green-600">{ad_slot}</span>"
          </code>
          <br />
          <code className="text-[15px] text-red-500">
            data-ad-format="<span className="text-green-600">{ad_format}</span>"
          </code>
          <br />
          <code className="text-[15px] text-red-500">
            data-full-width-responsive="
            <span className="text-green-600">{ad_fullWidthResponsive}</span>"
          </code>
        </div>
      </div>
    </>
  );
};

export default AdItem;
