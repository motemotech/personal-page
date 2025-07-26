import Link from "next/link";
import fs from "fs";
import path from "path";

export default function Home() {
  const articlesDirectory = path.join(process.cwd(), "src", "articles");
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    return {
      slug,
      title: slug.replace(/-/g, " "), // Simple title from slug, can be improved with front matter
    };
  });

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold mb-8">Articles</h1>
        <ul className="list-disc list-inside">
          {articles.map((article) => (
            <li key={article.slug} className="mb-2">
              <Link href={`/articles/${article.slug}`} className="text-blue-500 hover:underline">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}