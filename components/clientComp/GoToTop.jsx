"use client";

import { useEffect, useState } from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const listenToScroll = () => {
    let height = 300;
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > height) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: "65px", left: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <div
          className="topBtn bg-siteDarkYellow border-[3px] border-siteDarkBlue"
          onClick={toTop}
        >
          <i className="bi bi-arrow-up-circle-fill text-siteDarkBlue flex text-[30px]"></i>
        </div>
      )}
    </>
  );
};

export default GoToTop;
