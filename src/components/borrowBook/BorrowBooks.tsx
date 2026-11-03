'use client';

import { BookMarked, BookOpen, Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book } from "@/types/book";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/toast";


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

            const { data, error } = await authClient.token();
            const token = data?.token;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-borrow?email=${(user.email)}&bookId=${books._id}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
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


    const handleAlreadyBorrowedClick = () => {
        toast.add({
            type: "warning",
            title: "Already Borrowed",
            description:
                "You already borrowed this book. Return it from My Borrows before borrowing it again.",
        });
    };

    const handleBorrowBooks = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (alreadyBorrowed) {
            handleAlreadyBorrowedClick();
            return;
        }

        if (remainingCopies <= 0) {
            toast.add({
                type: "error",
                title: "Not Available",
                description: "There are no copies of this book left to borrow.",
            });
            return;
        }

        const userData = {
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

        const { data, error } = await authClient.token();
        const token = data?.token;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-borrow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData)
            });

            const result = await res.json();

            if (res.status === 409) {
                setAlreadyBorrowed(true);
                handleAlreadyBorrowedClick();
                return;
            }

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Could Not Borrow",
                    description:
                        result.message || "Something went wrong. Please try again.",
                });
                return;
            }

            const copiesLeft = result.remainingCopies ?? Math.max(0, remainingCopies - 1);

            setRemainingCopies(copiesLeft);
            setAlreadyBorrowed(true);

            toast.add({
                type: "success",
                title: "Book Borrowed",
                description: `"${books.title}" is yours for 7 days. ${copiesLeft} ${copiesLeft === 1 ? "copy" : "copies"} left.`,
            });
        } catch (error) {
            console.error("Borrow failed:", error);

            toast.add({
                type: "error",
                title: "Could Not Borrow",
                description: "Please check the server and try again.",
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center p-5 sm:p-6 md:p-10">

                {/* Category */}
                <div className="mb-5">
                    <Badge className="rounded-full border-0 bg-purple-100 px-4 py-1.5 text-sm font-semibold capitalize text-purple-700 hover:bg-purple-100 dark:bg-brand-soft dark:text-brand-ink dark:hover:bg-brand-soft">
                        {books.category}
                    </Badge>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-extrabold leading-tight wrap-break-word text-[#160d32] sm:text-3xl md:text-5xl dark:text-ink">
                    {books.title}
                </h1>

                {/* Author */}
                <div className="mt-4 flex items-center gap-2 text-gray-500 dark:text-ink-soft">
                    <User className="size-4" />
                    <p className="text-base font-medium">
                        By {books.author}
                    </p>
                </div>

                {/* Description */}
                <div className="my-7">
                    <h3 className="mb-2 text-lg font-bold text-[#160d32] dark:text-ink">
                        About This Book
                    </h3>

                    <p className="text-base leading-7 text-gray-600 dark:text-ink-soft">
                        {books.description}
                    </p>
                </div>

                {/* Book Information Box */}
                <div className="rounded-2xl bg-[#160d32] p-5 sm:p-6 dark:border dark:border-white/10 dark:bg-[#1a1329]">
                    <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:gap-5">

                        {/* Added By */}
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-purple-300">
                                <User className="size-4" />
                                <span className="text-sm">Added By</span>
                            </div>

                            <h3 className="font-semibold text-white">
                                {books.addedBy?.name || "BookNook Libarary"}
                            </h3>

                            <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-gray-300">
                                <Mail className="size-3 shrink-0" />
                                <span className="truncate">{books.addedBy?.email || "Library Collection"}</span>
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
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">

                    {alreadyBorrowed ? (
                        <Button
                            type="button"
                            onClick={handleAlreadyBorrowedClick}
                            className="h-12 flex-1 rounded-xl bg-purple-700 text-base font-semibold text-white shadow-md hover:bg-purple-800"
                        >
                            <BookMarked className="mr-1 size-5" />
                            Already Borrowed
                        </Button>
                    ) : (
                        <Popover>
                            <PopoverTrigger
                                render={
                                    <Button
                                        type="button"
                                        disabled={
                                            remainingCopies <= 0 ||
                                            checkingBorrow
                                        }
                                        className="h-12 flex-1 rounded-xl bg-purple-700 text-base font-semibold text-white shadow-md hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                                    />
                                }
                            >
                                <BookMarked className="mr-1 size-5" />

                                {checkingBorrow
                                    ? "Checking..."
                                    : remainingCopies > 0
                                        ? "Borrow This Book"
                                        : "Not Available"}
                            </PopoverTrigger>

                            <PopoverContent
                                align="start"
                                className="w-[calc(100vw-2rem)] max-w-85 rounded-xl border border-purple-100 bg-white p-4 text-slate-900 shadow-xl sm:p-5 dark:border-white/10 dark:bg-surface dark:text-ink dark:shadow-black/40"
                            >
                                <PopoverHeader className="mb-5">
                                    <PopoverTitle className="text-lg font-semibold text-[#160d32] dark:text-ink">
                                        Borrow &quot;{books?.title}&quot;
                                    </PopoverTitle>

                                    <PopoverDescription className="mt-1 text-sm text-slate-500 dark:text-ink-soft">
                                        You can keep this book for 7 days.
                                    </PopoverDescription>
                                </PopoverHeader>

                                <form onSubmit={handleBorrowBooks} className="space-y-4">

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="userName"
                                            className="text-sm font-semibold text-slate-700 dark:text-ink-soft"
                                        >
                                            User Name
                                        </label>

                                        <input
                                            id="userName"
                                            name="userName"
                                            readOnly
                                            placeholder={user?.name}
                                            required
                                            className="h-11 w-full rounded-lg border border-purple-100 bg-[#fafaff] px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus:border-brand"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="userEmail"
                                            className="text-sm font-semibold text-slate-700 dark:text-ink-soft"
                                        >
                                            User Email
                                        </label>

                                        <input
                                            id="userEmail"
                                            readOnly
                                            type="email"
                                            placeholder={user?.email}
                                            required
                                            className="h-11 w-full rounded-lg border border-purple-100 bg-[#fafaff] px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus:border-brand"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button
                                            type="submit"
                                            className="h-10 w-full rounded-lg bg-purple-700 px-5 font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800 sm:w-auto"
                                        >
                                            Confirm Borrow
                                        </Button>
                                    </div>

                                </form>
                            </PopoverContent>
                        </Popover>
                    )}

                    <Link
                        href="/books"
                        className="inline-flex h-12 items-center justify-center rounded-xl border border-purple-200 px-6 text-purple-700 hover:bg-purple-50 dark:border-white/15 dark:text-brand-ink dark:hover:bg-brand-soft"
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