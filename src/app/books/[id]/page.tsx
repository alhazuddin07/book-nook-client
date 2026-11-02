import BorrowBooks from "@/components/borrowBook/BorrowBooks";
import { auth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session){
        redirect('/login')
    }

    const token = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
        headers: {
            authorization: `Bearer ${token?.token}`,
        }
    });

    const books = await res.json();

    return (
        <section className="min-h-screen bg-[#f8f7ff] px-4 py-12 dark:bg-surface-muted">
            <div className="mx-auto max-w-6xl">

                {/* Back Button */}
                <Link
                    href="/books"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-700 dark:text-ink-soft dark:hover:text-brand"
                >
                    <ArrowLeft className="size-4" />
                    Back to all books
                </Link>

                {/* Main Details Card */}
                <div className="grid overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-lg md:grid-cols-2 dark:border-white/10 dark:bg-surface dark:shadow-black/30">

                    {/* Book Image */}
                    <div className="flex items-center justify-center bg-linear-to-br from-[#ede9fe] to-[#f5f3ff] p-8 md:p-12 dark:from-[#1a1330] dark:to-[#120d22]">
                        <div className="relative flex h-100 w-full max-w-[320px] items-center justify-center rounded-2xl bg-white p-5 shadow-xl dark:bg-surface-raised dark:shadow-black/40">
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