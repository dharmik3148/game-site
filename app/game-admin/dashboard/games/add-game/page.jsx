import AddgameForm from "./AddgameForm";

export const metadata = {
  title: "Admin - Add game",
  description: "Manage Add Game",
};

const Page = async () => {
  let dropData = {};

  try {
    const res = await fetch(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/game/add-page-data`,
      {
        method: "get",
        cache: "no-store",
      }
    );

    dropData = await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      <AddgameForm dropData={dropData} />
    </>
  );
};

export default Page;
