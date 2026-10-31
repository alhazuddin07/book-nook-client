
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  House,
  Library,
  LogIn,
  LogOut,
  Menu,
  Plus,
  UserRound,
  BookMarked,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavbarProps = {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  } | null;
  onLogout?: () => void;
};

const publicLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "All Books", href: "/all-books", icon: Library },
];

const privateLinks = [
  { name: "Add Book", href: "/add-book", icon: Plus },
  { name: "My Books", href: "/my-books", icon: BookOpen },
  { name: "My Borrows", href: "/my-borrows", icon: BookMarked },
];

export default function Navbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isLoggedIn = !!user;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinks = [
    ...publicLinks,
    ...(isLoggedIn ? privateLinks : []),
  ];

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
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "bg-purple-100 text-purple-800"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full border border-purple-100 px-2 hover:bg-purple-50"
                  />
                }
              >
                <Avatar className="size-9 border-2 border-purple-200">
                  <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                  <AvatarFallback className="bg-purple-100 font-bold text-purple-700">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                  {user.name || "My Account"}
                </span>

                <ChevronDown className="size-4 text-gray-500" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-semibold">{user.name}</p>
                  <p className="truncate text-xs font-normal text-gray-500">
                    {user.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  render={<Link href="/profile" />}
                >
                  <UserRound className="mr-2 size-4" />
                  My Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={onLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

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
                {isLoggedIn && (
                  <div className="mb-3 flex items-center gap-3 rounded-xl bg-purple-50 p-3">
                    <Avatar className="size-11">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className="bg-purple-200 text-purple-800">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-purple-950">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive(link.href)
                          ? "bg-purple-100 text-purple-800"
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                      }`}
                    >
                      <Icon className="size-5" />
                      {link.name}
                    </Link>
                  );
                })}

                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-purple-50"
                    >
                      <UserRound className="size-5" />
                      My Profile
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setOpen(false);
                        onLogout?.();
                      }}
                      className="justify-start gap-3 px-4 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="size-5" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="mt-4 flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="border-purple-200 text-purple-700"
                      render={<Link href="/login" />}
                      nativeButton={false}
                      onClick={() => setOpen(false)}
                    >
                      <LogIn className="mr-2 size-4" />
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
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}