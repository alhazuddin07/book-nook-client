
import { BookOpen, Sparkles } from "lucide-react";

const LoadingPage = () => {
    return (
        <div className="flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-linear-to-br from-purple-50 via-white to-indigo-50 px-4 py-10 transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/30 sm:min-h-[75vh] sm:px-6 lg:min-h-[80vh] lg:px-8">

            <div className="flex w-full max-w-md flex-col items-center text-center">

                {/* Animated Logo */}
                <div className="relative mb-6 sm:mb-8">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 shadow-xl shadow-purple-200/70 animate-pulse dark:shadow-purple-900/40 sm:size-20 md:size-24">
                        <BookOpen className="size-8 text-white sm:size-10 md:size-12" />
                    </div>

                    <div className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800 sm:size-8">
                        <Sparkles className="size-4 text-amber-500 sm:size-5" />
                    </div>
                </div>

                {/* Brand Name */}
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                    Book<span className="text-purple-600 dark:text-purple-400">Nook</span>
                </h1>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm md:text-base">
                    Your Little Reading Space
                </p>

                {/* Loading Spinner */}
                <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10">
                    <div className="size-5 animate-spin rounded-full border-[3px] border-purple-200 border-t-purple-600 dark:border-purple-900 dark:border-t-purple-400 sm:size-6" />

                    <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 sm:text-sm md:text-base">
                        Loading your library...
                    </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="mt-5 h-1.5 w-40 overflow-hidden rounded-full bg-purple-100 dark:bg-gray-700 sm:w-48 md:w-56">
                    <div className="h-full w-full origin-left animate-pulse rounded-full bg-linear-to-r from-purple-500 to-indigo-500" />
                </div>

                {/* Bottom Text */}
                <p className="mt-7 text-[10px] font-semibold tracking-[2px] text-gray-400 dark:text-gray-500 sm:mt-9 sm:text-xs">
                    GOOD BOOKS ARE WORTH THE WAIT ✨
                </p>

            </div>
        </div>
    );
};

export default LoadingPage;