"use client";

import { UploadSVG } from "@/components/adminComp/SVG";
import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Addcat = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const router = useRouter();

  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddCat = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      return toast.warning("All fields are required");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("cat_img", file);
    formData.append("category_name", name);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/category`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-store",
        },
      }
    );

    if (res.data.status !== true) {
      return toast.error("adwdw" + res.data.message);
    }

    setFile(null);
    setPreview("");
    setName("");

    router.push("/game-admin/dashboard/category", { scroll: false });
    router.refresh();

    setLoading(false);
    toast.success(res.data.message);
  };

  return (
    <>
      <input
        type="text"
        className="outline-none border-2 border-[#2a2a2a] px-[10px] py-[8px] bg-inherit"
        placeholder="category name ..."
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
          {file != null ? (
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
        className="border-2 border-[#2a2a2a] p-[10px] bg-green-500 item-hover"
        onClick={handleAddCat}
      >
        Submit
      </button>
    </>
  );
};

export default Addcat;
