import HeroBanner from "@/components/home/HeroBanner";
import HomeInfoCards from "@/components/home/HomeInfoCards";
import NewArrivals from "@/components/home/NewArrivals";
import { Book } from "@/types/book";

export default async function Home() {
  let books: Book[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-books`);

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    const data: Book[] = await res.json();

    books = Array.isArray(data)
      ? // Newest ObjectIds first, so a freshly added book leads the list.
        data
          .slice()
          .sort((a, b) => b._id.localeCompare(a._id))
          .slice(0, 6)
      : [];
  } catch (error) {
    console.error("New arrivals fetch error:", error);
  }

  return (
    <div>
      <HeroBanner />
      <NewArrivals books={books} />
      <HomeInfoCards />
    </div>
  );
}
