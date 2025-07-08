"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const Header = () => {
  return (
    <header className="flex flex-shrink-0 items-center justify-between text-white h-16 px-4 bg-[#151515] border-b border-[#2f2f2f]">
      <h1 className="flex font-semibold">Form Preview</h1>
      <div className="flex items-center space-x-4">
        <Link href="/builder" className="hover:underline">
          <Button variant="secondary" size="sm">
            Publish
          </Button>
        </Link>
      </div>
    </header>
  );
};

export { Header };
