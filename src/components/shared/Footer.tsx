
import Link from "next/link";
import {
    BookOpen,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
];

export default function Footer() {
    return (
        <footer className="border-t border-transparent bg-[#160d32] text-white dark:border-white/5 dark:bg-[#0d0818]">
            <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-purple-600">
                                <BookOpen className="size-6 text-white" />
                            </div>

                            <span className="text-2xl font-extrabold tracking-tight">
                                Book<span className="text-purple-400">Nook</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-purple-200/70">
                            Your little reading space. Discover new stories, borrow
                            your favorite books, and share the joy of reading with
                            our growing community.
                        </p>

                        <div className="flex items-center gap-4 pt-8">
                            <Link
                                href="https://www.linkedin.com/in/alhaz-uddin/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-purple-200/70 hover:text-purple-600"
                            >
                                LinkedIn
                            </Link>

                            <Link
                                href="https://github.com/alhazuddin07"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-purple-200/70 font-medium hover:text-purple-600"
                            >
                                GitHub
                            </Link>
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-purple-200/70 transition hover:pl-1 hover:text-purple-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold">
                            Contact Us
                        </h3>

                        <ul className="space-y-4 text-sm text-purple-200/70">
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 size-4 shrink-0 text-purple-400" />
                                <span>support@booknook.com</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 size-4 shrink-0 text-purple-400" />
                                <span>+880 1234-567890</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-purple-400" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold">
                            Our Mission
                        </h3>

                        <p className="text-sm leading-7 text-purple-200/70">
                            We believe every book deserves to be read. BookNook
                            brings readers together by making books accessible,
                            shareable, and enjoyable for everyone.
                        </p>

                        <Link
                            href="/books"
                            className="mt-5 inline-flex items-center rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
                        >
                            Explore Books
                        </Link>
                    </div>
                </div>

                <Separator className="my-9 bg-white/10" />

                {/* Copyright */}
                <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                    <p className="text-xs text-purple-200/60">
                        © {new Date().getFullYear()} BookNook. All rights reserved.
                    </p>

                    <p className="text-xs text-purple-200/60">
                        Made with ♥ for book lovers.
                    </p>
                </div>

            </div>
        </footer>
    );
}