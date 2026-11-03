import { BookOpen } from "lucide-react";

const AllBooksHeader = () => {
  return (
    <div className="mb-8 text-center">
      <div className="mb-2 flex items-center justify-center gap-2">
        <BookOpen className="size-7 text-[#4935d4] dark:text-brand" />

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-ink">
          All Books
        </h1>
      </div>

      <p className="text-sm text-slate-500 dark:text-ink-soft">
        Explore our complete collection of books
      </p>
    </div>
  );
};

export default AllBooksHeader;