"use client";

import { UploadSVG } from "@/components/adminComp/SVG";
import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GameTypeId = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const setLoader = useLoadingStore((state) => state.setLoading);

  const router = useRouter();

  const params = useParams();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdateGameType = async (e) => {
    e.preventDefault();

    setLoader(true);

    const formData = new FormData();
    formData.append("gametype_img", file);
    formData.append("name", name);

    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/gametype/${params.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-store",
        },
      }
    );

    if (res.data.status !== true) {
      setLoader(false);
      return toast.error(res.data.message);
    }

    setFile(null);
    setPreview("");
    setName("");

    router.push("/game-admin/dashboard/gametype", { scroll: false });
    router.refresh();
    setLoader(false);
    toast.success(res.data.message);
  };

  useEffect(() => {
    setLoader(true);

    const fetch = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/gametype/${params.id}`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );

      if (res.data.status !== true) {
        setLoader(false);
        return toast.error(res.data.message);
      }

      setName(res.data?.data?.name);
      setPreview(res.data?.data?.type_img);

      setLoader(false);
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-[10px] mx-auto w-[50%]">
      <p className="text-[20px] py-1 flex items-center justify-center font-extrabold bg-[#2a2a2a] text-white">
        GameType Update Form
      </p>
      <input
        type="text"
        className="outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
        placeholder="gametype name ..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <div className="grid grid-cols-2 gap-[10px]">
        <div className="col-span-1  max-h-[200px]">
          <label className="custum-file-upload" htmlFor="file">
            <div className="icon">
              <UploadSVG />
            </div>
            <div className="text flex flex-col">
              <span>Click to upload</span>
              <span>(512x512)</span>
            </div>
            <input
              type="file"
              id="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col-span-1 max-h-[200px] border-2 border-[#a5a5a5]">
          {preview != "" ? (
            <Image
              src={preview}
              height={100}
              width={100}
              alt="uploaded"
              className="h-full w-full object-contain"
            />
          ) : (
            <i className="bi bi-card-image flex h-full items-center justify-center text-[50px] cursor-no-drop"></i>
          )}
        </div>
      </div>
      <button
        type="button"
        className="border-2 border-[#2a2a2a] p-[10px] bg-yellow-500 item-hover"
        onClick={handleUpdateGameType}
      >
        Update
      </button>
    </div>
  );
};

export default GameTypeId;
