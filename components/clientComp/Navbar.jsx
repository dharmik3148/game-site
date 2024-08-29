"use client";

import { useEffect, useState } from "react";
import {
  SVGAboutUsIcon,
  SVGCloseMenu,
  SVGHomeIcon,
  SVGMenuIcon,
  SVGPopyLogo,
  SVGPrivacyPolicyIcon,
} from "./AllSvg";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useLoadingStore from "@/store/loadingStore";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setcategories] = useState([]);

  const setLoading = useLoadingStore((state) => state.setLoading);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/category`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );
      setcategories(res.data.data);
    };
    fetchCategory();
  }, []);

  return (
    <>
      <header className="bg-siteDarkBlue bg-opacity-90 backdrop-blur fixed top-0 left-0 right-0 font-nunito font-[900] text-white h-[60px] flex items-center text-[20px] z-10">
        <div
          className="mx-[10px] h-[45px] w-[45px] cursor-pointer hover:bg-siteBlue rounded-full flex items-center justify-center transition duration-300 ease"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <SVGCloseMenu /> : <SVGMenuIcon />}
        </div>
        <Link
          href={"/"}
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center gap-[7px] text-siteDarkYellow"
        >
          <SVGPopyLogo className="flex h-[58px] w-[58px]" /> Popy Games
        </Link>
      </header>
      {isSidebarOpen && (
        <div
          className="fixed top-[60px] inset-0 bg-siteDarkBlue bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <nav
        className={`fixed top-[60px] bottom-[0px] left-0 lg:w-[20%] md:w-[30%] max-sm:w-[100%] overflow-y-auto pb-[10px] custom-scrollbar bg-siteDarkBlue bg-opacity-90 backdrop-blur text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-[10px] mt-[10px] flex flex-col gap-[10px]">
          <Link
            href={"/"}
            onClick={() => {
              setIsSidebarOpen(false);
            }}
            className="flex items-center font-nunito font-[600] gap-[10px] cursor-pointer rounded-md px-[10px] py-[5px] hoverDiv"
          >
            <SVGHomeIcon />
            <span className="slideSpan">Home</span>
          </Link>

          {categories &&
            categories.map((item, key) => {
              return (
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/category/${
                    item.id
                  }?name=${item.category_name.toLowerCase()}`}
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setLoading(true);
                  }}
                  className="flex items-center font-nunito font-[600] gap-[10px] cursor-pointer rounded-md px-[10px] py-[5px] hoverDiv"
                  key={key}
                >
                  <Image
                    src={item.category_img}
                    height={33}
                    width={33}
                    alt={`img/${item.category_name}`}
                    className="pointer-events-none"
                  />
                  <span className="slideSpan">{item.category_name}</span>
                </Link>
              );
            })}
          <hr className="border-deviderGray" />

          <Link
            href={"/about-us"}
            onClick={() => {
              setIsSidebarOpen(false);
              setLoading(true);
            }}
            className="flex items-center font-nunito font-[600] gap-[10px] cursor-pointer rounded-md px-[10px] py-[5px] hoverDiv"
          >
            <SVGAboutUsIcon />
            <span className="slideSpan">About Us</span>
          </Link>
          <Link
            href={"/privacy-policy"}
            onClick={() => {
              setIsSidebarOpen(false);
              setLoading(true);
            }}
            className="flex items-center font-nunito font-[600] gap-[10px] cursor-pointer rounded-md px-[10px] py-[5px] hoverDiv"
          >
            <SVGPrivacyPolicyIcon />
            <span className="slideSpan">Privacy Policy</span>
          </Link>
        </div>

        <span className="flex flex-col items-center justify-center text-siteDarkYellow font-nunito text-[12px] mt-[70px]">
          <SVGPopyLogo className="flex h-[50px] w-fit" /> &copy;
          {currentYear} PopyGames
        </span>
      </nav>
    </>
  );
};

export default Navbar;
