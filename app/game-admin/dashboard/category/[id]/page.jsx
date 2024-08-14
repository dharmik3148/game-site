"use client";

import useLoadingStore from "@/store/loadingStore";
import { useEffect } from "react";

const CatId = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <div>CatId</div>;
};

export default CatId;
