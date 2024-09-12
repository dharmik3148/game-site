export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const staticPage = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "yealry",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const response = await fetch(`${baseUrl}/api/client/sitemap`);
  const { category_pages, game_pages } = await response.json();

  const categoryPages = category_pages.map((category) => ({
    url: `${baseUrl}/category/${category.id}`,
    lastModified: new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.6,
  }));

  const gamePages = game_pages.map((game) => ({
    url: `${baseUrl}/game/${game.id}`,
    lastModified: new Date(game.updatedAt).toISOString(),
    changefreq: "daily",
    priority: 0.7,
  }));

  return [...staticPage, ...categoryPages, ...gamePages];
}
