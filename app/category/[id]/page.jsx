import CategoryPage from "@/components/clientComp/CategoryPage";
import axios from "axios";

const fetchData = async (id) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/category?id=${id}`,
    {
      headers: { "Cache-Control": "no-store" },
    }
  );
  return res.data;
};

export async function generateMetadata({ params }) {
  const data = await fetchData(params.id);
  const categoryName = data.category?.category_name || "Loading...";

  return {
    title: `${categoryName} Games - Category Popygames`,
    description: "This is category page",
  };
}

const Category = async ({ params }) => {
  const data = await fetchData(params.id);

  return (
    <>
      <CategoryPage
        all_category={data.all_category}
        category_games={data.category_games}
        categoryName={data.category}
        more_games={data.more_games}
      />
    </>
  );
};

export default Category;
