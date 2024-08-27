"use client";

import useLoadingStore from "@/store/loadingStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Category = async () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  const params = useParams();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <main className="py-[60px] font-nunito h-screen overflow-auto px-[13px]">
      <h1 className="lg:text-[40px] md:text-[40px] sm:text-[30px] text-[30px] font-[800] text-siteDarkBlue drop-shadow text-center my-[20px]">
        {params.id}
      </h1>
    </main>
  );
};

export default Category;
