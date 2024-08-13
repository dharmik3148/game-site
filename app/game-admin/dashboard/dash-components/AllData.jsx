"use client";

import useLoadingStore from "@/store/loadingStore";
import { useEffect } from "react";

const AllData = ({ data }) => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-[10px]">
      <div className="col-span-1 flex items-center justify-between p-[10px] item-hover border-2 border-[#2a2a2a] bg-red-200">
        <i className="bi bi-joystick text-[25px]"> Games</i>
        <span className="text-[50px] font-extrabold">{data.games}</span>
      </div>
      <div className="col-span-1 flex items-center justify-between p-[10px] item-hover border-2 border-[#2a2a2a] bg-green-200">
        <i className="bi bi-tag-fill text-[25px]"> Categories</i>
        <span className="text-[50px] font-extrabold">{data.categories}</span>
      </div>
      <div className="col-span-1 flex items-center justify-between p-[10px] item-hover border-2 border-[#2a2a2a] bg-yellow-200">
        <i className="bi bi-bar-chart-steps text-[25px]"> GameTypes</i>
        <span className="text-[50px] font-extrabold">{data.game_types}</span>
      </div>
      <div className="col-span-1 flex items-center justify-between p-[10px] item-hover border-2 border-[#2a2a2a] bg-purple-200">
        <i className="bi bi-badge-ad-fill text-[25px]"> Ads</i>
        <span className="text-[50px] font-extrabold">{data.ads}</span>
      </div>
    </div>
  );
};

export default AllData;
