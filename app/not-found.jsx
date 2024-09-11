"use client";

import useLoadingStore from "@/store/loadingStore";
import Link from "next/link";
import React, { useEffect } from "react";

const NotFound = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="pt-[60px] font-nunito h-screen flex items-center text-center justify-center flex-col">
      <h1 className="text-smokeBlack text-[150px] max-sm:text-[100px] font-[800]">
        404
      </h1>
      <h2 className="text-smokeBlack text-[50px] max-sm:text-[30px] mb-[10px] font-[800]">
        Oops, are you lost !?
      </h2>

      <Link
        href="/"
        className="border-[3px] border-siteDarkBlue rounded-full bg-siteDarkYellow p-[10px] font-[800] text-[20px]"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
