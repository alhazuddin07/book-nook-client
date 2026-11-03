"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BookFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
};

const BookFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}: BookFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Input
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 border-slate-200 bg-white pr-10 shadow-sm dark:border-white/10 dark:bg-surface-raised dark:text-ink"
        />

        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-ink-muted" />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <label className="text-sm font-medium text-slate-600 dark:text-ink-soft">
          Category
        </label>

        <Select
          value={category}
          onValueChange={(value) => setCategory(value ?? "all")}
        >
          <SelectTrigger className="h-11 w-full border-slate-200 bg-white shadow-sm sm:w-40 dark:border-white/10 dark:bg-surface-raised dark:text-ink">
            <SelectValue placeholder="All Categories">
              {(value) => {
                const selected = typeof value === "string" ? value : "all";

                return selected === "all"
                  ? "All Categories"
                  : selected.charAt(0).toUpperCase() + selected.slice(1);
              }}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BookFilters;