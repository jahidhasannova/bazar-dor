
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const CategoryNav = ({ navs }: { navs: Category[] }) => {
    const pathname = usePathname();

    return (
        <nav className="w-full px-2 py-2">
            <div className="flex flex-wrap items-center justify-center gap-2 font-bold text-gray-800 sm:gap-3 dark:text-gray-100">
                <Link
                    href="/"
                    className={`rounded-lg px-2 py-2 text-sm transition-colors duration-200 hover:text-green-600 sm:px-3 sm:text-base ${
                        pathname === "/"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : ""
                    }`}
                >
                    🛒 বাজার
                </Link>

                {navs.map((n) => {
                    const isActive = pathname === `/category/${n.slug}`;

                    return (
                        <Link
                            key={n.id}
                            href={`/category/${n.slug}`}
                            className={`rounded-lg px-2 py-2 text-sm transition-colors duration-200 hover:text-green-600 sm:px-3 sm:text-base ${
                                isActive
                                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                    : ""
                            }`}
                        >
                            {n.icon} {n.nameBn}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default CategoryNav;
