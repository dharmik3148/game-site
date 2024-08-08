import axios from "axios";
import AddgameForm from "./AddgameForm";

export const metadata = {
  title: "Admin - Add game",
  description: "Manage Add Game",
};

const AddGame = async () => {
  const res = await axios.get(
    `${process.env.NEXT_APP_BASE_URL}/api/admin/game/add-page-data`,
    { headers: { "Cache-Control": "no-store" } }
  );

  return (
    <>
      <AddgameForm dropData={res.data} />
    </>
  );
};

export default AddGame;
