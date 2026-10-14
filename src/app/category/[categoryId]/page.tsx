"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Category {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const formatNumber = (number: number) =>
  number.toLocaleString("bn-BD", { maximumFractionDigits: 1 });

const getUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    l: "প্রতি লিটার",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    gram: "প্রতি গ্রাম",
    g: "প্রতি গ্রাম",
    ml: "প্রতি মিলিলিটার",
  };

  return units[unit.trim().toLowerCase()] || `প্রতি ${unit}`;
};

const CategoryPage = () => {
  const params = useParams<{ categoryId: string }>();
  const categoryId = params.categoryId;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [categoryRes, productRes] = await Promise.all([
          fetch("https://api.abcz.workers.dev/api/bazardor/categories"),
          fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
          ),
        ]);

        if (!categoryRes.ok || !productRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categories: Category[] = await categoryRes.json();
        const productData: Product[] = await productRes.json();

        const selectedCategory = categories.find(
          (item) => item.slug === categoryId,
        );

        if (!selectedCategory) {
          setError(true);
          return;
        }

        setCategory(selectedCategory);
        setProducts(productData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.today);
    const priceB = Number(b.today);

    if (sort === "low-to-high") {
      return priceA - priceB;
    }

    if (sort === "high-to-low") {
      return priceB - priceA;
    }

    return 0;
  });

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-gray-500">পণ্যের তথ্য লোড করা যায়নি।</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {category.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {formatNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4">
        <label htmlFor="sort" className="font-semibold text-gray-700">
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="max-w-52 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        মোট {formatNumber(sortedProducts.length)} টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex min-h-16 items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50/50 text-3xl">
                  {product.image}
                </div>

                <div className="min-w-0 pt-1">
                  <h2 className="break-words font-bold text-gray-800">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {getUnit(product.unit)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>

                  <p className="mt-1 text-xl font-extrabold text-gray-800">
                    {formatNumber(Number(product.today))}{" "}
                    <span className="text-sm font-medium">টাকা</span>
                  </p>
                </div>

                <div
                  className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold ${
                    product.change.dir === "up"
                      ? "bg-red-50 text-red-600"
                      : product.change.dir === "down"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "— o."}
                  {formatNumber(Math.abs(product.change.pct))}%
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
};

export default CategoryPage;
