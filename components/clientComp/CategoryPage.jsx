"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SVGPopyLogo } from "./AllSvg";

const CategoryPage = ({
  all_category,
  category_games,
  categoryName,
  more_games,
}) => {
  const [allCategory, setallCategory] = useState(all_category);
  const [categoryGames, setCategoryGames] = useState(category_games);
  const [category, setcategory] = useState(categoryName);
  const [moreGames, setmoreGames] = useState(more_games);

  return (
    <main className="pt-[60px] font-nunito ">
      <div className="lg:text-[40px] md:text-[40px] sm:text-[30px] text-[25px] font-[800] text-siteDarkBlue">
        <section className="flex items-center justify-center gap-[10px] p-[15px]">
          {Object.keys(category).length !== 0 ? (
            <>
              <Image
                src={category.category_img}
                height={100}
                width={100}
                alt={`catImg1/${category.category_name}`}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] md:w-[40px] md:h-[40px] pointer-events-none"
              />
              <h1 className="drop-shadow text-center">
                {category.category_name} Games
              </h1>
              <Image
                src={category.category_img}
                height={100}
                width={100}
                alt={`catImg2/${category.category_name}`}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] md:w-[40px] md:h-[40px] pointer-events-none"
              />
            </>
          ) : (
            <h1 className="drop-shadow text-center">No Category Found</h1>
          )}
        </section>
      </div>
      <div className="flex flex-col justify-center">
        <section className="grid grid-cols-2 gap-[15px] p-[15px] sm:grid-cols-4 sm:p-[20px] md:grid-cols-5 md:p-[20px] lg:grid-cols-6 lg:p-[20px] xl:grid-cols-8 xl:p-[20px]">
          {categoryGames.length > 0 ? (
            categoryGames.map((item, key) => {
              return (
                <div
                  key={key}
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
                    <span className="absolute font-nunito bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-60 backdrop-blur-lg text-center text-white py-1 transform translate-y-full group-hover:translate-y-0 rounded-b-[20px]">
                      {item.title}
                    </span>
                  </div>
                  <Image
                    src={item.game_type.type_img}
                    width={35}
                    height={35}
                    alt={`type/${key}`}
                    loading="lazy"
                    className="absolute top-[-10px] left-[-10px] pointer-events-none"
                  />
                </div>
              );
            })
          ) : (
            <span className="flex items-center justify-center text-[20px] font-[700] text-red-500 col-span-2 sm:col-span-4 md:col-span-5 lg:col-span-6 xl:col-span-8">
              -- No Games --
            </span>
          )}
        </section>
      </div>
      <div className=" p-[5px]">
        <span
          className="p-[5px] text-[15px] font-[600] text-siteYellow"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
        >
          All Categories -
        </span>
        <section className="grid grid-cols-2 gap-[8px] p-[5px] sm:grid-cols-4 sm:p-[5px] md:grid-cols-5 md:p-[8px] lg:grid-cols-6 lg:p-[8px] xl:grid-cols-8 xl:p-[10px]">
          {allCategory.length > 0 ? (
            allCategory.map((item, key) => {
              return (
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/category/${
                    item.id
                  }?name=${item.category_name.toLowerCase()}`}
                  className="relative bg-smokeWhite overflow-hidden group bg-opacity-75 backdrop-blur flex gap-[15px] items-center hover:drop-shadow-xl p-[10px] cursor-pointer rounded-lg border-[2px] border-siteDarkBlue hover:bg-siteYellow hover:bg-opacity-85 transition-colors duration-300 ease-in-out"
                  key={key}
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
      </div>

      <hr className="mx-[15px] border-deviderGray my-[10px]" />

      <div className="flex flex-col justify-center">
        <span
          className="mx-[10px] text-[15px] font-[600] text-siteYellow"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
        >
          All Games -
        </span>
        <section className="grid grid-cols-2 gap-[15px] p-[15px] sm:grid-cols-4 sm:p-[20px] md:grid-cols-5 md:p-[20px] lg:grid-cols-6 lg:p-[20px] xl:grid-cols-8 xl:p-[20px]">
          {moreGames.length > 0 ? (
            moreGames.map((item, key) => {
              return (
                <div
                  key={key}
                  className="relative group cursor-pointer rounded-[20px] border-[3px] border-transparent hover:border-smokeWhite"
                >
                  <div className="relative overflow-hidden rounded-[20px]">
                    <Image
                      src={item.thumbnail}
                      width={200}
                      height={200}
                      alt={`IMG-${item.title}`}
                      loading="lazy"
                      className="transform object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-none"
                    />
                    <span className="absolute font-nunito bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-60 backdrop-blur-lg text-center text-white py-1 transform translate-y-full group-hover:translate-y-0 rounded-b-[20px]">
                      {item.title}
                    </span>
                  </div>
                  <Image
                    src={item.game_type.type_img}
                    width={35}
                    height={35}
                    alt={`type/${key}`}
                    loading="lazy"
                    className="absolute top-[-10px] left-[-10px] pointer-events-none"
                  />
                </div>
              );
            })
          ) : (
            <span className="flex items-center justify-center text-[20px] font-[700] text-red-500 col-span-2 sm:col-span-4 md:col-span-5 lg:col-span-6 xl:col-span-8">
              -- No Games --
            </span>
          )}
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
