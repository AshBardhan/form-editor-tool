import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">FormKit GUI Builder</h1>
      <Link href="/builder" className="underline text-blue-500">
        Start Building
      </Link>
    </main>
  );
}
