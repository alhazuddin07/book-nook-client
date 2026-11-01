import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { Book } from "@/types/book";

const MyBookCard = ({ book }: { book: Book }) => {
    return (
        <div className="group rounded-xl border border-purple-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-purple-50">
                {book.image ? (
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <BookOpen className="size-12 text-purple-200" />
                )}

                <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-purple-700 shadow-sm">
                    {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"}
                </span>
            </div>

            <div className="space-y-1">
                <h2 className="truncate text-base font-bold text-slate-900">
                    {book.title}
                </h2>

                <p className="truncate text-sm text-slate-600">
                    {book.author}
                </p>

                <p className="text-sm capitalize text-slate-400">
                    {book.category}
                </p>
            </div>

            <Link
                href={`/all-books/${book._id}`}
                className="mt-4 flex h-9 w-full items-center justify-center rounded-full bg-[#4935d4] text-sm text-white transition hover:bg-[#3925bd]"
            >
                View Details
            </Link>
        </div>
    );
};

export default MyBookCard;
