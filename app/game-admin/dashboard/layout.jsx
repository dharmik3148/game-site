import Navbar from "@/components/adminComp/Navbar";
import SideBar from "@/components/adminComp/SideBar";
import "../admin.css";
import { Suspense } from "react";
import Loading from "./loding";

export const metadata = {
  title: "Admin - Dashboard",
  description: "Manage Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div className="relative bg-[#ededed] min-h-screen">
        <Navbar />
        <SideBar />

        <div className="absolute top-[60px] left-[15%] right-0 bottom-0 p-[10px] overflow-y-scroll no-scrollbar">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </>
  );
}
