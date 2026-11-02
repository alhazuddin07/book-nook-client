import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LibraryBig } from "lucide-react";

import { Book } from "@/types/book";

type NewArrivalsProps = {
    books: Book[];
};

const NewArrivals = ({ books }: NewArrivalsProps) => {
    if (books.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <LibraryBig className="size-6 text-[#4935d4] dark:text-brand" />

                    <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-ink">
                        New Arrivals
                    </h2>
                </div>

                <Link
                    href="/books"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#4f46e5] transition hover:text-[#3925bd] hover:underline dark:text-brand dark:hover:text-brand-ink"
                >
                    See All Books
                    <ArrowRight className="size-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                {books.map((book) => (
                    <article
                        key={book._id}
                        className="group flex flex-col rounded-xl border border-slate-200 bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-surface dark:shadow-none dark:hover:border-brand/40"
                    >
                        <div className="relative mb-2.5 flex h-28 items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-surface-raised">
                            {book.image ? (
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <LibraryBig className="size-9 text-slate-300 dark:text-ink-muted" />
                            )}
                        </div>

                        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-ink">
                            {book.title}
                        </h3>

                        <p className="truncate text-xs text-slate-500 dark:text-ink-soft">
                            {book.author}
                        </p>

                        <p className="truncate text-xs capitalize text-slate-400 dark:text-ink-muted">
                            {book.category}
                        </p>

                        <Link
                            href={`/books/${book._id}`}
                            className="mt-3 flex h-8 items-center justify-center rounded-md bg-[#4f46e5] text-xs font-semibold text-white transition hover:bg-[#4338ca] dark:bg-brand dark:hover:bg-brand-strong"
                        >
                            View Details
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
