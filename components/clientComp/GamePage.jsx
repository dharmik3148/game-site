"use client";

import useLoadingStore from "@/store/loadingStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LikeIMG from "@/public/likes.png";
import { SVGPopyLogo } from "./AllSvg";
import Link from "next/link";
import SideGames from "./SideGames";
import AdComponent from "./AdComponent";

const GamePage = ({ all_category, more_games, game_data }) => {
  const [allCategory, setallCategory] = useState(all_category);
  const [moreGames, setmoreGames] = useState(more_games);
  const [gameData, setgameData] = useState(game_data);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const pathname = usePathname();

  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
    console.clear();
  }, []);

  const handleClick = (href) => {
    if (pathname !== href) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <main className="pt-[60px] pb-[160px] max-sm:mb-[-25px] lg:mb-[-80px] md:mb-[-60px] sm:mb-[-50px] font-nunito bg-[#0C0D14] backdrop-blur-lg">
      <div className="p-[10px] px-[10px] lg:px-[8%] md:px-[10px] flex max-sm:flex-col lg:flex-row md:flex-col sm:flex-col gap-[10px]">
        <section className="flex flex-col w-fit lg:w-fit md:w-fit max-sm:w-full">
          <div className="relative h-[564px] w-full md:w-full sm:w-full lg:h-[564px] lg:w-[1000px]">
            <iframe
              className="border-none h-full w-full"
              src={gameData.game_path}
              frameBorder="0"
            />
            {isModalOpen && (
              <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center bg-siteBlue bg-opacity-40 backdrop-blur-lg">
                <span className="flex items-center gap-[10px] text-smokeWhite">
                  <SVGPopyLogo className="flex h-[40px]" /> - by popygames
                </span>

                <Image
                  src={gameData.thumbnail}
                  height={100}
                  width={100}
                  alt={`banner/${gameData.title}`}
                  className="mt-[30px] h-[140px] w-[140px] pointer-events-none"
                />

                <span className="font-[700] text-[30px] text-smokeWhite">
                  {gameData.title}
                </span>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-siteYellow play-btn rounded-full flex items-center justify-center p-[10px] px-[20px] font-[800] gap-[10px] text-[20px] mt-[50px]"
                >
                  Play Game
                  <i className="bi bi-play-circle flex text-[25px]"></i>
                </button>
              </div>
            )}
          </div>
          <div className="bg-siteBlue text-smokeWhite p-[8px] flex justify-between items-center">
            <div className="flex items-center gap-[10px]">
              <Image
                src={gameData.thumbnail}
                height={100}
                width={100}
                alt={`thumb/${gameData.title}`}
                className="h-[50px] w-[50px] pointer-events-none"
              />
              <h1 className="font-[800] text-[20px]">{gameData.title}</h1>
            </div>
            <span className="font-[700] text-green-400 flex items-center gap-[10px]">
              <Image
                src={LikeIMG}
                height={100}
                width={100}
                alt={`likes/IMG`}
                className="h-[40px] w-[40px] pointer-events-none"
              />
              {(gameData.played_count / 1000).toFixed(2) + "k"}
            </span>
          </div>

          <div className="mt-[10px]">
            {gameData.ad_status === true ? (
              <div className="border-[1px] border-transparent relative h-[100px] mx-auto">
                <AdComponent adData={gameData.ad} />
                <span className="absolute bottom-[-18px] text-gray-500 left-[0px] text-[11px] font-[600]">
                  ADVERTISEMENT
                </span>
              </div>
            ) : (
              <div className="border-[1px] border-deviderGray border-dashed relative h-[100px] mx-auto">
                <span className="absolute bottom-[-18px] text-gray-500 left-[0px] text-[11px] font-[600]">
                  ADVERTISEMENT
                </span>
              </div>
            )}
          </div>

          <div className="mt-[20px] flex lg:flex md:flex sm:flex max-sm:flex-col gap-[10px]">
            <div className="text-smokeWhite rounded-lg w-full p-[10px] flex flex-col gap-[10px] text-[15px]">
              <p className="text-[35px] font-[900]">{gameData.title}</p>
              <p>
                <span className="text-gray-500">Played By: </span>
                {gameData.played_count} players
              </p>
              <p>
                <span className="text-gray-500">Released:</span>
                {` ${new Intl.DateTimeFormat("en-US", {
                  month: "long",
                }).format(new Date(gameData.createdAt))} ${new Date(
                  gameData.createdAt
                ).getFullYear()}`}
              </p>
              <p>
                <span className="text-gray-500">Category: </span>
                {gameData.category.category_name}
              </p>
              <p>
                <span className="text-gray-500">Type: </span>
                {gameData.game_type.name}
              </p>
              <p>
                <span className="text-gray-500">Platforms: </span> Browser (pc,
                mobile, tablet), App Store( Android, iOS)
              </p>

              <hr className="border-1 border-deviderGray my-[10px]" />

              <p className="whitespace-pre-line">{gameData.description}</p>

              <hr className="border-1 border-deviderGray my-[10px]" />

              <section className="grid grid-cols-2 gap-[8px] p-[0px] sm:grid-cols-2 sm:p-[5px] md:grid-cols-3 md:p-[8px] lg:grid-cols-4 lg:p-[8px]">
                {allCategory.length > 0 ? (
                  allCategory.slice(0, 8).map((item, key) => {
                    return (
                      <Link
                        key={key}
                        href={`/category/${item.id}`}
                        onClick={() => handleClick(`/category/${item.id}`)}
                        className="relative bg-smokeWhite overflow-hidden group flex gap-[15px] items-center p-[10px] cursor-pointer rounded-lg border-[2px] border-siteDarkBlue hover:bg-siteYellow hover:bg-opacity-85 transition-colors duration-300 ease-in-out"
                      >
                        <div className="transition-transform duration-300 ease-in-out group-hover:rotate-[-22.5deg]">
                          <Image
                            src={item.category_img}
                            height={100}
                            width={100}
                            alt={`CAT-IMG/${item.id}`}
                            loading="lazy"
                            className="h-[40px] w-[40px] pointer-events-none"
                          />
                        </div>
                        <h3 className="text-siteDarkBlue mx-auto group-hover:text-siteDarkBlue drop-shadow font-[800]">
                          {item.category_name}
                        </h3>
                      </Link>
                    );
                  })
                ) : (
                  <span className="">-- No Categories --</span>
                )}
              </section>

              <section className="grid grid-cols-2 gap-[15px] h-fit p-[5px] mt-[10px] sm:grid-cols-3 sm:p-[10px] md:grid-cols-4 md:p-[10px] lg:grid-cols-4 lg:p-[10px]">
                {moreGames &&
                  moreGames.slice(0, 12).map((item, key) => {
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
            </div>

            {gameData.ad_status === true ? (
              <div className="relative border-[1px] border-transparent w-[500px] max-sm:h-[300px] max-sm:w-full">
                <AdComponent adData={gameData.ad} />
                <span className="absolute text-gray-500 top-[-15px] left-[0px] text-[11px] font-[600]">
                  ADVERTISEMENT
                </span>
              </div>
            ) : (
              <div className="relative border-[1px] border-deviderGray border-dashed w-[500px] max-sm:h-[300px] max-sm:w-full">
                <span className="absolute text-gray-500 top-[-15px] left-[0px] text-[11px] font-[600]">
                  ADVERTISEMENT
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="w-fit h-fit grid grid-cols-2 lg:grid-cols-2 md:grid-cols-6 sm:grid-cols-5 p-[5px] gap-[10px]">
          <SideGames
            adStatus={gameData.ad_status}
            adPosition={4}
            gameLimit={12}
            games={moreGames}
            adData={gameData.ad}
          />
        </section>
      </div>
    </main>
  );
};

export default GamePage;
