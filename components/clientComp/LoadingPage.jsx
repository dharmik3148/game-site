"use client";

import useLoadingStore from "@/store/loadingStore";
import { useEffect } from "react";

const LoadingPage = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 loading-bg">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingPage;
