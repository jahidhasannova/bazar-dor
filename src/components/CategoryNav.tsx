"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const CategoryNav = ({ navs }: { navs: Category[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-6 font-bold text-gray-800">
      <Link
        href="/"
        className={`transition-colors duration-200 hover:text-green-600 ${
          pathname === "/"
            ? "rounded-lg bg-green-100 px-3 py-2 text-green-700"
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
            className={`transition-colors duration-200 hover:text-green-600 ${
              isActive
                ? "rounded-lg bg-green-100 px-3 py-2 text-green-700"
                : ""
            }`}
          >
            {n.icon} {n.nameBn}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryNav;