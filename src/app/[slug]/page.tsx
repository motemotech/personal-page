import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import Header from "../../components/Header";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "articles", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl w-full">
        <article className="w-full">
          <h1 className="text-4xl font-bold mb-8">{data.title || slug.replace(/-/g, " ")}</h1>
          {data.date && (
            <p className="text-sm text-gray-500 mb-6">
              {new Date(data.date).toLocaleDateString()}
            </p>
          )}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
        </article>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), "articles");
  const filenames = fs.readdirSync(articlesDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}
