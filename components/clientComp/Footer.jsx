"use client";

import Link from "next/link";
import { SVGFooterBg, SVGPopyLogo } from "./AllSvg";
import useLoadingStore from "@/store/loadingStore";

const Footer = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-nunito text-smokeWhite">
      <SVGFooterBg />
      <section className="bg-siteDarkBlue p-[10px] mt-[-2px] flex items-center lg:flex-row md:flex-row sm:flex-row flex-col lg:justify-evenly md:justify-evenly sm:justify-evenly">
        <div className="flex items-center gap-[10px]">
          <SVGPopyLogo className="h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] md:h-[80px] md:w-[80px] sm:h-[60px] sm:w-[60px] rounded-full" />
          <div className="flex flex-col">
            <h3 className="text-siteDarkYellow text-[22px] font-[800] lg:text-[35px] md:text-[30px] sm:text-[25px]">
              Popy Games
            </h3>
            <span className="text-[17px] ml-[5px]">Play for fun 😍</span>
          </div>
        </div>
        <div className="flex lg:flex-col md:flex-col sm:flex-col max-sm:my-[40px] flex-row items-center justify-center gap-[10px]">
          <Link
            href={"/"}
            onClick={() => setLoading(true)}
            className="font-[600] hover:underline hover:text-siteDarkYellow"
          >
            Home
          </Link>
          <Link
            href={"/about-us"}
            onClick={() => setLoading(true)}
            className="font-[600] hover:underline hover:text-siteDarkYellow"
          >
            About Us
          </Link>
          <Link
            href={"/privacy-policy"}
            onClick={() => setLoading(true)}
            className="font-[600] hover:underline hover:text-siteDarkYellow"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-[800] text-siteDarkYellow">
            Have a question about popy ?
          </span>
          <Link
            href={"mailto:support@popygames.com"}
            className="text-smokeWhite hover:underline hover:text-siteDarkYellow"
          >
            support@popygames.com
          </Link>
        </div>
      </section>

      <p className="bg-siteDarkBlue text-center pt-[30px] pb-[15px] text-[13px] text-siteDarkYellow">
        All rights reserved - &copy; popygames.com, {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
