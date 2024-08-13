import useLoadingStore from "@/store/loadingStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideLink = ({ name, path, icon }) => {
  const pathname = usePathname();

  const setLoading = useLoadingStore((state) => state.setLoading);

  const isActive = pathname === path;
  return (
    <>
      <Link
        href={path}
        passHref
        className={`border-[2px] border-[#2a2a2a] py-2 px-3 flex items-center justify-between rounded-none item-hover ${
          isActive ? "bg-[#2a2a2a] text-[#ededed]" : ""
        }`}
        prefetch={false}
        onClick={() => setLoading(true)}
      >
        {name}
        <i className={`${icon} text-[20px] flex`}></i>
      </Link>
    </>
  );
};

export default SideLink;
