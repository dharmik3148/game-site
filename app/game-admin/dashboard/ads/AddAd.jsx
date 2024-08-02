"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddAd = () => {
  const [ad_name, setAd_name] = useState("");
  const [ad_client, setAd_client] = useState("");
  const [ad_slot, setAd_slot] = useState("");
  const [ad_format, setAd_format] = useState("auto");
  const [ad_fullWidthResponsive, setAd_fullWidthResponsive] = useState("true");

  const router = useRouter();

  const handleAddAd = async (e) => {
    e.preventDefault();

    if (
      !ad_name ||
      !ad_client ||
      !ad_slot ||
      !ad_format ||
      !ad_fullWidthResponsive
    ) {
      return toast.warning("All fields are required");
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/ads`,
      { ad_name, ad_client, ad_slot, ad_format, ad_fullWidthResponsive },
      { headers: { "Cache-Control": "no-store" } }
    );

    if (res.data.status !== true) {
      return toast.error(res.data.message);
    }

    toast.success(res.data.message);
    setAd_name("");
    setAd_client("");
    setAd_slot("");
    setAd_format("auto");
    setAd_fullWidthResponsive("true");

    router.push("/game-admin/dashboard/ads", { scroll: false });
    router.refresh();
  };

  return (
    <>
      <input
        type="text"
        className="outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
        placeholder="ad name ..."
        onChange={(e) => setAd_name(e.target.value)}
        value={ad_name}
      />
      <input
        type="text"
        className="outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
        placeholder="data-ad-client : ca-pub-XXXXXX"
        onChange={(e) => setAd_client(e.target.value)}
        value={ad_client}
      />
      <input
        type="text"
        className="outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
        placeholder="data-ad-slot : XXXXXX"
        onChange={(e) => setAd_slot(e.target.value)}
        value={ad_slot}
      />

      <div className="radio-button-container outline-none border-2 border-[#2a2a2a] ">
        <span className="px-[10px] text-[#a2a5bb]">data-ad-format :</span>
        <div className="radio-button mr-[15px]">
          <input
            type="radio"
            className="radio-button__input"
            id="radio1"
            name="radio-group"
            value="auto"
            checked={ad_format === "auto"}
            onChange={(e) => setAd_format(e.target.value)}
          />
          <label className="radio-button__label" htmlFor="radio1">
            <span className="radio-button__custom"></span>
            Auto
          </label>
        </div>
        <div className="radio-button">
          <input
            type="radio"
            className="radio-button__input"
            id="radio2"
            name="radio-group"
            value="rectangle"
            checked={ad_format === "rectangle"}
            onChange={(e) => setAd_format(e.target.value)}
          />
          <label className="radio-button__label" htmlFor="radio2">
            <span className="radio-button__custom"></span>
            Rectangle
          </label>
        </div>
      </div>
      <span className="text-red-500 text-[15px] mt-[-10px]">
        *Recommended : auto
      </span>

      <div className="radio-button-container outline-none border-2 border-[#2a2a2a] ">
        <span className="px-[10px] text-[#a2a5bb]">
          data-full-width-responsive :
        </span>
        <div className="radio-button mr-[15px]">
          <input
            type="radio"
            className="radio-button__input"
            id="radio-true"
            name="radio-resp"
            value="true"
            checked={ad_fullWidthResponsive === "true"}
            onChange={(e) => setAd_fullWidthResponsive(e.target.value)}
          />
          <label className="radio-button__label" htmlFor="radio-true">
            <span className="radio-button__custom"></span>
            True
          </label>
        </div>
        <div className="radio-button">
          <input
            type="radio"
            className="radio-button__input"
            id="radio=false"
            name="radio-resp"
            value="false"
            checked={ad_fullWidthResponsive === "false"}
            onChange={(e) => setAd_fullWidthResponsive(e.target.value)}
          />
          <label className="radio-button__label" htmlFor="radio=false">
            <span className="radio-button__custom"></span>
            False
          </label>
        </div>
      </div>
      <span className="text-red-500 text-[15px] mt-[-10px]">
        *Recommended : true
      </span>

      <button
        type="button"
        className="border-2 border-[#2a2a2a] p-[10px] bg-green-500 item-hover"
        onClick={handleAddAd}
      >
        Submit
      </button>
    </>
  );
};

export default AddAd;
