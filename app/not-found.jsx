"use client";

import useLoadingStore from "@/store/loadingStore";
import Link from "next/link";
import React, { useEffect } from "react";

const NotFound = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="pt-[60px] h-screen">
      <h1>Not found – 404!</h1>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
