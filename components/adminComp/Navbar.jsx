"use client";

import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <nav className="bg-[#ededed] absolute top-0 left-[15%] right-0 h-[60px] border-b-2 border-[#2a2a2a] flex items-center justify-between px-[15px]">
      <span className="flex items-center justify-center">
        {path !== "/game-admin/dashboard" ? (
          <span
            className="cursor-pointer mr-[10px]"
            onClick={() => router.back()}
          >
            <IoArrowBackCircleSharp size={30} />
          </span>
        ) : (
          <></>
        )}
        {`[${path.split("/").pop()}]`}
      </span>
    </nav>
  );
};

export default Navbar;
