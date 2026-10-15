
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Category {
    id: string;
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
    category?: string;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const formatNumber = (number: number) =>
    number.toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
    });

const getUnit = (unit: string) => {
    const units: Record<string, string> = {
        kg: "প্রতি কেজি",
        kilo: "প্রতি কেজি",
        kilogram: "প্রতি কেজি",
        kilograms: "প্রতি কেজি",
        liter: "প্রতি লিটার",
        litre: "প্রতি লিটার",
        liters: "প্রতি লিটার",
        litres: "প্রতি লিটার",
        l: "প্রতি লিটার",
        piece: "প্রতি পিস",
        pieces: "প্রতি পিস",
        pc: "প্রতি পিস",
        pcs: "প্রতি পিস",
        dozen: "প্রতি ডজন",
        gram: "প্রতি গ্রাম",
        grams: "প্রতি গ্রাম",
        g: "প্রতি গ্রাম",
        ml: "প্রতি মিলিলিটার",
        milliliter: "প্রতি মিলিলিটার",
        millilitre: "প্রতি মিলিলিটার",
        packet: "প্রতি প্যাকেট",
        pack: "প্রতি প্যাকেট",
        bottle: "প্রতি বোতল",
        bunch: "প্রতি আঁটি",
        pair: "প্রতি জোড়া",
    };

    const normalized = unit.trim().toLowerCase();

    return units[normalized] || `প্রতি ${unit}`;
};

const HomeButton = () => (
    <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500"
    >
        <span aria-hidden="true">⌂</span>
        হোম পেজে ফিরে যান
    </Link>
);

const ProductSkeleton = () => (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-start gap-3">
            <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200 dark:bg-gray-700" />

            <div className="flex-1 space-y-3 pt-2">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
            <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-6 w-28 rounded bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="h-8 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
    </div>
);

const CategoryPage = () => {
    const params = useParams<{ categoryId: string }>();
    const categoryId = params.categoryId;

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [sort, setSort] = useState("default");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [notFoundCategory, setNotFoundCategory] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                setNotFoundCategory(false);
                setCategory(null);
                setProducts([]);

                const [categoryRes, productRes] = await Promise.all([
                    fetch(
                        "https://api.abcz.workers.dev/api/bazardor/categories",
                        { signal: controller.signal },
                    ),
                    fetch(
                        `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
                        { signal: controller.signal },
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
                    setNotFoundCategory(true);
                    return;
                }

                if (!Array.isArray(productData)) {
                    throw new Error("Invalid product data");
                }

                setCategory(selectedCategory);
                setProducts(productData);
            } catch {
                if (!controller.signal.aborted) {
                    setError(true);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [categoryId]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "low-to-high") {
            return Number(a.today) - Number(b.today);
        }

        if (sort === "high-to-low") {
            return Number(b.today) - Number(a.today);
        }

        return 0;
    });

    const isOilCategory = ["tel", "oil"].includes(
        (category?.slug || "").trim().toLowerCase(),
    );

    if (loading) {
        return (
            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
                <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />

                        <div className="flex-1 space-y-3">
                            <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="h-3 w-56 max-w-full rounded bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-900">
                    <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                    <div className="h-10 w-48 max-w-[70%] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            </main>
        );
    }

    if (notFoundCategory) {
        return (
            <main className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
                <div className="text-6xl" aria-hidden="true">
                    🔎
                </div>

                <p className="mt-4 text-sm font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
                    Error 404
                </p>

                <h1 className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                    ক্যাটাগরি পাওয়া যায়নি
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-300">
                    দুঃখিত, এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি। সঠিক ক্যাটাগরি নির্বাচন করে আবার চেষ্টা করুন।
                </p>

                <div className="mt-6">
                    <HomeButton />
                </div>
            </main>
        );
    }

    if (error || !category) {
        return (
            <main className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
                <div className="text-5xl" aria-hidden="true">
                    ⚠️
                </div>

                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    তথ্য লোড করা যায়নি
                </h1>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        আবার চেষ্টা করুন
                    </button>

                    <HomeButton />
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="text-3xl" role="img" aria-label={category.nameBn}>
                            {category.icon}
                        </span>

                        <div className="min-w-0">
                            <h1 className="break-words text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {category.nameBn}
                            </h1>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-100">
                                {formatNumber(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
                            </p>
                        </div>
                    </div>

                    <HomeButton />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-900 sm:px-5">
                <span
                    className="text-2xl"
                    role="img"
                    aria-label="Sorting products"
                >
                    ↕️
                </span>

                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <label
                        htmlFor="sort"
                        className="shrink-0 font-semibold text-gray-700 dark:text-gray-200"
                    >
                        সাজান
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                        className="min-w-0 max-w-52 rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-700 outline-none focus:border-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 sm:px-3"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-to-high">
                            দাম: কম থেকে বেশি
                        </option>
                        <option value="high-to-low">
                            দাম: বেশি থেকে কম
                        </option>
                    </select>
                </div>
            </div>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-100">
                মোট {formatNumber(sortedProducts.length)} টি পণ্য দেখানো হচ্ছে
            </p>

            {sortedProducts.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => {
                        const unit = isOilCategory
                            ? "প্রতি লিটার"
                            : getUnit(product.unit || "");

                        const changeColor =
                            product.change.dir === "up"
                                ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                                : product.change.dir === "down"
                                  ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                                  : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400";

                        return (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="block rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-green-800"
                            >
                                <div className="flex min-h-16 items-start gap-3">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50/70 text-3xl dark:bg-green-950">
                                        {product.image || "🛒"}
                                    </div>

                                    <div className="min-w-0 flex-1 pt-1">
                                        <h2 className="break-words font-bold text-gray-900 dark:text-gray-100">
                                            {product.nameBn}
                                        </h2>

                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            {unit}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-end justify-between gap-2">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            আজকের দাম
                                        </p>

                                        <p className="mt-1 text-xl font-extrabold text-gray-900 dark:text-gray-100">
                                            {formatNumber(Number(product.today))}{" "}
                                            <span className="text-sm font-medium">
                                                টাকা
                                            </span>
                                        </p>
                                    </div>

                                    <div
                                        className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold ${changeColor}`}
                                    >
                                        <span>
                                            {product.change.dir === "up"
                                                ? "▲"
                                                : product.change.dir === "down"
                                                  ? "▼"
                                                  : "—"}
                                        </span>

                                        {formatNumber(
                                            Math.abs(product.change.pct),
                                        )}
                                        %
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
                    <div className="text-5xl" aria-hidden="true">
                        🛒
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                        এই ক্যাটাগরিতে কোনো পণ্য নেই
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        বর্তমানে এই ক্যাটাগরির কোনো পণ্যের তথ্য পাওয়া যায়নি।
                    </p>

                    <div className="mt-5">
                        <HomeButton />
                    </div>
                </div>
            )}
        </main>
    );
};

export default CategoryPage;
