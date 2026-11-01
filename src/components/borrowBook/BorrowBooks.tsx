'use client';

import { BookMarked, BookOpen, Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book } from "@/types/book";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";


import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";



const BorrowBooks = ({ books }: { books: Book }) => {

    const [remainingCopies, setRemainingCopies] = useState(books.totalCopies);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
    const [checkingBorrow, setCheckingBorrow] = useState(true);

    useEffect(() => {
        if (!user?.email || !books?._id) return;

        const checkBorrowStatus = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/my-borrow?email=${encodeURIComponent(user.email)}&bookId=${books._id}`
                );

                const data = await res.json();

                setAlreadyBorrowed(data.alreadyBorrowed);
            } catch (error) {
                console.error("Borrow status check failed:", error);
            } finally {
                setCheckingBorrow(false);
            }
        };

        checkBorrowStatus();
    }, [user?.email, books?._id]);


    const handleBorrowBooks = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (remainingCopies <= 0) return;

        const data = {
            bookId: books._id,
            name: user?.name,
            email: user?.email,
            imageUrl: user?.image,
            bookinDate: new Date(),

            title: books.title,
            author: books.author,
            category: books.category,
            image: books.image,
        };

        const res = await fetch('http://localhost:5000/my-borrow', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            console.log("Borrow failed");
            return;
        };

        const borrowData = await res.json();

        const updateRes = await fetch(
            `http://localhost:5000/book/${books._id}`,
            {
                method: "PATCH",
            }
        );

        if (!updateRes.ok) {
            const errorData = await updateRes.json();
            console.log(errorData.message);
            return;
        }

        setRemainingCopies((prev) => Math.max(0, prev - 1));
    };

    return (
        <div>
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
                                {user?.name}
                            </h3>

                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-300">
                                <Mail className="size-3" />
                                <span>{user?.email}</span>
                            </div>
                        </div>

                        {/* Copies */}
                        <div>
                            <h3 className="text-3xl font-bold text-white">
                                {remainingCopies}
                            </h3>

                            <p className="mt-1 text-xs text-gray-300">
                                Available copies
                            </p>
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                    <Popover>
                        <PopoverTrigger
                            render={
                                <Button
                                    type="button"
                                    disabled={
                                        remainingCopies <= 0 ||
                                        alreadyBorrowed ||
                                        checkingBorrow
                                    }
                                    className="h-12 flex-1 rounded-xl bg-purple-700 text-base font-semibold text-white shadow-md hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                                />
                            }
                        >
                            <BookMarked className="mr-1 size-5" />

                            {checkingBorrow
                                ? "Checking..."
                                : alreadyBorrowed
                                    ? "Already Borrowed"
                                    : remainingCopies > 0
                                        ? "Borrow This Book"
                                        : "Not Available"}
                        </PopoverTrigger>

                        <PopoverContent
                            align="start"
                            className="w-85 rounded-xl border border-gray-700 bg-[#101c17] p-5 text-white shadow-xl"
                        >
                            <PopoverHeader className="mb-5">
                                <PopoverTitle className="text-lg font-semibold text-white">
                                    Borrow &quot;{books?.title}&quot;
                                </PopoverTitle>

                                <PopoverDescription className="mt-1 text-sm text-gray-400">
                                    You can keep this book for 7 days.
                                </PopoverDescription>
                            </PopoverHeader>

                            <form onSubmit={handleBorrowBooks} className="space-y-4">

                                <div className="space-y-2">
                                    <label
                                        htmlFor="userName"
                                        className="text-sm font-semibold text-gray-200"
                                    >
                                        User Name
                                    </label>

                                    <input
                                        id="userName"
                                        name="userName"
                                        readOnly
                                        placeholder={user?.name}
                                        required
                                        className="h-11 w-full rounded-lg border border-gray-600 bg-[#1c2923] px-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="userEmail"
                                        className="text-sm font-semibold text-gray-200"
                                    >
                                        User Email
                                    </label>

                                    <input
                                        id="userEmail"
                                        readOnly
                                        type="email"
                                        placeholder={user?.email}
                                        required
                                        className="h-11 w-full rounded-lg border border-gray-700 bg-[#1c2923] px-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                                    />
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button
                                        type="submit"
                                        className="h-10 rounded-lg bg-emerald-300 px-5 font-semibold text-emerald-950 hover:bg-emerald-400"
                                    >
                                        Confirm Borrow
                                    </Button>
                                </div>

                            </form>
                        </PopoverContent>
                    </Popover>

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
    );
};

export default BorrowBooks;