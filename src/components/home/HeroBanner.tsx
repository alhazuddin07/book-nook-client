
"use client";

import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

const slides = [
  {
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Discover Your Next Great Read",
    description:
      "Explore a world of stories, knowledge, and imagination. Find your favorite books and start your next reading adventure.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000",
    label: "Explore Our Library",
  },
  {
    subtitle: "A WORLD OF KNOWLEDGE",
    title: "Every Book Opens a New World",
    description:
      "From timeless classics to modern stories, discover books that inspire you, teach you, and take you somewhere new.",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=2000",
    label: "Find Your Favorite",
  },
  {
    subtitle: "READ • BORROW • SHARE",
    title: "Share the Joy of Reading",
    description:
      "Borrow books from our growing community, enjoy every page, and return them for another reader to discover.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2000",
    label: "Start Reading Today",
  },
];

export default function HeroBanner() {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
      }),
    []
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[autoplay]}
        className="relative w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full pl-0">
              <div
                className="relative flex min-h-105 items-center overflow-hidden rounded-2xl bg-cover bg-center sm:min-h-120 lg:min-h-130"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#160d32]/95 via-[#24124a]/75 to-[#160d32]/20" />

                {/* Content */}
                <div className="relative z-10 max-w-2xl px-7 py-16 sm:px-12 lg:px-16">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/30 bg-white/10 px-4 py-2 text-xs font-bold tracking-[2px] text-purple-100 backdrop-blur-sm">
                    <Sparkles className="size-4 text-purple-300" />
                    {slide.subtitle}
                  </div>

                  <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-purple-100 sm:text-base sm:leading-8">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                      className="h-12 rounded-xl bg-purple-600 px-6 font-bold text-white shadow-lg shadow-purple-950/30 hover:bg-purple-500"
                      render={<Link href="/all-books" />}
                      nativeButton={false}
                    >
                      <BookOpen className="mr-2 size-5" />
                      Browse Books
                      <ArrowRight className="ml-2 size-4" />
                    </Button>

                    <Link
                      href="/all-books"
                      className="text-sm font-semibold text-white underline-offset-4 transition hover:underline"
                    >
                      Explore Collection
                    </Link>
                  </div>
                </div>

                {/* Slide Number */}
                <div className="absolute right-8 bottom-8 z-10 hidden text-sm font-bold tracking-widest text-white/80 sm:block">
                  0{index + 1} / 0{slides.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious className="left-3 size-10 border-0 bg-white/90 text-purple-800 shadow-lg hover:bg-purple-600 hover:text-white sm:left-5 sm:size-12 dark:bg-white/10 dark:text-white dark:backdrop-blur-sm dark:hover:bg-brand" />

        {/* Next Button */}
        <CarouselNext className="right-3 size-10 border-0 bg-white/90 text-purple-800 shadow-lg hover:bg-purple-600 hover:text-white sm:right-5 sm:size-12 dark:bg-white/10 dark:text-white dark:backdrop-blur-sm dark:hover:bg-brand" />
      </Carousel>
    </section>
  );
}