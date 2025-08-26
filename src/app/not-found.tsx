import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl p-8 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-block mt-4 rounded-md bg-foreground px-4 py-2 text-background">Go home</Link>
    </div>
  );
}


