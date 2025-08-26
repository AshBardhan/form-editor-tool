import FormList from "@/components/FormList";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">FormKit GUI Builder</h1>
        <Button asChild>
          <Link href="/builder">Create Form</Link>
        </Button>
      </div>
      <FormList />
    </main>
  );
}
