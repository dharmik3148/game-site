import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideLink = ({ name, path, icon }) => {
  const pathname = usePathname();

  const isActive = pathname === path;
  return (
    <>
      <Link
        href={path}
        passHref
        className={`border-[2px] border-[#2a2a2a] py-2 px-3 flex items-center justify-between rounded-none hover:bg-[#3d3d3d] hover:text-[#ededed] ${
          isActive ? "bg-[#2a2a2a] text-[#ededed]" : ""
        }`}
        prefetch={false}
      >
        {name}
        <span className="text-[18px]">{icon}</span>
      </Link>
    </>
  );
};

export default SideLink;
