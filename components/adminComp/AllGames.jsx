"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./adminComp.css";
import Link from "next/link";

const AllGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/game`
      );

      setGames(res.data);
    };

    fetchGames();
  }, []);

  return (
    <div className="flex  flex-col">
      <Link
        href={"/game-admin/dashboard/games/add-game"}
        className="w-fit py-[10px] px-[30px] mb-[10px] border-2 border-[#2a2a2a] bg-blue-500"
      >
        Add Game
      </Link>
      <div className="flex gap-[10px]">
        {games &&
          games?.map((item, key) => {
            return (
              <div key={key} className="border-2 border-[#2a2a2a] p-[7px]">
                <Image
                  src={item.thumbnail}
                  height={100}
                  width={130}
                  alt={item.title}
                  className="rounded-lg"
                />
                <span className="flex item-center justify-center mt-2  border-t-2 border-[#2a2a2a]">
                  {item.title}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllGames;
