
import AllBooksContent from "@/components/all-books/AllBooksCard";
import { Book } from "@/types/book";

const AllBooksPage = async () => {
  let books: Book[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-books`);

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