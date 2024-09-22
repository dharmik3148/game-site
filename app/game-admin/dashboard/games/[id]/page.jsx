"use client";

import { ImageUpload } from "@/components/adminComp/SVG";
import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
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

  const [game_folder, setgame_folder] = useState("");
  const [thumbnail_name, setthumbnail_name] = useState("");

  const [count, setcount] = useState(0);
  const [adStatus, setadStatus] = useState(true);
  const [gameStatus, setgameStatus] = useState(true);

  const [pagetitle, setpagetitle] = useState("");
  const [metadescription, setmetadescription] = useState("");

  const [allAds, setAllAds] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const [allGameType, setAllGameType] = useState([]);

  const setLoader = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoader(true);

    const fetch = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/game/${params.id}`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );

      if (res.data.status !== true) {
        setLoader(false);
        return toast.error(res.data.message);
      }

      const data = res.data;

      setAllAds(data.groundData.ads);
      setAllCat(data.groundData.category);
      setAllGameType(data.groundData.gametype);

      setadId(data.game.adId);
      setcategoryId(data.game.categoryId);
      setgametypeid(data.game.game_typeId);
      setadStatus(data.game.ad_status);
      setgameStatus(data.game.game_status);
      setpagetitle(data.game.page_title);
      setmetadescription(data.game.meta_description);
      settitle(data.game.title);
      setdescription(data.game.description);
      setcount(data.game.played_count);
      setthumbpreview(data.game.thumbnail);

      setgame_folder(data.game.game_folder);
      setthumbnail_name(data.game.thumbnail_path);

      setLoader(false);
    };

    fetch();
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setthumbnail(file);
    setthumbpreview(URL.createObjectURL(file));
  };

  const handleUpdateGame = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !count ||
      !pagetitle ||
      !metadescription ||
      adId === "null" ||
      categoryId === "null" ||
      gametypeid === "null"
    ) {
      return toast.warning("Only thumbnail & gamezip can be left empty");
    }

    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("played_count", count);
      formData.append("page_title", pagetitle);
      formData.append("meta_description", metadescription);
      formData.append("ad_status", adStatus);
      formData.append("game_status", gameStatus);
      formData.append("adId", adId);
      formData.append("categoryId", categoryId);
      formData.append("game_typeId", gametypeid);
      formData.append("gm_thumbnail", thumbnail);
      formData.append("gm_folder", gamezip);
      formData.append("game_folder", game_folder);
      formData.append("thumbnail_path", thumbnail_name);

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/game/${params.id}`,
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

      router.push("/game-admin/dashboard/games");
      router.refresh();
      setLoader(false);
      toast.success(res.data.message);
    } catch (error) {
      setLoader(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-[10px]">
        <div className="col-span-1 gap-[10px] flex flex-col">
          <div className="input-field">
            <label htmlFor="ads w-full">
              Select an Ad
              <Link
                href={"/game-admin/dashboard/ads"}
                className="text-blue-700 ml-[10px] font-extralight text-[12px] underline"
              >
                add advertisement!
              </Link>
            </label>
            {allAds?.length > 0 ? (
              <select
                className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 h-[40px]"
                onChange={(e) => setadId(e.target.value)}
                value={adId}
              >
                <option value="null">None</option>
                {allAds.map((item, key) => {
                  return (
                    <option key={key} value={item.id}>
                      {item.ad_name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <span className="text-red-500">No Ads</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="category">
              Select a Category
              <Link
                href={"/game-admin/dashboard/category"}
                className="text-blue-700 ml-[10px] font-extralight text-[12px] underline"
              >
                add category!
              </Link>
            </label>
            {allCat?.length > 0 ? (
              <select
                className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 h-[40px]"
                onChange={(e) => setcategoryId(e.target.value)}
                value={categoryId}
              >
                <option value="null">None</option>
                {allCat?.map((item, key) => {
                  return (
                    <option key={key} value={item.id}>
                      {item.category_name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <span className="text-red-500">No Category</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="gametype">
              Select a GameType
              <Link
                href={"/game-admin/dashboard/gametype"}
                className="text-blue-700 ml-[10px] font-extralight text-[12px] underline"
              >
                add game-type!
              </Link>
            </label>
            {allGameType?.length > 0 ? (
              <select
                className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 h-[40px]"
                onChange={(e) => setgametypeid(e.target.value)}
                value={gametypeid}
              >
                <option value="null">None</option>
                {allGameType?.map((item, key) => {
                  return (
                    <option key={key} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <span className="text-red-500">No GameType</span>
            )}
          </div>

          <div className="flex items-center my-[10px]">
            <label className="font-bold">Ad Show :</label>
            <label className="cl-switch">
              <input
                type="checkbox"
                checked={adStatus}
                onChange={(e) => setadStatus(e.target.checked)}
              />
              <span className="flex"></span>
            </label>
          </div>

          <div className="flex items-center">
            <label className="font-bold">Game Show :</label>
            <label className="cl-switch">
              <input
                type="checkbox"
                checked={gameStatus}
                onChange={(e) => setgameStatus(e.target.checked)}
              />
              <span className="flex"></span>
            </label>
          </div>

          <span className="bg-[#2a2a2a] mt-[10px] text-[#f5f5f5] flex justify-center">
            For SEO
          </span>

          <div className="input-field">
            <label htmlFor="pagetitle">Page Title</label>
            <input
              type="text"
              id="pagetitle"
              placeholder="page title ..."
              className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 h-[40px]"
              value={pagetitle}
              onChange={(e) => setpagetitle(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="metadescr">Meta Description</label>
            <textarea
              id="metadescr"
              rows="4"
              placeholder="game info, keywords,etc."
              className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 resize-none"
              value={metadescription}
              onChange={(e) => setmetadescription(e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-1 gap-[10px] flex flex-col">
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="game's main title ..."
              className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 h-[40px]"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="descr">Game Description</label>
            <textarea
              id="descr"
              rows="4"
              placeholder="game description ..."
              className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 resize-none"
              onChange={(e) => setdescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="input-field">
            <label htmlFor="count">Played Count</label>
            <input
              type="number"
              id="count"
              placeholder="set played count OR 0 ..."
              className="bg-gray-200 outline-none px-[10px] border-2 border-gray-500 h-[40px]"
              value={count}
              onChange={(e) => setcount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-1 py-[10px] flex flex-col items-center ">
              <span className="font-bold mb-2">Thumbnail</span>
              <div className="flex gap-[10px] h-[100px] items-center">
                <label
                  htmlFor="thumbnail"
                  className="cursor-pointer w-[100px] h-[100px] border-2 border-[#979c97] flex flex-col justify-center"
                >
                  <div className="w-fit mx-auto">
                    <ImageUpload />
                  </div>
                  <span className="text-[10px] flex text-center">
                    upload image &ldquo;png-jpg-jpeg&ldquo;
                  </span>
                </label>

                <div className="border-2 border-dashed border-[#979c97]  h-[100px] w-[100px]">
                  {thumbpreview != null ? (
                    <img
                      src={thumbpreview}
                      height={100}
                      width={100}
                      alt="uploaded"
                      className="object-contain"
                    />
                  ) : (
                    <span className="flex h-full items-center text-center text-[12px] text-[#979c97] cursor-no-drop">
                      thumbnail preview
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  id="thumbnail"
                  accept="image/png, image/jpg, image/jpeg"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-span-1 py-[10px] flex flex-col items-center ">
              <span className="font-bold mb-2">Game Folder Zip</span>
              <div className="flex gap-[10px] items-center bg-cyan-500  border-2 border-[#2a2a2a]">
                <label htmlFor="zipfile" className="cursor-pointer p-[10px]">
                  Upload Zip
                </label>
              </div>
              {gamezip && (
                <span className="text-[15px] text-green-600">
                  {gamezip.name}
                </span>
              )}

              <span className="text-red-500 text-[12px] mt-[5px]">
                *Note : Only .zip allowed <br /> & index.html must included
              </span>

              {game_folder.length > 0 && (
                <span className="text-[12px] text-purple-600 text-center">
                  {`Current Folder = [${game_folder}]`}
                </span>
              )}

              <input
                type="file"
                id="zipfile"
                accept=".zip,application/zip,application/x-zip-compressed"
                className="hidden"
                onChange={(e) => setgamezip(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="border-2 border-[#2a2a2a] w-[30%] mx-auto p-[10px] bg-yellow-500 item-hover mt-[20px]"
        onClick={handleUpdateGame}
      >
        Update
      </button>
    </div>
  );
};

export default Page;
