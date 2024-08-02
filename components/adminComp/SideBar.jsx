"use client";

import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SideLink from "./SideLink";
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
        headers: { "Cache-Control": "no-store" },
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

  const navLinks = [
    {
      sectionName: "Manage Games",
      links: [
        {
          name: "Dashboard",
          path: "/game-admin/dashboard",
          icon: "bi bi-speedometer",
        },
        {
          name: "Games",
          path: "/game-admin/dashboard/games",
          icon: "bi bi-joystick",
        },
        {
          name: "Category",
          path: "/game-admin/dashboard/category",
          icon: "bi bi-tag",
        },
        {
          name: "Game-Type",
          path: "/game-admin/dashboard/gametype",
          icon: "bi bi-bar-chart-steps",
        },
        {
          name: "Ads",
          path: "/game-admin/dashboard/ads",
          icon: "bi bi-badge-ad",
        },
      ],
    },
    {
      sectionName: "Pages",
      links: [
        {
          name: "Privacy Policy",
          path: "/game-admin/dashboard/privacy-policy",
          icon: "bi bi-shield-check",
        },
        {
          name: "About Us",
          path: "/game-admin/dashboard/about-us",
          icon: "bi bi-info-circle",
        },
      ],
    },
    {
      sectionName: "Setting",
      links: [
        {
          name: "ads.txt",
          path: "/game-admin/dashboard/ads-txt",
          icon: "bi bi-braces",
        },
      ],
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

        {navLinks?.map((item, key) => {
          return (
            <div key={key} className="flex flex-col gap-2">
              <span className="bg-yellow-300 w-fit px-[10px] rounded-2xl text-[#2a2a2a] text-[13px]">
                {item.sectionName}
              </span>
              {item?.links.map((lnk, key) => {
                return (
                  <SideLink
                    key={key}
                    name={lnk.name}
                    path={lnk.path}
                    icon={lnk.icon}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <Link
        href={"/game-admin/dashboard/games/add-game"}
        className="absolute bg-blue-500 bottom-[50px] left-0 right-0 m-2 h-[40px] border-[2px] border-[#2a2a2a] item-hover flex gap-2 items-center justify-center"
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
