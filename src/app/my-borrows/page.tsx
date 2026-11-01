"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Borrow } from "@/types/book";

const API_URL = "http://localhost:5000";

const formatDate = (value: string | Date) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const getReturnDate = (value: string | Date) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    date.setDate(date.getDate() + 7);

    return formatDate(date);
};

const MyBorrowsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const email = session?.user?.email;

    const [borrows, setBorrows] = useState<Borrow[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [cancelingId, setCancelingId] = useState<string | null>(null);

    useEffect(() => {
        if (!email) return;

        let cancelled = false;

        const loadBorrows = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/my-borrows?email=${encodeURIComponent(email)}`
                );
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Could not load your borrowed books.");
                }

                if (!cancelled) {
                    setBorrows(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("My borrows fetch error:", error);

                if (!cancelled) {
                    toast.add({
                        type: "error",
                        title: "Could Not Load Borrows",
                        description: "Please check the server and try again.",
                    });
                }
            } finally {
                if (!cancelled) {
                    setLoaded(true);
                }
            }
        };

        loadBorrows();

        return () => {
            cancelled = true;
        };
    }, [email]);

    const handleReturn = async (borrow: Borrow) => {
        setCancelingId(borrow._id);

        try {
            const res = await fetch(`${API_URL}/my-borrows/${borrow._id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Could Not Return Book",
                    description: data.message || "Something went wrong. Please try again.",
                });
                return;
            }

            setBorrows((current) =>
                current.filter((item) => item._id !== borrow._id)
            );

            toast.add({
                type: "success",
                title: "Book Returned",
                description: `"${borrow.title}" is available again.`,
            });
        } catch (error) {
            console.error("Return book error:", error);

            toast.add({
                type: "error",
                title: "Could Not Return Book",
                description: "Please check the server and try again.",
            });
        } finally {
            setCancelingId(null);
        }
    };

    const loading = isPending || (!!email && !loaded);

    return (
        <section className="min-h-screen bg-[#f7f7ff] px-4 py-10 sm:px-6 dark:bg-surface-muted">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 text-center">
                    <div className="mb-2 flex items-center justify-center gap-2">
                        <BookOpen className="size-7 text-[#4935d4] dark:text-brand" />

                        <h1 className="text-3xl font-bold text-slate-900 dark:text-ink">
                            My Borrows
                        </h1>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-ink-soft">
                        Books you are reading right now.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-purple-100 bg-white shadow-sm dark:border-white/10 dark:bg-surface dark:shadow-none">
                    {loading ? (
                        <p className="px-6 py-16 text-center text-sm text-slate-500 dark:text-ink-soft">
                            Loading your borrowed books...
                        </p>
                    ) : !email ? (
                        <div className="px-6 py-16 text-center">
                            <p className="text-sm text-slate-500 dark:text-ink-soft">
                                Please log in to see your borrowed books.
                            </p>

                            <Link
                                href="/login"
                                className="mt-4 inline-flex rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800"
                            >
                                Go to Login
                            </Link>
                        </div>
                    ) : borrows.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <p className="text-sm text-slate-500 dark:text-ink-soft">
                                You have not borrowed any books yet.
                            </p>

                            <Link
                                href="/all-books"
                                className="mt-4 inline-flex rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800"
                            >
                                Browse Books
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="bg-purple-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-purple-900 dark:bg-brand-soft dark:text-brand-ink">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Image</th>
                                    <th className="px-5 py-4 font-semibold">Title</th>
                                    <th className="px-5 py-4 font-semibold">Borrow Date</th>
                                    <th className="px-5 py-4 font-semibold">Return Date</th>
                                    <th className="px-5 py-4 text-right font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {borrows.map((borrow) => (
                                    <tr
                                        key={borrow._id}
                                        className="border-t border-purple-50 transition hover:bg-[#faf9ff] dark:border-white/8 dark:hover:bg-surface-hover"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="relative h-14 w-10 overflow-hidden rounded bg-purple-50 dark:bg-surface-raised">
                                                {borrow.image ? (
                                                    <Image
                                                        src={borrow.image}
                                                        alt={borrow.title}
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                ) : null}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-slate-900 dark:text-ink">
                                            {borrow.title}
                                        </td>

                                        <td className="px-5 py-4 text-slate-500 dark:text-ink-soft">
                                            {formatDate(borrow.bookinDate)}
                                        </td>

                                        <td className="px-5 py-4 text-slate-500 dark:text-ink-soft">
                                            {getReturnDate(borrow.bookinDate)}
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleReturn(borrow)}
                                                disabled={cancelingId === borrow._id}
                                                className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-100 dark:border-white/15 dark:bg-brand-soft dark:text-brand-ink dark:hover:bg-brand/25 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {cancelingId === borrow._id
                                                    ? "Returning..."
                                                    : "Return Book"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MyBorrowsPage;
