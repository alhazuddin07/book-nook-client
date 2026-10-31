import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/book";
import { BookOpen } from "lucide-react";

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
    console.log("all books from here",book);
  return (
    <div className="group rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Book Image */}
      <div className="relative mb-4 flex h-36 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <BookOpen className="size-12 text-slate-300" />
        )}
      </div>

      {/* Book Information */}
      <div className="space-y-1">
        <h2 className="truncate text-base font-bold text-slate-900">
          {book.title}
        </h2>

        <p className="truncate text-sm text-slate-600">
          {book.author}
        </p>

        <p className="text-sm text-slate-400">
          {book.category}
        </p>
      </div>

      {/* Details Button */}
      <Link
        href={`/all-books/${book._id}`}
        className="mt-4 flex h-9 w-full items-center justify-center rounded-full bg-[#4935d4] text-sm text-white hover:bg-[#3925bd]"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;