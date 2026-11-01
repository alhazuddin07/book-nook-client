import BorrowBooks from "@/components/borrowBook/BorrowBooks";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    const res = await fetch(`http://localhost:5000/book/${id}`);
    const books = await res.json();

    return (
        <section className="min-h-screen bg-[#f8f7ff] px-4 py-12">
            <div className="mx-auto max-w-6xl">

                {/* Back Button */}
                <Link
                    href="/all-books"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-700"
                >
                    <ArrowLeft className="size-4" />
                    Back to all books
                </Link>

                {/* Main Details Card */}
                <div className="grid overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-lg md:grid-cols-2">

                    {/* Book Image */}
                    <div className="flex items-center justify-center bg-linear-to-br from-[#ede9fe] to-[#f5f3ff] p-8 md:p-12">
                        <div className="relative flex h-100 w-full max-w-[320px] items-center justify-center rounded-2xl bg-white p-5 shadow-xl">
                            <Image
                                src={books.image}
                                width={400}
                                height={500}
                                alt={books.title}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Book Information */}
                    <BorrowBooks books={books}/>
                </div>
            </div>
        </section>
    );
};

export default DetailsPage;