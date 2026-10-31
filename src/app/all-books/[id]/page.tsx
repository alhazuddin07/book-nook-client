import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookMarked, BookOpen, Copy, Mail, User } from "lucide-react";
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
                    <div className="flex flex-col justify-center p-6 md:p-10">

                        {/* Category */}
                        <div className="mb-5">
                            <Badge className="rounded-full border-0 bg-purple-100 px-4 py-1.5 text-sm font-semibold capitalize text-purple-700 hover:bg-purple-100">
                                {books.category}
                            </Badge>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-extrabold leading-tight text-[#160d32] md:text-5xl">
                            {books.title}
                        </h1>

                        {/* Author */}
                        <div className="mt-4 flex items-center gap-2 text-gray-500">
                            <User className="size-4" />
                            <p className="text-base font-medium">
                                By {books.author}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="my-7">
                            <h3 className="mb-2 text-lg font-bold text-[#160d32]">
                                About This Book
                            </h3>

                            <p className="text-base leading-7 text-gray-600">
                                {books.description}
                            </p>
                        </div>

                        {/* Book Information Box */}
                        <div className="rounded-2xl bg-[#160d32] p-6">
                            <div className="grid grid-cols-2 gap-5">

                                {/* Added By */}
                                <div>
                                    <div className="mb-3 flex items-center gap-2 text-purple-300">
                                        <User className="size-4" />
                                        <span className="text-sm">Added By</span>
                                    </div>

                                    <h3 className="font-semibold text-white">
                                        Alhaz Uddin
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-300">
                                        <Mail className="size-3" />
                                        <span>admin@example.com</span>
                                    </div>
                                </div>

                                {/* Copies */}
                                <div>
                                    <div className="mb-3 flex items-center gap-2 text-purple-300">
                                        <Copy className="size-4" />
                                        <span className="text-sm">Copies Left</span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white">
                                        {books.totalCopies}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-300">
                                        Available copies
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Button
                                className="h-12 flex-1 rounded-xl bg-purple-700 text-base font-semibold text-white shadow-md hover:bg-purple-800"
                                disabled={books.totalCopies < 1}
                            >
                                <BookMarked className="mr-2 size-5" />
                                {books.totalCopies > 0 ? "Borrow This Book" : "Out of Stock"}
                            </Button>

                            <Link
                                href="/all-books"
                                className="inline-flex h-12 items-center justify-center rounded-xl border border-purple-200 px-6 text-purple-700 hover:bg-purple-50"
                            >
                                <BookOpen className="mr-2 size-4" />
                                All Books
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsPage;