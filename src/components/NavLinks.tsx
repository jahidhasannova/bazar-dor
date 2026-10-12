import Link from "next/link";
import React from "react";

interface Category {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data: Category[] = await res.json();

  console.log(data);

  const navs = data;

  return (
    <div className="flex items-center text-gray-800 gap-6 font-bold">
      {navs.map((n) => (
        <Link
          className="transition-colors duration-200 hover:text-green-600"
          key={n.id}
          href={`/category/${n.slug}`}
        >
          {n.icon} {n.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
