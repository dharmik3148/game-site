"use client";

import useLoadingStore from "@/store/loadingStore";
import { useEffect } from "react";

const CloseLoading = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <></>;
};

export default CloseLoading;
