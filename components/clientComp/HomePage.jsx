"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/games`
      );
      setGames(res.data.data);
    };
    fetchGames();
  }, []);

  const data = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `Game ${index + 1}`,
    thumbnail:
      "http://localhost:3000/uploads/thumbnails/IMG-f66fea421d947493e9d7067a.png",
  }));

  return (
    <main className="text-white pt-[60px] flex justify-center">
      <section className="grid grid-cols-2 gap-[15px] p-[20px] sm:grid-cols-4 sm:p-[40px] md:grid-cols-5 md:p-[50px] lg:grid-cols-6 lg:p-[50px] xl:grid-cols-8 xl:p-[50px]">
        {games &&
          games.map((item, key) => {
            return (
              <div
                key={key}
                className="cursor-pointer relative group overflow-hidden rounded-[20px] border-[3px] border-transparent hover:border-smokeWhite"
              >
                <Image
                  src={item.thumbnail}
                  width={200}
                  height={200}
                  alt={`IMG-${item.title}`}
                  loading="lazy"
                  className="transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <span className="absolute font-nunito bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-lg text-center text-white py-1 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out rounded-b-[20px]">
                  {item.title}
                </span>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default HomePage;
