import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const artClassName = "h-full w-full";

const FantasyArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="60" cy="91" rx="37" ry="8" fill="#efe9df" />
        <ellipse cx="60" cy="86" rx="38" ry="8" fill="#2f2a4a" />
        <path d="M38 85 60 20l22 65H38Z" fill="#2f2a4a" />
        <path d="M44 68h32l3 10H41l3-10Z" fill="#8b86b8" />
        <path d="M60 20c-4 10-9 24-13 38" stroke="#4a4470" strokeWidth="3" strokeLinecap="round" />
        <path d="m30 29 2.2 5 5 2.2-5 2.2-2.2 5-2.2-5-5-2.2 5-2.2L30 29Z" fill="#f4c33f" />
        <path d="m93 43 1.8 4 4 1.8-4 1.8-1.8 4-1.8-4-4-1.8 4-1.8L93 43Z" fill="#e8894a" />
        <circle cx="89" cy="23" r="2.5" fill="#8b86b8" />
    </svg>
);

const HistoricalArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="60" cy="96" rx="34" ry="6" fill="#efe9df" />
        <path d="M50 88 54 40h12l4 48H50Z" fill="#f5f0e8" stroke="#d8cfc0" strokeWidth="2" />
        <path d="M52 40 60 26l8 14H52Z" fill="#e8894a" />
        <rect x="44" y="86" width="32" height="7" rx="2" fill="#8b5e45" />
        <rect x="56" y="74" width="8" height="14" rx="2" fill="#8b5e45" />
        <g fill="#f5f0e8" stroke="#c9b9a5" strokeWidth="1.5">
            <rect x="57" y="8" width="6" height="30" rx="2" />
            <rect x="57" y="8" width="6" height="30" rx="2" transform="rotate(90 60 40)" />
            <rect x="57" y="8" width="6" height="30" rx="2" transform="rotate(180 60 40)" />
            <rect x="57" y="8" width="6" height="30" rx="2" transform="rotate(270 60 40)" />
        </g>
        <circle cx="60" cy="40" r="4" fill="#8b5e45" />
    </svg>
);

const RomanceArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="60" cy="101" rx="34" ry="6" fill="#efe9df" />
        <circle cx="45" cy="34" r="8" fill="#f2c6a2" />
        <path d="M37 34c0-8 4-13 8-13s8 5 8 13c-2-4-4-6-8-6s-6 2-8 6Z" fill="#2f2a4a" />
        <path d="M37 46h16l7 34H30l7-34Z" fill="#f5f0e8" stroke="#e4d8cc" strokeWidth="1.5" />
        <path d="m36 80-4 17M54 80l4 17" stroke="#f2c6a2" strokeWidth="5" strokeLinecap="round" />
        <path d="m38 50-10 12" stroke="#f2c6a2" strokeWidth="4" strokeLinecap="round" />
        <circle cx="78" cy="30" r="8" fill="#f2c6a2" />
        <path d="M70 30c0-8 4-13 8-13s8 5 8 13c-2-4-4-6-8-6s-6 2-8 6Z" fill="#2f2a4a" />
        <path d="M69 42h18l6 42H63l6-42Z" fill="#4a4a55" />
        <path d="M78 44v18" stroke="#f5f0e8" strokeWidth="2" />
        <path d="m71 84-4 17M85 84l4 17" stroke="#4a4a55" strokeWidth="6" strokeLinecap="round" />
        <path d="m69 48-11 12" stroke="#4a4a55" strokeWidth="5" strokeLinecap="round" />
    </svg>
);

const BusinessArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="60" cy="101" rx="28" ry="6" fill="#efe9df" />
        <circle cx="60" cy="28" r="9" fill="#f2c6a2" />
        <path d="M51 28c0-9 4-14 9-14s9 5 9 14c-2-5-5-7-9-7s-7 2-9 7Z" fill="#2f2a4a" />
        <path d="M47 42h26l7 46H40l7-46Z" fill="#3f3f46" />
        <path d="M55 42h10l-2 18-3 5-3-5-2-18Z" fill="#f5f0e8" />
        <path d="M60 46v14" stroke="#e8894a" strokeWidth="3" strokeLinecap="round" />
        <path d="m50 86-4 15M70 86l4 15" stroke="#3f3f46" strokeWidth="7" strokeLinecap="round" />
        <path d="M47 50 38 64M73 50l9 14" stroke="#3f3f46" strokeWidth="6" strokeLinecap="round" />
        <rect x="78" y="58" width="6" height="11" rx="1.5" fill="#2f2a4a" transform="rotate(18 81 63)" />
    </svg>
);

const HumorArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="60" cy="101" rx="30" ry="6" fill="#efe9df" />
        <path d="M34 60c-6 4-8 12-5 18 5-2 9-7 10-12M86 60c6 4 8 12 5 18-5-2-9-7-10-12" fill="#8b5e45" />
        <ellipse cx="60" cy="64" rx="27" ry="30" fill="#8b5e45" />
        <ellipse cx="60" cy="73" rx="17" ry="20" fill="#d9b38c" />
        <circle cx="49" cy="48" r="11" fill="#f5f0e8" />
        <circle cx="71" cy="48" r="11" fill="#f5f0e8" />
        <circle cx="50" cy="49" r="4" fill="#2f2a4a" />
        <circle cx="70" cy="49" r="4" fill="#2f2a4a" />
        <path d="M56 56 60 63l4-7H56Z" fill="#e8894a" />
        <path d="M50 93v5M70 93v5" stroke="#f4c33f" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

const ScienceArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="60" cy="101" rx="28" ry="6" fill="#efe9df" />
        <g stroke="#2f2a4a" strokeWidth="4">
            <ellipse cx="60" cy="58" rx="40" ry="16" />
            <ellipse cx="60" cy="58" rx="40" ry="16" transform="rotate(60 60 58)" />
            <ellipse cx="60" cy="58" rx="40" ry="16" transform="rotate(120 60 58)" />
        </g>
        <circle cx="60" cy="58" r="8" fill="#e8894a" />
        <circle cx="31" cy="45" r="5" fill="#e8894a" />
        <circle cx="89" cy="70" r="5" fill="#f4c33f" />
    </svg>
);

const PoliticsArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="58" cy="101" rx="27" ry="6" fill="#efe9df" />
        <circle cx="56" cy="28" r="9" fill="#f2c6a2" />
        <path d="M47 28c0-9 4-14 9-14s9 5 9 14c-2-5-5-7-9-7s-7 2-9 7Z" fill="#2f2a4a" />
        <path d="M44 42h24l6 46H38l6-46Z" fill="#4a4a55" />
        <path d="M52 42h8l-1 16-3 5-3-5-1-16Z" fill="#f5f0e8" />
        <path d="M56 45v14" stroke="#c94f4f" strokeWidth="3" strokeLinecap="round" />
        <path d="m46 86-4 15M66 86l4 15" stroke="#4a4a55" strokeWidth="7" strokeLinecap="round" />
        <path d="m68 50 9 8" stroke="#4a4a55" strokeWidth="6" strokeLinecap="round" />
        <rect x="77" y="56" width="5" height="12" rx="2" fill="#2f2a4a" transform="rotate(20 79 62)" />
        <path d="M81 70v12" stroke="#2f2a4a" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ThrillersArt = () => (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={artClassName} fill="none">
        <ellipse cx="60" cy="101" rx="24" ry="6" fill="#efe9df" />
        <g fill="#f2c6a2" stroke="#d9a17f" strokeWidth="2">
            <rect x="45" y="28" width="8" height="34" rx="4" />
            <rect x="55" y="22" width="8" height="40" rx="4" />
            <rect x="65" y="24" width="8" height="38" rx="4" />
            <rect x="75" y="30" width="8" height="32" rx="4" />
        </g>
        <path d="M44 58c0-6 4-10 10-10h16c6 0 10 4 10 10v24c0 8-5 14-13 14H57c-8 0-13-6-13-14V58Z" fill="#f2c6a2" stroke="#d9a17f" strokeWidth="2" />
        <path d="M42 62c-6 0-10 4-10 9s4 9 10 9" fill="#f2c6a2" stroke="#d9a17f" strokeWidth="2" />
        <path d="M44 88h34v10H44z" fill="#3f3f46" />
    </svg>
);

const categories = [
    { name: "Fiction", value: "Fiction", Art: FantasyArt },
    { name: "Science", value: "Science", Art: ScienceArt },
    { name: "History", value: "History", Art: HistoricalArt },
    { name: "Kids", value: "Kids", Art: HumorArt },
    { name: "Others", value: "Others", Art: BusinessArt },
];

const CategoryShowcase = () => {
    return (
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 dark:bg-[#0B0714]">
            <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mb-9 text-center sm:mb-12">
                    <p
                        className="text-sm italic text-[#b5763f] sm:text-base dark:text-brand"
                        style={{
                            fontFamily:
                                '"Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive',
                        }}
                    >
                        Popular Categories
                    </p>

                    <div className="mt-2 flex items-center justify-center gap-4 sm:gap-6">
                        <span
                            className="h-px w-12 bg-[#c9a27a] sm:w-24 dark:bg-white/15"
                            aria-hidden="true"
                        />

                        <h2 className="font-serif text-3xl font-normal tracking-tight text-[#1f1f1f] sm:text-4xl lg:text-5xl dark:text-ink">
                            Shop By Category
                        </h2>

                        <span
                            className="h-px w-12 bg-[#c9a27a] sm:w-24 dark:bg-white/15"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
                    {categories.map(({ name, value, Art }) => (
                        <Link
                            key={name}
                            href={`/books?category=${value}`}
                            aria-label={`Browse ${name} books`}
                            className="group flex min-h-52 flex-col items-center justify-between rounded-2xl border border-[#efe9df] bg-white px-3 py-6 text-center shadow-[0_10px_30px_rgba(45,38,30,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(45,38,30,0.12)] sm:min-h-64 sm:px-5 sm:py-8 dark:border-white/10 dark:bg-surface dark:shadow-none dark:hover:border-brand/40 dark:hover:shadow-black/30"
                        >
                            <div className="mb-4 flex h-24 w-24 items-center justify-center sm:mb-5 sm:h-28 sm:w-28">
                                <Art />
                            </div>

                            <h3 className="font-serif text-base text-[#2b2b2b] sm:text-lg dark:text-ink">
                                {name}
                            </h3>

                            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#3a3a3a] transition group-hover:text-[#b5763f] sm:mt-5 sm:text-sm dark:text-ink-soft dark:group-hover:text-brand">
                                View Now
                                <ArrowUpRight className="size-3.5 sm:size-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
