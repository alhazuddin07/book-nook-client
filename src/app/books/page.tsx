import AllBooksContent from "@/components/all-books/AllBooksCard";
import { Book } from "@/types/book";

const AllBooksPage = async ({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) => {
  const { category } = await searchParams;

  const initialCategory =
    typeof category === "string" && category
      ? category
      : "all";

  let books: Book[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/all-books`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    const data: Book[] = await res.json();

    books = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("All books fetch error:", error);
  }

  // Filter books by category
  const filteredBooks =
    initialCategory.toLowerCase() === "all"
      ? books
      : books.filter(
        (book) =>
          book.category?.trim().toLowerCase() ===
          initialCategory.trim().toLowerCase()
      );

  return (
    <AllBooksContent
      key={initialCategory}
      books={filteredBooks}
      initialCategory={initialCategory}
    />
  );
};

export default AllBooksPage;