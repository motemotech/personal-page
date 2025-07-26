import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full max-w-4xl flex justify-between items-center py-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold">motemotech</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
} 