
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
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
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Separator } from "@base-ui/react";

const privetNavLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "All Books", href: "/all-books", icon: Library },
  { name: "Add Book", href: "/add-book", icon: Plus },
  { name: "My Books", href: "/my-books", icon: BookOpen },
  { name: "My Borrows", href: "/my-borrows", icon: BookMarked },
];

const publicNavLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "All Books", href: "/all-books", icon: Library },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user

  const navLinks = session?.user ? privetNavLinks : publicNavLinks;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSignOut = async()=> {
    await authClient.signOut();
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-700 text-white shadow-md shadow-purple-200">
            <BookOpen className="size-6" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-purple-950">
              Book<span className="text-purple-600">Nook</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-gray-500">
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
                ? "bg-purple-100 text-purple-800"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {
          user ? (
            <Popover>
              <PopoverTrigger
                nativeButton={true}
                render={
                  <button className="rounded-full outline-none ring-offset-2 transition-all hover:ring-2 hover:ring-purple-300">
                    <Avatar className="size-10 cursor-pointer border-2 border-purple-200 shadow-sm">
                      <AvatarImage src={user?.image ?? undefined} />
                      <AvatarFallback className="bg-purple-100 font-bold text-purple-700">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent
                align="end"
                sideOffset={12}
                className="w-72 rounded-2xl border border-purple-100 bg-white p-0 shadow-xl shadow-purple-100/50"
              >
                <div className="p-4">

                  {/* User Information */}
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-purple-100">
                      <AvatarImage src={user?.image ?? undefined} />
                      <AvatarFallback className="bg-purple-100 font-bold text-purple-700">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-purple-950">
                        {user?.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                  >
                    <UserRound className="size-4" />
                    My Profile
                  </Link>

                  {/* Sign Out */}
                  <Button
                    nativeButton={true}
                    variant="ghost"
                    onClick={handleSignOut}
                    className="mt-2 w-full justify-start gap-3 rounded-lg px-3 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
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
                className="font-semibold text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                Login
              </Button>

              <Button
                className="rounded-lg bg-purple-700 px-5 font-semibold text-white shadow-md shadow-purple-200 hover:bg-purple-800"
                render={<Link href="/register" />}
                nativeButton={false}
              >
                Register
              </Button>
            </div>
          )
        }


        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-75 sm:w-87.5">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-purple-900">
                  <BookOpen className="size-6 text-purple-700" />
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
                        ? "bg-purple-100 text-purple-800"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                        }`}
                    >
                      <Icon className="size-5" />
                      {link.name}
                    </Link>
                  );
                })}



                {/* Login & Register */}
                <div className="mt-4 flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-700"
                    render={<Link href="/login" />}
                    nativeButton={false}
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Button>

                  <Button
                    className="bg-purple-700 text-white hover:bg-purple-800"
                    render={<Link href="/register" />}
                    nativeButton={false}
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Button>
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}