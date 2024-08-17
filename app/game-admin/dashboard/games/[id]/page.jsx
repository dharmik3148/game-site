"use client";

import useLoadingStore from "@/store/loadingStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();

  const params = useParams();

  const [adId, setadId] = useState(null);
  const [categoryId, setcategoryId] = useState(null);
  const [gametypeid, setgametypeid] = useState(null);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const [thumbnail, setthumbnail] = useState(null);
  const [thumbpreview, setthumbpreview] = useState(null);
  const [gamezip, setgamezip] = useState(null);

  const [count, setcount] = useState(0);
  const [adStatus, setadStatus] = useState(true);
  const [gameStatus, setgameStatus] = useState(true);

  const [pagetitle, setpagetitle] = useState("");
  const [metadescription, setmetadescription] = useState("");

  const setLoader = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoader(false);
  }, []);

  return <div>page</div>;
};

export default page;
