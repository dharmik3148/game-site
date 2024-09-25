"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CleanUp = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  const [categoryImg, setCategoryImg] = useState([]);
  const [gameType, setGameType] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    setLoading(false);
    handleRefresh();
  }, []);

  const handleDelete = async (e, type) => {
    e.preventDefault();

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/cleanup?type=${type}`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    if (res.data.status !== true) {
      setLoading(false);
      return toast.error(res.data.message);
    }

    toast.success(res.data.message);
    // router.push("/game-admin/dashboard/cleanup", { scroll: false });
    // router.refresh();

    if (type === "category") {
      setCategoryImg([]);
    } else if (type === "gametype") {
      setGameType([]);
    } else if (type === "thumbnails") {
      setThumbnails([]);
    } else if (type === "games") {
      setGames([]);
    }

    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);

    try {
      const responses = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/cleanup?type=category`
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/cleanup?type=gametype`
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/cleanup?type=thumbnails`
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/cleanup?type=games`
        ),
      ]);

      const results = await Promise.all(
        responses.map((res) => {
          if (!res.ok) throw new Error(`Error: ${res.statusText}`);
          return res.json();
        })
      );

      setCategoryImg(results[0].data);
      setGameType(results[1].data);
      setThumbnails(results[2].data);
      setGames(results[3].data);
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-[10px]">
      <div className="col-span-4">
        <button
          onClick={handleRefresh}
          className="bg-blue-500 py-[10px] px-[20px] border-[2px] border-[#2a2a2a] mx-auto flex"
        >
          Refresh All
        </button>
      </div>
      <div className="relative col-span-1 border-[2px] h-fit border-[#2a2a2a] p-[5px] flex flex-col">
        <span className="bg-[#2a2a2a] flex items-center justify-center p-[5px] text-smokeWhite mb-[5px]">
          Category
        </span>

        {categoryImg.length > 0 ? (
          <div>
            {categoryImg.map((item, key) => {
              return (
                <div
                  key={key}
                  className="text-[10px] p-[2px] flex gap-[5px] items-center"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/category/${item}`}
                    width={100}
                    height={100}
                    alt={`${key}/Cat-Img`}
                    className="h-[25px] w-[25px]"
                  />
                  <span className="text-red-500 font-bold">{item}</span>
                </div>
              );
            })}

            <button
              onClick={(e) => handleDelete(e, "category")}
              className="bg-green-500 w-full mt-[5px] p-[2px] border-[2px] border-[#2a2a2a] item-hover"
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
        {categoryImg.length <= 0 ? (
          <span className="flex text-[13px] font-bold items-center justify-center text-red-500 p-[5px]">
            No Duplications Found
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="col-span-1 border-[2px] h-fit border-[#2a2a2a] p-[5px] flex flex-col">
        <span className="bg-[#2a2a2a] flex items-center justify-center p-[5px] text-smokeWhite mb-[5px]">
          Game-Type
        </span>

        {gameType.length > 0 ? (
          <div>
            {gameType.map((item, key) => {
              return (
                <div
                  key={key}
                  className="text-[10px] p-[2px] flex gap-[5px] items-center"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/gametype/${item}`}
                    width={100}
                    height={100}
                    alt={`${key}/Cat-Img`}
                    className="h-[25px] w-[25px]"
                  />
                  <span className="text-red-500 font-bold">{item}</span>
                </div>
              );
            })}

            <button
              onClick={(e) => handleDelete(e, "gametype")}
              className="bg-green-500 w-full mt-[5px] p-[2px] border-[2px] border-[#2a2a2a] item-hover"
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}

        {gameType.length <= 0 ? (
          <span className="flex text-[13px] font-bold items-center justify-center text-red-500 p-[5px]">
            No Duplications Found
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="relative col-span-1 border-[2px] h-fit border-[#2a2a2a] p-[5px] flex flex-col">
        <span className="bg-[#2a2a2a] flex items-center justify-center p-[5px] text-smokeWhite mb-[5px]">
          Thumbnails
        </span>
        {thumbnails.length > 0 ? (
          <div>
            {thumbnails.map((item, key) => {
              return (
                <div
                  key={key}
                  className="text-[10px] p-[2px] flex gap-[5px] items-center"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/thumbnails/${item}`}
                    width={100}
                    height={100}
                    alt={`${key}/Thumb-Img`}
                    className="h-[25px] w-[25px]"
                  />
                  <span className="text-red-500 font-bold">{item}</span>
                </div>
              );
            })}

            <button
              onClick={(e) => handleDelete(e, "thumbnails")}
              className="bg-green-500 w-full mt-[5px] p-[2px] border-[2px] border-[#2a2a2a] item-hover"
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
        {thumbnails.length <= 0 && (
          <span className="flex text-[13px] font-bold items-center justify-center text-red-500 p-[5px]">
            No Duplications Found
          </span>
        )}
      </div>
      <div className="relative col-span-1 border-[2px] h-fit border-[#2a2a2a] p-[5px] flex flex-col">
        <span className="bg-[#2a2a2a] flex items-center justify-center p-[5px] text-smokeWhite mb-[5px]">
          Games
        </span>

        {games.length > 0 ? (
          <div>
            {games.map((item, key) => {
              return (
                <div
                  key={key}
                  className="text-[10px] p-[2px] flex gap-[5px] items-center"
                >
                  <span className="text-red-500 font-bold">{item}</span>
                </div>
              );
            })}

            <button
              onClick={(e) => handleDelete(e, "games")}
              className="bg-green-500 w-full mt-[5px] p-[2px] border-[2px] border-[#2a2a2a] item-hover"
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
        {games.length <= 0 ? (
          <span className="flex text-[13px] font-bold items-center justify-center text-red-500 p-[5px]">
            No Duplications Found
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CleanUp;
