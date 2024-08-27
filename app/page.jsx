"use client";
import HomePage from "@/components/clientComp/HomePage";
import useLoadingStore from "@/store/loadingStore";
import { useEffect } from "react";

export default function Home() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <HomePage />

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
}
