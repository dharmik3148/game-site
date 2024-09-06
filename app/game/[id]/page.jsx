import GamePage from "@/components/clientComp/GamePage";
import axios from "axios";
import { notFound } from "next/navigation";

const fetchData = async (id) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/games?id=${id}`,
    {
      headers: { "Cache-Control": "no-store" },
    }
  );
  return res.data;
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params.id);
  return {
    title: `${data.game?.page_title || "Not Found"} 🕹 Play on Popygames`,
    description: data.game?.meta_description || "Meta Description - Popy Games",
  };
}

const Game = async ({ params }) => {
  const data = await fetchData(params.id);

  if (!data.game || Object.keys(data.game).length === 0) {
    return notFound();
  }

  return (
    <>
      <GamePage
        all_category={data.all_category}
        more_games={data.more_games}
        game_data={data.game}
      />
    </>
  );
};

export default Game;
