
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  BookOpen,
  House,
  Library,
  Menu,
  Plus,
  BookMarked,
  UserRound,
  LogOut,
  UserPlus,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { Separator } from "@base-ui/react";

const privetNavLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "All Books", href: "/books", icon: Library },
  { name: "Add Book", href: "/add-book", icon: Plus },
  { name: "My Books", href: "/my-books", icon: BookOpen },
  { name: "My Borrows", href: "/my-borrows", icon: BookMarked },
];

const publicNavLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "All Books", href: "/books", icon: Library },
];

export default function Navbar() {

  const router = useRouter();

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const navLinks = user ? privetNavLinks : publicNavLinks;

  const mounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const [profileOpen, setProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    setOpen(false);
    router.push("/login");
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-700 text-white shadow-md shadow-purple-200 dark:bg-brand dark:shadow-none">
            <BookOpen className="size-6" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-extrabold tracking-tight text-purple-950 sm:text-xl dark:text-brand-ink">
              Book<span className="text-purple-600 dark:text-brand">Nook</span>
            </h1>
            <p className="hidden text-[10px] font-medium tracking-wider text-gray-500 sm:block dark:text-ink-muted">
              YOUR LITTLE READING SPACE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive(link.href)
                ? "bg-purple-100 text-purple-800 dark:bg-brand-soft dark:text-brand-ink"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-700 dark:text-ink-soft dark:hover:bg-brand-soft dark:hover:text-brand-ink"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <ThemeToggle />

          {mounted && !isPending && (
            <>
              {
                user ? (
                  <Popover open={profileOpen} onOpenChange={setProfileOpen}>
                    <PopoverTrigger
                      nativeButton={true}
                      render={
                        <button className="rounded-full outline-none ring-offset-2 transition-all hover:ring-2 hover:ring-purple-300 dark:hover:ring-brand/50">
                          <Avatar className="size-10 cursor-pointer border-2 border-purple-200 shadow-sm dark:border-white/15">
                            <AvatarImage src={user?.image ?? undefined} />
                            <AvatarFallback className="bg-purple-100 font-bold text-purple-700 dark:bg-brand-soft dark:text-brand-ink">
                              {user?.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      }
                    />

                    <PopoverContent
                      align="end"
                      sideOffset={12}
                      className="w-72 rounded-2xl border border-hairline bg-surface p-0 shadow-xl shadow-purple-100/50 dark:shadow-black/40"
                    >
                      <div className="p-4">

                        {/* User Information */}
                        <div className="flex items-center gap-3">
                          <Avatar className="size-12 border-2 border-purple-100 dark:border-white/15">
                            <AvatarImage src={user?.image ?? undefined} />
                            <AvatarFallback className="bg-purple-100 font-bold text-purple-700 dark:bg-brand-soft dark:text-brand-ink">
                              {user?.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-purple-950 dark:text-brand-ink">
                              {user?.name}
                            </p>

                            <p className="truncate text-xs text-gray-500 dark:text-ink-muted">
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Profile Link */}
                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-700 dark:text-ink-soft dark:hover:bg-brand-soft dark:hover:text-brand-ink"
                        >
                          <UserRound className="size-4" />
                          My Profile
                        </Link>

                        {/* Sign Out */}
                        <Button
                          nativeButton={true}
                          variant="ghost"
                          onClick={handleSignOut}
                          className="mt-2 w-full justify-start gap-3 rounded-lg px-3 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/15 dark:hover:text-red-300"
                        >
                          <LogOut className="size-4" />
                          Sign Out
                        </Button>

                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <div className="hidden items-center gap-3 lg:flex">
                    <Button
                      variant="ghost"
                      className="font-semibold text-purple-700 hover:bg-purple-50 hover:text-purple-800 dark:text-brand-ink dark:hover:bg-brand-soft dark:hover:text-brand-ink"
                      render={<Link href="/login" />}
                      nativeButton={false}
                    >
                      Login
                    </Button>

                    <Button
                      className="rounded-lg bg-purple-700 px-5 font-semibold text-white shadow-md shadow-purple-200 hover:bg-purple-800 dark:bg-brand dark:shadow-none dark:hover:bg-brand-strong"
                      render={<Link href="/register" />}
                      nativeButton={false}
                    >
                      Register
                    </Button>
                  </div>
                )
              }

              {/* Mobile Navigation */}

              {user ? <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger
                    render={
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-white/15 dark:bg-surface-raised dark:text-brand-ink dark:hover:bg-brand-soft"
                      />
                    }
                  >
                    <Menu className="size-5" />
                  </SheetTrigger>

                  <SheetContent side="right" className="w-72 max-w-[85vw] sm:w-87.5">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2 text-purple-900 dark:text-brand-ink">
                        <BookOpen className="size-6 text-purple-700 dark:text-brand" />
                        BookNook
                      </SheetTitle>
                    </SheetHeader>

                    <div className="mt-6 flex flex-col gap-2">

                      {/* Navigation Links */}
                      {navLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${isActive(link.href)
                              ? "bg-purple-100 text-purple-800 dark:bg-brand-soft dark:text-brand-ink"
                              : "text-gray-600 hover:bg-purple-50 hover:text-purple-700 dark:text-ink-soft dark:hover:bg-brand-soft dark:hover:text-brand-ink"
                              }`}
                          >
                            <Icon className="size-5" />
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    <Button
                      onClick={handleSignOut}
                      className={'p-5 text-[20px]'}
                    >
                      Sign Out
                    </Button>

                  </SheetContent>
                </Sheet>
              </div> : <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger
                    render={
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-10 rounded-xl border-purple-200 bg-white text-purple-700 shadow-sm transition-all hover:bg-purple-50 hover:shadow-md dark:border-white/15 dark:bg-surface-raised dark:text-brand-ink"
                      />
                    }
                  >
                    <Menu className="size-5" />
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-80 max-w-[85vw] border-l border-purple-100 bg-white p-0 dark:border-white/10 dark:bg-surface-raised"
                  >
                    {/* Header */}
                    <SheetHeader className="border-b border-purple-100 bg-linear-to-br from-purple-50 via-white to-indigo-50 px-6 py-6 dark:border-white/10 dark:from-surface-raised dark:via-surface-raised dark:to-surface-raised">
                      <SheetTitle className="flex items-center gap-3 text-left">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-md">
                          <BookOpen className="size-6" />
                        </div>

                        <div>
                          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            BookNook
                          </h2>
                          <p className="mt-0.5 text-xs font-normal text-gray-500 dark:text-gray-400">
                            Your personal reading space
                          </p>
                        </div>
                      </SheetTitle>
                    </SheetHeader>

                    {/* Navigation Content */}
                    <div className="flex h-[calc(100%-100px)] flex-col justify-between px-6 py-7">
                      <div className="space-y-3">
                        <div className="mb-5">
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                            Welcome to BookNook
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            Sign in to explore books and manage your personal library.
                          </p>
                        </div>

                        <Button
                          className="h-12 w-full rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-base font-semibold text-white shadow-md transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg"
                          render={<Link href="/login" />}
                          nativeButton={false}
                          onClick={() => setOpen(false)}
                        >
                          <LogIn className="mr-2 size-4" />
                          Login
                        </Button>

                        <Button
                          variant="outline"
                          className="h-12 w-full rounded-xl border-purple-200 text-base font-semibold text-purple-700 transition-all hover:border-purple-300 hover:bg-purple-50 dark:border-white/15 dark:text-brand-ink dark:hover:bg-brand-soft"
                          render={<Link href="/register" />}
                          nativeButton={false}
                          onClick={() => setOpen(false)}
                        >
                          <UserPlus className="mr-2 size-4" />
                          Create an Account
                        </Button>
                      </div>

                      {/* Footer */}
                      <div className="rounded-xl border border-purple-100 bg-purple-50/70 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-center gap-2 text-purple-700 dark:text-brand-ink">
                          <BookOpen className="size-4" />
                          <span className="text-sm font-semibold">Read. Discover. Repeat.</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                          Discover your next favorite book with BookNook.
                        </p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>}
            </>
          )}

        </div>

      </div>
    </header>
  );
}