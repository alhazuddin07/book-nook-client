"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImageUp, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

const categories = [
    { value: "fiction", label: "Fiction" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "kids", label: "Kids" },
    { value: "others", label: "Others" },
];

const AddBookPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [imagePreview, setImagePreview] = useState("");
    const [category, setCategory] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFile = (file?: File) => {
        if (!file) return;

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            toast.add({
                type: "error",
                title: "Invalid Image",
                description: "Please upload a JPG or PNG image.",
            });
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            toast.add({
                type: "error",
                title: "Image Too Large",
                description: "Please upload an image smaller than 3MB.",
            });
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imagePreview) {
            toast.add({
                type: "error",
                title: "Cover Image Required",
                description: "Please upload a JPG or PNG cover for this book.",
            });
            return;
        }

        if (!category) {
            toast.add({
                type: "error",
                title: "Category Required",
                description: "Please choose a category for this book.",
            });
            return;
        }

        const formData = new FormData(e.currentTarget);
        const totalCopies = Number(formData.get("totalCopies"));

        if (!Number.isFinite(totalCopies) || totalCopies < 1) {
            toast.add({
                type: "error",
                title: "Invalid Copy Count",
                description: "Total copies must be at least 1.",
            });
            return;
        }

        const bookData = {
            title: formData.get("title"),
            author: formData.get("author"),
            category,
            totalCopies,
            image: imagePreview,
            description: formData.get("description"),
            userName: user?.name ?? "",
            userEmail: user?.email ?? "",
        };

        setIsSubmitting(true);

        const {data, error} = await authClient.token();
        const token = data?.token;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(bookData),
            });
            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Could Not Add Book",
                    description:
                        result.message || "Something went wrong. Please try again.",
                });
                return;
            }

            toast.add({
                type: "success",
                title: "Book Added",
                description: `"${bookData.title}" is now available in the library.`,
            });

            setImagePreview("");
            setCategory("");
            router.push("/books");
        } catch (error) {
            console.error("Add book error:", error);

            toast.add({
                type: "error",
                title: "Could Not Add Book",
                description: "Please check the server and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-[#f5f4fb] px-4 py-12 sm:px-6 dark:bg-surface-muted">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-[#2e2a8f] text-white shadow-md shadow-purple-200">
                            <Plus className="size-6" />
                        </span>

                        <h1 className="text-3xl font-bold text-[#1f1b4b] dark:text-ink">
                            Add a New Book
                        </h1>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-ink-soft">
                        Share a great book with our community
                    </p>
                </div>

                <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-surface dark:shadow-none">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
                            {/* Left column */}
                            <div className="flex flex-col gap-5">
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => fileInputRef.current?.click()}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        handleFile(e.dataTransfer.files?.[0]);
                                    }}
                                    className={`relative flex min-h-72.5 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed px-5 py-8 text-center transition ${
                                        isDragging
                                            ? "border-[#4a3ad1] bg-[#eeecff] dark:border-brand dark:bg-brand-soft"
                                            : "border-[#d5d1f5] bg-[#f7f6ff] hover:border-[#b8b2ec] dark:border-white/15 dark:bg-surface-raised dark:hover:border-brand/50"
                                    }`}
                                >
                                    {imagePreview ? (
                                        <>
                                            <Image
                                                src={imagePreview}
                                                alt="Selected book cover"
                                                fill
                                                sizes="260px"
                                                className="object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setImagePreview("");
                                                }}
                                                className="absolute right-3 top-3 z-10 rounded-full bg-[#160d32]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-[#160d32]"
                                            >
                                                Remove
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="mb-5 flex size-14 items-center justify-center rounded-xl bg-[#e8e5ff] text-[#3b5bdb] dark:bg-brand-soft dark:text-brand">
                                                <ImageUp className="size-8" />
                                            </span>

                                            <p className="text-sm font-semibold text-[#3b5bdb] dark:text-brand">
                                                Click to upload
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500 dark:text-ink-soft">
                                                or drag and drop
                                            </p>

                                            <p className="mt-2 text-xs text-slate-400 dark:text-ink-muted">
                                                (JPG, PNG)
                                            </p>
                                        </>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        className="hidden"
                                        onChange={(e) => {
                                            handleFile(e.target.files?.[0]);
                                            e.target.value = "";
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="totalCopies"
                                        className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                                    >
                                        Total Copies <span className="text-red-500">*</span>
                                    </Label>

                                    <Input
                                        id="totalCopies"
                                        name="totalCopies"
                                        type="number"
                                        min={1}
                                        defaultValue={1}
                                        required
                                        className="h-11 rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                                    />
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="title"
                                        className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                                    >
                                        Book Title <span className="text-red-500">*</span>
                                    </Label>

                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Enter book title"
                                        required
                                        className="h-11 rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="author"
                                        className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                                    >
                                        Author Name <span className="text-red-500">*</span>
                                    </Label>

                                    <Input
                                        id="author"
                                        name="author"
                                        type="text"
                                        placeholder="Enter author name"
                                        required
                                        className="h-11 rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-[#1f1b4b] dark:text-ink">
                                        Category <span className="text-red-500">*</span>
                                    </Label>

                                    <Select
                                        value={category}
                                        onValueChange={(value) => setCategory(value ?? "")}
                                    >
                                        <SelectTrigger className="h-11 w-full rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {categories.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="description"
                                        className="text-sm font-semibold text-[#1f1b4b] dark:text-ink"
                                    >
                                        Short Description <span className="text-red-500">*</span>
                                    </Label>

                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Write a short description..."
                                        rows={4}
                                        required
                                        className="resize-none rounded-lg border-[#e4e2f3] bg-white shadow-none focus-visible:border-[#4a3ad1] focus-visible:ring-[#4a3ad1]/20 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted dark:focus-visible:border-brand dark:focus-visible:ring-brand/30"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-[#1f1b4b] dark:text-ink">
                                            User Name
                                        </Label>

                                        <Input
                                            readOnly
                                            value={user?.name ?? ""}
                                            placeholder="Your name"
                                            className="h-11 rounded-lg border-transparent bg-[#f1f0f7] text-slate-500 shadow-none focus-visible:ring-0 dark:bg-white/5 dark:text-ink-muted"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-[#1f1b4b] dark:text-ink">
                                            User Email
                                        </Label>

                                        <Input
                                            readOnly
                                            value={user?.email ?? ""}
                                            placeholder="Your email"
                                            className="h-11 rounded-lg border-transparent bg-[#f1f0f7] text-slate-500 shadow-none focus-visible:ring-0 dark:bg-white/5 dark:text-ink-muted"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 w-full max-w-xs rounded-lg bg-[#4a3ad1] px-8 text-base font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-[#3c2db8] dark:bg-brand dark:shadow-none dark:hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Adding..." : "Add Book"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddBookPage;