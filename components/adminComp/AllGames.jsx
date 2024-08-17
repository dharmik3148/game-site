"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./adminComp.css";
import Link from "next/link";
import useLoadingStore from "@/store/loadingStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AllGames = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  const setLoading = useLoadingStore((state) => state.setLoading);

  const router = useRouter();

  const fetchGames = async (term = "") => {
    // if (!term) setLoading(true);
    try {
      const url = term
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/game/search-game`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/game`;
      const method = term ? "POST" : "GET";
      const res = await axios({
        method,
        url,
        data: term ? { searchTerm: term } : null,
        headers: { "Cache-Control": "no-store" },
      });

      if (res.data.status === false) {
        toast.error(res.data.message);
      } else {
        setGames(res.data.games || res.data);
      }
    } catch (error) {
      toast.error("An error occurred while fetching the games.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (gameId, adShow, gameShow) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/game?id=${gameId}&ad_show=${adShow}&game_show=${gameShow}`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );

      if (res.data.status === false) {
        return toast.error(res.data.error);
      }

      fetchGames(searchTerm);

      router.push("/game-admin/dashboard/games");
      router.refresh();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchGames(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex  flex-col">
      <div className="flex">
        <input
          type="text"
          className="outline-none py-[10px] px-[10px] w-[35%] mb-[10px] border-2 border-[#2a2a2a]"
          placeholder="search by anything ..."
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <Link
          href={"/game-admin/dashboard/games/add-game"}
          onClick={() => setLoading(true)}
          className="w-fit py-[10px] px-[30px] ml-auto mb-[10px] border-2 border-[#2a2a2a] bg-blue-500"
        >
          Add Game
        </Link>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="bg-[#2a2a2a] text-[#f5f5f5]">
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Played-COunt</th>
            <th>Ad Show</th>
            <th>Game Show</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="">
          {games.length > 0 ? (
            games?.map((item, key) => {
              return (
                <tr
                  key={key}
                  className="hover:bg-gray-100 odd:bg-gray-300 even:bg-gray-200"
                >
                  <td className="py-1 text-center">{item.id}</td>
                  <td className="py-1">
                    <Image
                      src={item.thumbnail}
                      height={40}
                      width={40}
                      alt={item.title}
                      className="rounded-lg mx-auto"
                    />
                  </td>
                  <td className="py-1 text-center">
                    <Link
                      href={item.game_path}
                      target="_blank"
                      className="text-blue-700 underline"
                    >
                      {item.title}
                      <i className="bi bi-link-45deg ml-1"></i>
                    </Link>
                  </td>
                  <td className="py-1 text-center">{item.played_count}</td>
                  <td className="py-1 text-center">
                    <label className="cl-switch">
                      <input
                        type="checkbox"
                        checked={item.ad_status}
                        onChange={(e) =>
                          handleToggle(item.id, e.target.checked, "")
                        }
                      />
                      <span className="flex"></span>
                    </label>
                  </td>
                  <td className="py-1 text-center">
                    <label className="cl-switch">
                      <input
                        type="checkbox"
                        checked={item.game_status}
                        onChange={(e) =>
                          handleToggle(item.id, "", e.target.checked)
                        }
                      />
                      <span className="flex"></span>
                    </label>
                  </td>
                  <td className="py-1 text-center">
                    <Link
                      href={`/game-admin/dashboard/games/${item.id}`}
                      onClick={() => setLoading(true)}
                    >
                      <i className="bi bi-pencil-square text-[25px] text-yellow-500 p-[5px] cursor-pointer"></i>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center text-[20px] text-red-500 bg-gray-300">
              <td colSpan="7">No Games Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllGames;
