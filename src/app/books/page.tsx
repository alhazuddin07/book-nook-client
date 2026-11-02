
import AllBooksContent from "@/components/all-books/AllBooksCard";
import { Book } from "@/types/book";

const AllBooksPage = async () => {
  let books: Book[] = [];

  try {
    const res = await fetch("http://localhost:5000/all-books", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    books = await res.json();
  } catch (error) {
    console.error("All books fetch error:", error);
  }

  return <AllBooksContent books={books} />;
};

export default AllBooksPage;