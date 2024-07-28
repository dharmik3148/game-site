"use client";

import { UploadSVG } from "@/components/adminComp/SVG";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdImageSearch } from "react-icons/md";
import { toast } from "react-toastify";

const AddGmType = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddGmType = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      return toast.warning("All fields are required");
    }

    const formData = new FormData();
    formData.append("gametype_img", file);
    formData.append("name", name);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/gametype`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.status !== true) {
      return toast.error(res.data.message);
    }

    toast.success(res.data.message);
    setFile(null);
    setPreview("");
    setName("");

    router.refresh();
  };

  return (
    <>
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
          {file != null ? (
            <Image
              src={preview}
              height={100}
              width={100}
              alt="uploaded"
              className="h-full w-full object-contain"
            />
          ) : (
            <MdImageSearch
              className="h-full w-full p-[70px] cursor-no-drop"
              size={40}
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="border-2 border-[#2a2a2a] p-[10px] bg-green-500 item-hover"
        onClick={handleAddGmType}
      >
        Submit
      </button>
    </>
  );
};

export default AddGmType;
