"use client";

import Navbar from "@/components/adminComp/Navbar";
import SideBar from "@/components/adminComp/SideBar";
import "../admin.css";
import { Suspense } from "react";
import Loading from "./loding";
import useLoadingStore from "@/store/loadingStore";

export default function DashboardLayout({ children }) {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <>
      <div className="relative bg-[#ededed] min-h-screen z-20">
        <Navbar />
        <SideBar />

        <div className="absolute top-[60px] left-[15%]  right-0 bottom-0 p-[10px] overflow-y-scroll no-scrollbar">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>

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
      </div>
    </>
  );
}
