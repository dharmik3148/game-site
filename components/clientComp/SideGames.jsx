"use client";

import useLoadingStore from "@/store/loadingStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideGames = ({ adPosition, gameLimit, games }) => {
  const pathname = usePathname();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const gamesToSHow = games.slice(0, gameLimit);
  const renderedItems = [];

  const handleClick = (href) => {
    if (pathname !== href) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  const AdComponent = () => (
    <div className="relative bg-red-300 group col-span-2 lg:col-span-2 md:col-span-6 sm:col-span-5 h-[300px] sm:h-[300px] md:h-[350px] lg:h-[600px] w-full flex mx-auto items-center justify-center">
      <span className="absolute top-[100px] left-[-15px] text-gray-500 text-[11px] font-[600] transform -rotate-90 origin-top-left">
        ADVERTISEMENT
      </span>
    </div>
  );

  for (let i = 0; i < gamesToSHow.length; i++) {
    if (i === adPosition) {
      renderedItems.push(<AdComponent key="ad" />);
    }

    const item = gamesToSHow[i];

    renderedItems.push(
      <Link
        href={`/game/${item.id}`}
        key={item.id}
        onClick={() => handleClick(`/game/${item.id}`)}
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
          width={30}
          height={30}
          alt={`type/${i}`}
          loading="lazy"
          className="absolute top-[-5px] left-[-8px]"
        />
      </Link>
    );
  }

  if (gamesToSHow.length <= adPosition) {
    renderedItems.push(<AdComponent key="ad-end" />);
  }

  return <>{renderedItems}</>;
};

export default SideGames;
