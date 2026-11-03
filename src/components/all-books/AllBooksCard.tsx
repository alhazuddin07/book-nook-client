"use client";

import { useMemo, useState } from "react";
import { Book } from "@/types/book";

import AllBooksHeader from "./AllBooksHeader";
import BookFilters from "./BookFilters";
import BooksGrid from "./BooksGrid";
import BooksPagination from "./BooksPagination";

type AllBooksContentProps = {
  books: Book[];
  initialCategory?: string;
};

const PAGE_SIZE = 6;

const AllBooksContent = ({
  books,
  initialCategory = "all",
}: AllBooksContentProps) => {
  const startingCategory =
    initialCategory.trim() && initialCategory.trim().toLowerCase() !== "all"
      ? initialCategory.trim()
      : "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(startingCategory);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories, keeping the one the visitor arrived with selectable
  const categories = useMemo(() => {
    const unique = new Map<string, string>();

    books.forEach((book) => {
      const value = book.category?.trim();

      if (value) {
        unique.set(value.toLowerCase(), value);
      }
    });

    if (
      startingCategory !== "all" &&
      !unique.has(startingCategory.toLowerCase())
    ) {
      unique.set(startingCategory.toLowerCase(), startingCategory);
    }

    return [...unique.values()].sort((a, b) => a.localeCompare(b));
  }, [books, startingCategory]);

  // Search and category filtering
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchMatch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "all" ||
        (book.category ?? "").toLowerCase() === category.toLowerCase();

      return searchMatch && categoryMatch;
    });
  }, [books, search, category]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen bg-[#f7f7ff] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 dark:bg-surface-muted">
      <div className="mx-auto max-w-6xl">
        <AllBooksHeader />

        <BookFilters
          search={search}
          setSearch={handleSearch}
          category={category}
          setCategory={handleCategory}
          categories={categories}
        />

        <BooksGrid books={currentBooks} />

        <BooksPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default AllBooksContent;