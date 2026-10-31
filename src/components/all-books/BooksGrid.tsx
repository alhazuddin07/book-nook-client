import { Book } from "@/types/book";
import BookCard from "./BookCard";

type BooksGridProps = {
  books: Book[];
};

const BooksGrid = ({ books }: BooksGridProps) => {
  if (books.length === 0) {
    return (
      <div className="rounded-xl border border-dashed py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No books found!
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try searching with another title or category.
        </p>
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