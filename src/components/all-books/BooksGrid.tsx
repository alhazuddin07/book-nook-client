import Link from "next/link";

import { Book } from "@/types/book";
import BookCard from "./BookCard";

type BooksGridProps = {
  books: Book[];
};

const BooksGrid = ({ books }: BooksGridProps) => {
  if (books.length === 0) {
    return (
      <div className="rounded-xl border border-dashed py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-ink">
          No books found!
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-ink-soft">
          Try searching with another title or category.
        </p>

        <Link
          href="/books"
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-purple-300 hover:text-purple-700 dark:border-white/10 dark:bg-surface-raised dark:text-ink-soft dark:hover:border-brand/40 dark:hover:text-brand"
        >
          View all books
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BooksGrid;