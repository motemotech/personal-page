import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Header from "@/components/Header";

export default function BlogPage() {
  const articlesDirectory = path.join(process.cwd(), "articles");
  
  // Check if directory exists
  if (!fs.existsSync(articlesDirectory)) {
    return (
      <div className="font-sans grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Header />
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl w-full">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <p className="text-gray-600">No articles found.</p>
        </main>
      </div>
    );
  }
  
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug.replace(/-/g, " "),
        date: data.date || "",
        excerpt: data.excerpt || "",
      };
    });

  // Sort articles by date (newest first) if date exists
  articles.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="w-full">
          {articles.length === 0 ? (
            <p className="text-gray-600">No articles found.</p>
          ) : (
            <div className="space-y-8">
              {articles.map((article) => (
                <article key={article.slug} className="border-b border-gray-200 pb-8">
                  <h2 className="text-2xl font-semibold mb-2">
                                      <Link 
                    href={`/${article.slug}`} 
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {article.title}
                  </Link>
                  </h2>
                  {article.date && (
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(article.date).toLocaleDateString()}
                    </p>
                  )}
                  {article.excerpt && (
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  )}
                  <Link 
                    href={`/${article.slug}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 