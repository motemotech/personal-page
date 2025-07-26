import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8">Welcome to motemotech</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to my personal website. Here you can find my thoughts, articles, and projects.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/blog" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Read My Blog
          </Link>
        </div>
      </main>
    </div>
  );
}