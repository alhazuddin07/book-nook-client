"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    BookOpen,
    LockKeyhole,
    Eye,
    EyeOff,
    CheckCircle2,
    Circle,
    Mail,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";



export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const router = useRouter();

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasOneNumber = /[1-9]/.test(password);
    const hasMinLength = password.length >= 8;

    const handleLoginFrom = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as { email: string, password: string }

        const { data, error } = await authClient.signIn.email({
            ...userData,
        });

        if (data) {
            console.log(data);
            router.refresh();
            toast.add({
                type: "success",
                title: "Login Successful!",
                description: "You have login successfully.",
            });

            redirect('/');
        };

        if (error) {
            console.log(error);

            toast.add({
                type: "error",
                title: "Login Failed!",
                description: error.message || "Something went wrong. Please try again.",
            });
        }

    };

    const handleSignInSocial = async()=> {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f5f3ff] px-4 py-10 dark:bg-surface-muted">

            <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-xl md:grid-cols-2 dark:border-white/10 dark:bg-surface dark:shadow-black/40">

                {/* Left Side */}
                <div className="relative flex min-h-87.5 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-[#29216d] via-[#211957] to-[#160d32] px-8 py-12 text-center text-white md:min-h-162.5 md:items-start md:px-12 md:text-left">

                    {/* Background Decorations */}
                    <div className="absolute -left-16 -top-16 size-64 rounded-full border-35 border-white/5" />

                    <div className="absolute -bottom-20 -right-16 size-72 rounded-full border-45 border-white/5" />

                    <div className="absolute right-10 top-16 size-5 rotate-45 rounded bg-purple-400/20" />

                    <div className="absolute bottom-32 left-10 size-4 rounded-full bg-purple-400/20" />

                    {/* Content */}
                    <div className="relative z-10">

                        {/* Logo */}
                        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border border-purple-300/20 bg-purple-500/30 shadow-lg shadow-purple-500/20 md:mx-0">
                            <BookOpen className="size-11 text-purple-200" />
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                            Welcome Back!
                        </h1>

                        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-purple-100 md:mx-0 md:text-lg">
                            Login to continue your reading journey.
                        </p>

                        {/* Book Illustration */}
                        <div className="relative mt-12 flex h-40 items-center justify-center md:mt-16 md:h-48">

                            <div className="absolute bottom-3 h-5 w-64 rounded-[50%] bg-purple-950/60 blur-sm" />

                            <div className="relative flex items-center justify-center">

                                <div className="absolute -left-7 top-4 h-24 w-28 -rotate-12 rounded-lg border border-purple-200/30 bg-linear-to-br from-purple-100 to-purple-300 shadow-xl" />

                                <div className="absolute -right-7 top-4 h-24 w-28 rotate-12 rounded-lg border border-purple-200/30 bg-linear-to-br from-purple-100 to-purple-300 shadow-xl" />

                                <BookOpen className="relative z-10 size-36 text-[#d8c5ff] drop-shadow-[0_10px_12px_rgba(0,0,0,0.4)] md:size-44" />

                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="flex items-center justify-center bg-white px-5 py-10 sm:px-10 md:px-12 dark:bg-surface">

                    <div className="w-full max-w-md">

                        {/* Form Heading */}
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-extrabold text-[#160d32] md:text-4xl dark:text-ink">
                                Login
                            </h2>

                            <p className="mt-2 text-sm text-gray-500 dark:text-ink-soft">
                                Fill in the details to Login
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLoginFrom} className="space-y-4">

                            {/** Email */}
                            <div>
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-ink-soft">
                                    Email
                                </Label>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-purple-500" />

                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        autoComplete="email"
                                        className="h-12 rounded-lg border-purple-100 bg-[#fafaff] pl-12 shadow-sm focus-visible:border-purple-500 focus-visible:ring-purple-200 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <LockKeyhole className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500 dark:text-ink-muted" />

                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 border-purple-100 bg-[#fafaff] pl-12 pr-12 shadow-sm focus-visible:border-purple-500 focus-visible:ring-purple-200 dark:border-white/10 dark:bg-surface-raised dark:text-ink dark:placeholder:text-ink-muted"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-purple-700 dark:text-ink-muted dark:hover:text-brand"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5" />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password Requirements */}
                            <div className="space-y-2 px-1 pt-1">

                                <div className="flex items-center gap-2 text-sm">
                                    {hasUppercase ? (
                                        <CheckCircle2 className="size-4 text-green-600" />
                                    ) : (
                                        <Circle className="size-4 text-gray-400 dark:text-ink-muted" />
                                    )}

                                    <span className={hasUppercase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-ink-soft"}>
                                        Must have an Uppercase letter
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    {hasLowercase ? (
                                        <CheckCircle2 className="size-4 text-green-600" />
                                    ) : (
                                        <Circle className="size-4 text-gray-400 dark:text-ink-muted" />
                                    )}

                                    <span className={hasLowercase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-ink-soft"}>
                                        Must have a Lowercase letter
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    {hasOneNumber ? (
                                        <CheckCircle2 className="size-4 text-green-600" />
                                    ) : (
                                        <Circle className="size-4 text-gray-400 dark:text-ink-muted" />
                                    )}

                                    <span className={hasOneNumber ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-ink-soft"}>
                                        Must have a one nmber
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    {hasMinLength ? (
                                        <CheckCircle2 className="size-4 text-green-600" />
                                    ) : (
                                        <Circle className="size-4 text-gray-400 dark:text-ink-muted" />
                                    )}

                                    <span className={hasMinLength ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-ink-soft"}>
                                        At least 8 characters
                                    </span>
                                </div>

                            </div>

                            {/* LogIn Button */}
                            <Button
                                type="submit"
                                disabled={!hasUppercase || !hasLowercase || !hasMinLength || !hasOneNumber}
                                className="mt-5 h-12 w-full rounded-lg bg-linear-to-r from-[#5944cf] to-[#4935b8] text-base font-semibold text-white shadow-md shadow-purple-200 transition hover:from-[#4935b8] hover:to-[#3925a5] dark:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Login
                            </Button>

                        </form>

                        <div className="space-y-5 mt-5">

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-border" />

                                <span className="text-xs font-medium tracking-widest text-muted-foreground">
                                    OR CONTINUE WITH
                                </span>

                                <div className="h-px flex-1 bg-border" />
                            </div>

                            {/* Google Button */}
                            <Button
                                onClick={handleSignInSocial}
                                type="button"
                                variant="outline"
                                className="
                                  group h-12 w-full gap-3 rounded-xl
                                  border border-border
                                  bg-card text-foreground
                                  font-semibold shadow-sm
                                  transition-all duration-300
                                  hover:border-brand
                                  hover:bg-brand-soft
                                  hover:text-brand
                                  hover:shadow-md
                                "
                            >
                                <FcGoogle className="size-5 transition-transform duration-300 group-hover:scale-110" />

                                Continue with Google
                            </Button>

                        </div>

                        {/* Login Link */}
                        <div className="mt-8 text-center dark:text-ink-soft">
                            <p className="text-sm text-gray-600 dark:text-ink-soft">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-purple-700 transition hover:text-purple-900 hover:underline dark:text-brand dark:hover:text-brand-ink"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};