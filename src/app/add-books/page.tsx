
'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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

import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";


export default function AddBookPage() {

    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    // Cleanup Object URL
    useEffect(() => {
        return () => {
            if (preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    // Form Submit
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userData = {
            title: formData.get("title"),
            author: formData.get("author"),
            category: category,
            totalCopies: Number(formData.get("totalCopies")),
            image: formData.get("image"),
            description: formData.get("description"),
        };

        const res = await fetch('http://localhost:5000/add-book', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await res.json()
        console.log(data);
    };

    // Reset Form
    const handleReset = () => {
        setImage("");
        setPreview("");
        setCategory("");
        setSelectedFile(null);
    };

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-12">

            <div className="mx-auto max-w-3xl">

                {/* Heading */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                        <BookOpen className="size-7" />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900">
                        Add New Book
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Add a new book to the BookNook library.
                    </p>

                </div>

                {/* Form Card */}
                <Card className="rounded-2xl border-slate-200 shadow-sm">

                    <CardHeader className="border-b px-6 py-5">

                        <CardTitle className="text-xl">
                            Book Information
                        </CardTitle>

                        <CardDescription>
                            Fill in the information about your book.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="p-6">

                        <form
                            onSubmit={handleSubmitForm}
                            onReset={handleReset}
                            className="space-y-6"
                        >

                            {/* Book Title & Author */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div className="space-y-2">

                                    <Label htmlFor="title">
                                        Book Title
                                    </Label>

                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Enter book title"
                                        required
                                    />

                                </div>

                                <div className="space-y-2">

                                    <Label htmlFor="author">
                                        Author Name
                                    </Label>

                                    <Input
                                        id="author"
                                        name="author"
                                        type="name"
                                        placeholder="Enter author name"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Category & Total Copies */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div className="space-y-2">

                                    <Label>
                                        Category
                                    </Label>

                                    <Select
                                        value={category}
                                        onValueChange={(value) => setCategory(value ?? "")}
                                    >

                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>

                                        <SelectContent>

                                            <SelectItem value="fiction">Fiction</SelectItem>
                                            <SelectItem value="science">Science</SelectItem>
                                            <SelectItem value="history">History</SelectItem>
                                            <SelectItem value="kids">Kids</SelectItem>
                                            <SelectItem value="others">Others</SelectItem>

                                        </SelectContent>

                                    </Select>

                                </div>

                                <div className="space-y-2">

                                    <Label htmlFor="totalCopies">Total Copies</Label>

                                    <Input
                                        id="totalCopies"
                                        name="totalCopies"
                                        type="number"
                                        placeholder="Enter total copies"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Image Upload & URL */}
                            <div className="space-y-2">
                                <Label htmlFor="image">ImageUrl</Label>

                                <Input
                                    id="image"
                                    name="image"
                                    type="url"
                                    placeholder="Enter your image url"
                                    required
                                />

                                <p className="text-xs text-slate-500">
                                    Enter your image URL.
                                </p>

                            </div>




                            {/* Description */}
                            <div className="space-y-2">

                                <Label htmlFor="description">
                                    Book Description
                                </Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Write something about this book..."
                                    rows={5}
                                    className="resize-none"
                                    required
                                />

                            </div>


                            {/* Buttons */}
                            <div className="flex justify-end gap-3 border-t pt-5">

                                <Button
                                    type="reset"
                                    variant="outline"
                                >
                                    Reset
                                </Button>

                                <Button
                                    type="submit"
                                    className="bg-purple-600 text-white hover:bg-purple-700"
                                    disabled={!category}
                                >

                                    <BookOpen className="mr-2 size-4" />

                                    Add Book

                                </Button>

                            </div>

                        </form>

                    </CardContent>

                </Card>

            </div>

        </section>
    );
}