import axios from "axios";
import dynamic from "next/dynamic";

const AddgameForm = dynamic(() => import("./AddgameForm"), { ssr: false });

export const metadata = {
  title: "Admin - Add game",
  description: "Manage Add Game",
};

const Page = async () => {
  let dropData = {};

  try {
    const res = await axios.get(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/game/add-page-data`,
      { headers: { "Cache-Control": "no-store" } }
    );
    dropData = res.data;
  } catch (error) {
    console.error("Error fetching add game page data:", error);
    // Optionally, you can set dropData to a fallback value or display an error message
  }

  return (
    <>
      <AddgameForm dropData={dropData} />
    </>
  );
};

export default Page;
