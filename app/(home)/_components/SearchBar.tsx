"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2">
      <Input className="focus-visible:ring-transparent" />
      <Button size="icon" variant="default">
        <SearchIcon size={18} />
      </Button>
    </div>
  );
}
