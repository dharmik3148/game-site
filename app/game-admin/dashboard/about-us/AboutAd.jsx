"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AboutAd = ({ ads, allAds }) => {
  const [isChecked, setIsChecked] = useState(ads.ad_status);
  const [selectedAd, setSelectedAd] = useState(ads.ad?.id || "null");

  const setLoader = useLoadingStore((state) => state.setLoading);

  const router = useRouter();

  useEffect(() => {
    setLoader(false);
  }, []);

  const updateAdSettings = async (adStatus, adId) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/pageads`,
        { pagetype: "about-us", ad_status: adStatus, ad_id: adId },
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );

      if (res.data.status !== true) {
        throw new Error(res.data.message);
      }

      router.push("/game-admin/dashboard/about-us");
      router.refresh();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleCheckboxChange = (e) => {
    const newStatus = e.target.checked;
    setIsChecked(newStatus);
    updateAdSettings(newStatus, selectedAd);
  };

  const handleSelectChange = (e) => {
    const newAdId = e.target.value;
    setSelectedAd(newAdId);
    updateAdSettings(isChecked, newAdId);
  };

  return (
    <div className="mb-[10px] flex items-center gap-[15px]">
      <div className="cl-toggle-switch flex border-2 border-[#2a2a2a] p-[10px] rounded-full">
        <span className="text-[#979c97]">Ad-Status :</span>
        <label className="cl-switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="flex"></span>
        </label>
      </div>
      <div className="border-2 border-[#2a2a2a] p-[10px] rounded-full">
        <span className="text-[#979c97]">Linked Ad : </span>
        {ads.ad !== null ? (
          <span className="text-blue-500">{ads.ad.ad_name}</span>
        ) : (
          <span className="text-red-500">No Ad</span>
        )}
      </div>
      <div className="border-l-2 border-[#2a2a2a] pl-[10px]">
        <span className="text-[#979c97]">Select an Ad : </span>
        {allAds.length > 0 ? (
          <select
            value={selectedAd}
            onChange={handleSelectChange}
            className=" rounded-full p-[10px] focus:outline-none bg-inherit border-2 border-[#2a2a2a]"
          >
            <option value="null">None</option>
            {allAds.map((item, key) => {
              return (
                <option key={key} value={item.id}>
                  {item.ad_name}
                </option>
              );
            })}
          </select>
        ) : (
          <span className="text-red-500">No Ads</span>
        )}
      </div>
    </div>
  );
};

export default AboutAd;
