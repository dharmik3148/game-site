"use client";

import useLoadingStore from "@/store/loadingStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PolicyAd = ({ ads, allAds }) => {
  const [isChecked, setIsChecked] = useState(ads.ad_status);

  const router = useRouter();

  const setLoader = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoader(false);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    const id = e.target.value;

    toast.success(id);
    // router.push("/game-admin/dashboard/privacy-policy");
    // router.refresh();
  };

  return (
    <div className="mb-[10px] flex items-center gap-[15px]">
      <div className="cl-toggle-switch flex border-2 border-[#2a2a2a] p-[10px] rounded-full">
        <span className="text-[#979c97]">Ad-Status :</span>
        <label className="cl-switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
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
            onChange={handleChange}
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

export default PolicyAd;
