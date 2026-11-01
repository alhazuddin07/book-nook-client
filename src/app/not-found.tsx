import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFoundIllustration = ({ className = "" }: { className?: string }) => (
    <svg
        viewBox="0 0 320 250"
        aria-hidden="true"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="164" cy="126" r="116" className="fill-[#fbf8ff] dark:fill-[#241b3d]" />
        <ellipse cx="166" cy="240" rx="94" ry="8" className="fill-[#ece5fb] dark:fill-[#2c2148]" />

        {/* Sparkles */}
        <path d="M62 66l3.2 7.8 7.8 3.2-7.8 3.2L62 88l-3.2-7.8L51 77l7.8-3.2z" fill="#b39df8" />
        <path d="M256 48l2.6 6.4 6.4 2.6-6.4 2.6-2.6 6.4-2.6-6.4-6.4-2.6 6.4-2.6z" fill="#f6a8c5" />
        <path d="M250 186l2.2 5.4 5.4 2.2-5.4 2.2-2.2 5.4-2.2-5.4-5.4-2.2 5.4-2.2z" fill="#f2c94c" />
        <circle cx="90" cy="34" r="4" fill="#c4b5fd" />
        <circle cx="286" cy="104" r="3.4" fill="#93c5fd" />
        <circle cx="40" cy="128" r="3" fill="#fbbf24" />
        <circle cx="44" cy="176" r="2.6" fill="#b39df8" />

        {/* Plant */}
        <path d="M52 214c-2-16 2-31 9-42" stroke="#4f9b68" strokeWidth="4" strokeLinecap="round" />
        <path d="M56 196c-10-1-16-7-17-15 9-2 16 2 19 11z" fill="#67b87a" />
        <path d="M60 178c-5-10-2-18 4-24 7 6 8 14 3 22z" fill="#86ca93" />
        <path d="M52 210c9-2 16-8 18-16-9-1-16 4-19 12z" fill="#4f9b68" />

        {/* Book stack */}
        <rect x="64" y="206" width="180" height="28" rx="7" fill="#ef6a7c" />
        <rect x="64" y="206" width="12" height="28" rx="6" fill="#d94f63" />
        <rect x="232" y="210" width="12" height="20" rx="2" fill="#fff8ee" />
        <path d="M235 215h6M235 219h6M235 223h6" stroke="#e4d4c1" strokeWidth="1.2" strokeLinecap="round" />

        <rect x="72" y="180" width="170" height="24" rx="7" fill="#4f7bd9" />
        <rect x="72" y="180" width="11" height="24" rx="6" fill="#3d63b8" />
        <rect x="230" y="184" width="12" height="16" rx="2" fill="#fff8ee" />
        <path d="M233 188h6M233 192h6" stroke="#e4d4c1" strokeWidth="1.2" strokeLinecap="round" />

        <rect x="82" y="156" width="158" height="22" rx="7" fill="#8b6ce0" />
        <rect x="82" y="156" width="11" height="22" rx="6" fill="#6f4fc9" />
        <rect x="228" y="159" width="12" height="15" rx="2" fill="#fff8ee" />
        <path d="M231 163h6M231 167h6" stroke="#e4d4c1" strokeWidth="1.2" strokeLinecap="round" />

        {/* Tail */}
        <path
            d="M238 130c20 2 30 10 30 22 0 8-8 12-15 9"
            stroke="#f5ad46"
            strokeWidth="14"
            strokeLinecap="round"
        />

        {/* Cat body */}
        <ellipse cx="196" cy="126" rx="58" ry="30" fill="#f5ad46" />
        <ellipse cx="190" cy="112" rx="46" ry="14" fill="#ffc973" opacity="0.55" />
        <path d="M170 108c1 9 5 14 11 16" stroke="#e08f28" strokeWidth="5" strokeLinecap="round" />
        <path d="M192 104c1 10 4 16 10 19" stroke="#e08f28" strokeWidth="5" strokeLinecap="round" />
        <path d="M214 106c0 9 3 15 9 18" stroke="#e08f28" strokeWidth="5" strokeLinecap="round" />

        {/* Ears */}
        <path d="M116 116l-6-26 26 12z" fill="#f5ad46" />
        <path d="M168 116l6-26-26 12z" fill="#f5ad46" />
        <path d="M119 110l-3-15 15 7z" fill="#f9c6a8" />
        <path d="M165 110l3-15-15 7z" fill="#f9c6a8" />

        {/* Head */}
        <circle cx="142" cy="130" r="31" fill="#f7bb5e" />
        <ellipse cx="142" cy="141" rx="21" ry="13" fill="#ffd8a8" opacity="0.65" />
        <path d="M126 132c3.5 3.5 8 3.5 11 0" stroke="#7a4a17" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M148 132c3.5 3.5 8 3.5 11 0" stroke="#7a4a17" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M139 140h6l-3 3z" fill="#d97757" />
        <path d="M142 144v3" stroke="#b4694f" strokeWidth="1.6" strokeLinecap="round" />
        <path
            d="M142 147c-1.5 2-4 2-5.5 0M142 147c1.5 2 4 2 5.5 0"
            stroke="#b4694f"
            strokeWidth="1.6"
            strokeLinecap="round"
        />
        <path
            d="M118 137l-12-3M118 143l-13 2M166 137l12-3M166 143l13 2"
            stroke="#c98a3e"
            strokeWidth="1.6"
            strokeLinecap="round"
        />
        <circle cx="122" cy="143" r="4.5" fill="#f6a48c" opacity="0.6" />
        <circle cx="162" cy="143" r="4.5" fill="#f6a48c" opacity="0.6" />

        {/* Paws */}
        <ellipse cx="126" cy="157" rx="14" ry="9" fill="#ffd8a8" />
        <ellipse cx="153" cy="159" rx="14" ry="9" fill="#ffd8a8" />
        <path d="M121 154v5M126 153v5M131 154v5" stroke="#e7b98a" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M148 156v5M153 155v5M158 156v5" stroke="#e7b98a" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const NotFound = () => {
    return (
        <section className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 sm:py-16 dark:bg-surface-muted">
            <div className="mx-auto w-full max-w-6xl rounded-3xl border border-[#ece8fb] bg-[#f3efff] px-6 py-10 shadow-[0_2px_24px_rgba(31,27,75,0.05)] sm:px-10 sm:py-12 md:px-12 dark:border-white/10 dark:bg-[#1a1330] dark:shadow-none">
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-4">
                    <NotFoundIllustration className="mx-auto h-52 w-auto sm:h-64 md:h-72" />

                    <div className="flex flex-col items-center text-center">
                        <p className="text-6xl font-black tracking-tight text-[#2f1a75] sm:text-7xl md:text-8xl dark:text-brand-ink">
                            404
                        </p>

                        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#2d2652] sm:text-3xl dark:text-ink">
                            Page Not Found
                        </h1>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 sm:text-base dark:text-ink-soft">
                            The page you are looking for doesn&apos;t exist.
                        </p>

                        <Button
                            className="mt-6 h-11 rounded-xl bg-[#4a3ad1] px-7 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-[#3c2db8] dark:bg-brand dark:shadow-none dark:hover:bg-brand-strong"
                            render={<Link href="/" />}
                            nativeButton={false}
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
