"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Plus, Trash2 } from "lucide-react";

import EditBookDialog from "@/components/my-books/EditBookDialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { Book } from "@/types/book";

const API_URL = "http://localhost:5000";

// MongoDB ObjectIds embed their creation timestamp in the first 4 bytes.
const formatAddedDate = (id: string) => {
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        return "-";
    }

    const date = new Date(Number.parseInt(id.slice(0, 8), 16) * 1000);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const MyBooksPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const email = session?.user?.email;

    const [books, setBooks] = useState<Book[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!email) return;

        let cancelled = false;

        const loadBooks = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/my-books?email=${(email)}`
                );
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Could not load your books.");
                }

                if (!cancelled) {
                    setBooks(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("My books fetch error:", error);

                if (!cancelled) {
                    toast.add({
                        type: "error",
                        title: "Could Not Load Books",
                        description: "Please check the server and try again.",
                    });
                }
            } finally {
                if (!cancelled) {
                    setLoaded(true);
                }
            }
        };

        loadBooks();

        return () => {
            cancelled = true;
        };
    }, [email]);

    const handleDelete = async () => {
        if (!bookToDelete || !email) return;

        setDeletingId(bookToDelete._id);

        try {
            const res = await fetch(
                `${API_URL}/book/${bookToDelete._id}?email=${(email)}`,
                { method: "DELETE" }
            );
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Could Not Delete Book",
                    description:
                        data.message || "Something went wrong. Please try again.",
                });
                return;
            }

            setBooks((current) =>
                current.filter((book) => book._id !== bookToDelete._id)
            );
            toast.add({
                type: "success",
                title: "Book Deleted",
                description: `"${bookToDelete.title}" has been removed.`,
            });
            setBookToDelete(null);
        } catch (error) {
            console.error("Delete book error:", error);

            toast.add({
                type: "error",
                title: "Could Not Delete Book",
                description: "Please check the server and try again.",
            });
        } finally {
            setDeletingId(null);
        }
    };

    const loading = isPending || (!!email && !loaded);

    return (
        <section className="min-h-screen bg-[#f7f7ff] px-4 py-10 sm:px-6 dark:bg-surface-muted">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <div className="mb-2 flex items-center justify-center gap-2">
                        <BookOpen className="size-8 text-[#4935d4] dark:text-brand" />

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-ink">
                            My Books
                        </h1>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-ink-soft">
                        Manage the books you have added
                    </p>
                </div>

                {loading ? (
                    <div className="rounded-xl border border-dashed border-purple-200 bg-white py-16 text-center dark:border-white/15 dark:bg-surface">
                        <p className="text-sm text-slate-500 dark:text-ink-soft">
                            Loading your books...
                        </p>
                    </div>
                ) : !email ? (
                    <div className="rounded-xl border border-dashed border-purple-200 bg-white py-16 text-center dark:border-white/15 dark:bg-surface">
                        <p className="text-sm text-slate-500 dark:text-ink-soft">
                            Please log in to see the books you have added.
                        </p>

                        <Link
                            href="/login"
                            className="mt-4 inline-flex rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800"
                        >
                            Go to Login
                        </Link>
                    </div>
                ) : books.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-purple-200 bg-white py-16 text-center dark:border-white/15 dark:bg-surface">
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-ink">
                            No books added yet
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-ink-soft">
                            Share your first book with the community.
                        </p>

                        <Link
                            href="/add-book"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800"
                        >
                            <Plus className="size-4" />
                            Add Your First Book
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-[#ecebf6] bg-white shadow-[0_2px_14px_rgba(31,27,75,0.05)] dark:border-white/10 dark:bg-surface dark:shadow-none">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-175 text-left text-sm">
                                <thead className="bg-[#fbfaff] dark:bg-surface-raised">
                                    <tr className="text-[13px] text-[#1f1b4b] dark:text-ink">
                                        <th className="px-6 py-3 font-bold">Image</th>
                                        <th className="px-6 py-3 font-bold">Title</th>
                                        <th className="px-6 py-3 font-bold">Category</th>
                                        <th className="px-6 py-3 font-bold">Date Added</th>
                                        <th className="px-6 py-3 font-bold">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {books.map((book) => (
                                        <tr
                                            key={book._id}
                                            className="border-t border-[#f0eef8] transition hover:bg-[#faf9ff] dark:border-white/8 dark:hover:bg-surface-hover"
                                        >
                                            <td className="px-6 py-3">
                                                <div className="relative h-14 w-10 overflow-hidden rounded-md bg-purple-50 dark:bg-surface-raised">
                                                    {book.image ? (
                                                        <Image
                                                            src={book.image}
                                                            alt={book.title}
                                                            fill
                                                            sizes="40px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <BookOpen className="m-auto size-5 text-purple-300 dark:text-ink-muted" />
                                                    )}
                                                </div> 
                                            </td>

                                            <td className="max-w-60 truncate px-6 py-3 font-semibold text-slate-900 dark:text-ink">
                                                {book.title}
                                            </td>

                                            <td className="px-6 py-3">
                                                <span className="inline-flex min-w-27.5 justify-center rounded-lg border border-[#e7e5f3] bg-white px-4 py-1.5 text-sm capitalize text-slate-700 dark:border-white/10 dark:bg-surface-raised dark:text-ink-soft shadow-[0_1px_2px_rgba(31,27,75,0.04)]">
                                                    {book.category}
                                                </span>
                                            </td>

                                            <td className="px-6 py-3 text-slate-600 dark:text-ink-soft">
                                                {formatAddedDate(book._id)}
                                            </td>

                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setBookToEdit(book)}
                                                        className="rounded-md bg-[#3f51e0] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3042c8] dark:bg-brand dark:hover:bg-brand-strong"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => setBookToDelete(book)}
                                                        className="rounded-md bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {bookToEdit && email ? (
                <EditBookDialog
                    key={bookToEdit._id}
                    book={bookToEdit}
                    email={email}
                    onClose={() => setBookToEdit(null)}
                    onSaved={(updated) => {
                        setBooks((current) =>
                            current.map((book) =>
                                book._id === updated._id ? updated : book
                            )
                        );
                        setBookToEdit(null);
                    }}
                />
            ) : null}

            <AlertDialog
                open={Boolean(bookToDelete)}
                onOpenChange={(open) => {
                    if (!open) setBookToDelete(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-red-50 text-red-600">
                            <Trash2 className="size-5" />
                        </AlertDialogMedia>

                        <AlertDialogTitle>Delete this book?</AlertDialogTitle>

                        <AlertDialogDescription>
                            &quot;{bookToDelete?.title}&quot; will be removed from
                            the library. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={Boolean(deletingId)}>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={Boolean(deletingId)}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            {deletingId ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};

export default MyBooksPage;