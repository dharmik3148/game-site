"use client";

import useLoadingStore from "@/store/loadingStore";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [games, setGames] = useState([]);

  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/games`,
        {
          headers: { "Cache-Control": "no-store" },
        }
      );
      setGames(res.data.data);
      setLoading(false);
    };
    fetchGames();
  }, []);

  return (
    <main className="text-white pt-[60px] flex justify-center h-screen">
      <section className="grid grid-cols-2 gap-[15px] h-fit p-[20px] sm:grid-cols-4 sm:p-[40px] md:grid-cols-5 md:p-[50px] lg:grid-cols-6 lg:p-[50px] xl:grid-cols-8 xl:p-[50px]">
        {games &&
          games.map((item, key) => {
            return (
              <Link
                href={`/game/${item.id}`}
                key={key}
                onClick={() => setLoading(true)}
                className="relative group cursor-pointer rounded-[20px] border-[3px] border-transparent hover:border-smokeWhite"
              >
                <div className="relative overflow-hidden rounded-[20px]">
                  <Image
                    src={item.thumbnail}
                    width={200}
                    height={200}
                    alt={`IMG-${item.title}`}
                    loading="lazy"
                    className="transform group-hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-none"
                  />
                  <span className="absolute font-nunito bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-lg text-center text-white py-1 transform translate-y-full group-hover:translate-y-0 rounded-b-[20px]">
                    {item.title}
                  </span>
                </div>
                <Image
                  src={item.game_type.type_img}
                  width={35}
                  height={35}
                  alt={`type/${key}`}
                  loading="lazy"
                  className="absolute top-[-10px] left-[-10px]"
                />
              </Link>
            );
          })}
      </section>
    </main>
  );
};

export default HomePage;
