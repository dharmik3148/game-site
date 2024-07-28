"use client";

import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SideLink from "./SideLink";
import { CgGames } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { TbCategoryFilled } from "react-icons/tb";
import { FaTag } from "react-icons/fa6";
import { SiGoogleadsense } from "react-icons/si";
import { MdPrivacyTip } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import "./adminComp.css";

import Link from "next/link";

const SideBar = () => {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();

    const token = getCookie("token");
    const userId = getCookie("adminId");

    if (!token || !userId) {
      return toast.error("Authorization failed");
    }

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth`,
      {
        headers: { "Content-Type": "application/json" },
        data: { token, userId },
      }
    );

    if (res.data.status === false) {
      toast.error(res.data.message);
    }

    router.push("/game-admin/login");
    router.refresh();

    if (res.data.status === true) {
      toast.success(res.data.message);
    }

    deleteCookie("token");
    deleteCookie("adminId");
  };

  const sidelinks = [
    {
      name: "Dashboard",
      path: "/game-admin/dashboard",
      icon: <AiFillHome />,
    },
    { name: "Games", path: "/game-admin/dashboard/games", icon: <CgGames /> },
    {
      name: "Category",
      path: "/game-admin/dashboard/category",
      icon: <TbCategoryFilled />,
    },
    {
      name: "Game-Type",
      path: "/game-admin/dashboard/gametype",
      icon: <FaTag />,
    },
    {
      name: "Ads",
      path: "/game-admin/dashboard/ads",
      icon: <SiGoogleadsense />,
    },
    {
      name: "Privacy Policy",
      path: "/game-admin/dashboard/privacy-policy",
      icon: <MdPrivacyTip />,
    },
    {
      name: "About Us",
      path: "/game-admin/dashboard/about-us",
      icon: <BsInfoCircleFill />,
    },
  ];

  return (
    <section className="bg-[#ededed] absolute top-0 left-0 bottom-0 w-[15%] border-r-2 border-[#2a2a2a]">
      <div className="h-full flex flex-col p-2 gap-2">
        <Link
          href={"/game-admin/dashboard"}
          className="border-b-[2px] border-[#2a2a2a] bg-[#2a2a2a] text-[#ededed] text-[25px] font-bold h-[50px] flex items-center justify-center rounded-none"
        >
          Admin
        </Link>
        {sidelinks?.map((item, key) => {
          return (
            <SideLink
              key={key}
              name={item.name}
              path={item.path}
              icon={item.icon}
            />
          );
        })}
      </div>

      <Link
        href={"/game-admin/dashboard/games/add-game"}
        className="absolute bg-blue-500 bottom-[50px] left-0 right-0 m-2 h-[40px] border-[2px] border-[#2a2a2a] item-hover flex items-center justify-center"
      >
        Add Game
      </Link>

      <button
        type="button"
        className="absolute bg-red-500 bottom-0 left-0 right-0 m-2 h-[40px] border-[2px] border-[#2a2a2a] item-hover"
        onClick={handleLogout}
      >
        Logout
      </button>
    </section>
  );
};

export default SideBar;
