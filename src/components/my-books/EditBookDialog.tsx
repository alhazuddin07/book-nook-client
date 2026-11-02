"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { Book } from "@/types/book";
import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:5000";

type EditBookDialogProps = {
    book: Book;
    email: string;
    onClose: () => void;
    onSaved: (book: Book) => void;
};

const EditBookDialog = ({ book, email, onClose, onSaved }: EditBookDialogProps) => {
    const [form, setForm] = useState({
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        totalCopies: String(book.totalCopies),
    });
    const [isSaving, setIsSaving] = useState(false);

    const updateField =
        (field: keyof typeof form) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((current) => ({ ...current, [field]: event.target.value }));
        };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const totalCopies = Number(form.totalCopies);

        if (!Number.isInteger(totalCopies) || totalCopies < 0) {
            toast.add({
                type: "error",
                title: "Invalid Copy Count",
                description: "Available copies must be zero or more.",
            });
            return;
        }

        setIsSaving(true);

        const { data, error } = await authClient.token();
        const token = data?.token;

        try {
            const res = await fetch(
                `${API_URL}/book/${book._id}?email=${(email)}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: form.title,
                        author: form.author,
                        category: form.category,
                        description: form.description,
                        totalCopies,
                    }),
                }
            );
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Could Not Update Book",
                    description:
                        data.message || "Something went wrong. Please try again.",
                });
                return;
            }

            toast.add({
                type: "success",
                title: "Book Updated",
                description: `"${data.title}" has been updated.`,
            });

            onSaved(data as Book);
        } catch (error) {
            console.error("Update book error:", error);

            toast.add({
                type: "error",
                title: "Could Not Update Book",
                description: "Please check the server and try again.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <DialogPrimitive.Root
            open
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogPrimitive.Portal>
                <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px]" />

                <DialogPrimitive.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-purple-100 bg-white p-6 text-slate-900 shadow-2xl dark:border-white/10 dark:bg-surface dark:text-ink dark:shadow-black/50 outline-none">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <DialogPrimitive.Title className="text-xl font-bold text-[#1f1b4b] dark:text-ink">
                                Edit Book
                            </DialogPrimitive.Title>

                            <DialogPrimitive.Description className="mt-1 text-sm text-slate-500 dark:text-ink-soft">
                                Update the details for &quot;{book.title}&quot;.
                            </DialogPrimitive.Description>
                        </div>

                        <DialogPrimitive.Close
                            aria-label="Close"
                            render={<Button variant="ghost" size="icon-sm" />}
                        >
                            <X className="size-4" />
                        </DialogPrimitive.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="edit-title"
                                className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                            >
                                Book Title
                            </Label>

                            <Input
                                id="edit-title"
                                value={form.title}
                                onChange={updateField("title")}
                                required
                                className="h-10 rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="edit-author"
                                    className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                                >
                                    Author
                                </Label>

                                <Input
                                    id="edit-author"
                                    value={form.author}
                                    onChange={updateField("author")}
                                    required
                                    className="h-10 rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="edit-category"
                                    className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                                >
                                    Category
                                </Label>

                                <Input
                                    id="edit-category"
                                    value={form.category}
                                    onChange={updateField("category")}
                                    required
                                    className="h-10 rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="edit-total-copies"
                                className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                            >
                                Available Copies
                            </Label>

                            <Input
                                id="edit-total-copies"
                                type="number"
                                min={0}
                                value={form.totalCopies}
                                onChange={updateField("totalCopies")}
                                required
                                className="h-10 rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="edit-description"
                                className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                            >
                                Description
                            </Label>

                            <Textarea
                                id="edit-description"
                                value={form.description}
                                onChange={updateField("description")}
                                rows={4}
                                required
                                className="resize-none rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSaving}
                                className="h-10 rounded-lg border-[#e4e2f3] px-5 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/5"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSaving}
                                className="h-10 rounded-lg bg-[#4a3ad1] px-5 font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-[#3c2db8] dark:bg-brand dark:shadow-none dark:hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </DialogPrimitive.Popup>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};

export default EditBookDialog;
