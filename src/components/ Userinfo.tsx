"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";

const Userinfo = () => {
    const { data: session } = authClient.useSession();
    const [isOpen, setIsOpen] = useState(false);

    const user = session?.user;

    const handelSingOut = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error("সাইন আউট করা যায়নি!");
            return;
        }

        setIsOpen(false);
        toast.success("সফলভাবে সাইন আউট হয়েছে!");
    };

    return (
        <div>
            {user ? (
                <div className="relative ml-1 sm:ml-0">
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-green-50 dark:hover:bg-gray-800"
                    >
                        <div className="avatar shrink-0">
                            <div className="w-8 rounded-full ring-1 ring-green-500 ring-offset-1 ring-offset-green-50 dark:ring-offset-gray-900">
                                <img
                                    alt="Profile Avatar"
                                    src={user.image || "/default-avatar.png"}
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                        <span className="max-w-36 truncate text-xs font-semibold text-gray-800 dark:text-gray-100">
                            {user.name}
                        </span>

                        <svg
                            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                            <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-700">
                                <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                                    {user.name}
                                </p>

                                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-green-400"
                            >
                                <svg
                                    className="h-4 w-4 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M5 21a7 7 0 0 1 14 0" />
                                </svg>

                                My Profile
                            </Link>

                            <button
                                type="button"
                                onClick={handelSingOut}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                            >
                                <svg
                                    className="h-4 w-4 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                    <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                                </svg>

                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (

                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                    <Link href="/signin">
                        <button className="rounded-sm border border-green-700 px-2.5 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 dark:text-green-400 dark:hover:bg-gray-800 sm:px-5 sm:py-2 sm:text-base">
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/signup">
                        <button className="rounded-sm bg-green-700 px-2.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-800 sm:px-5 sm:py-2 sm:text-base">
                            সাইন আপ
                        </button>
                    </Link>
                </div>

            )}
        </div>
    );
};

export default Userinfo;