import Link from "next/link";

type Product = {
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
};

const formatNumber = (number: number) =>
    number.toLocaleString("bn-BD", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

const getUnit = (unit: string, category?: string) => {
    const normalizedCategory = (category || "").trim().toLowerCase();

    if (["tel", "oil"].includes(normalizedCategory)) {
        return "প্রতি লিটার";
    }

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
    };

    const normalizedUnit = unit.trim().toLowerCase();

    return units[normalizedUnit] || `প্রতি ${unit}`;
};

const ProductCard = ({ product }: { product: Product }) => {
    const changeColor =
        product.change.dir === "up"
            ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
            : product.change.dir === "down"
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300";
    const changeIcon =
        product.change.dir === "up"
            ? "▲"
            : product.change.dir === "down"
                ? "▼"
                : "—";

    return (
        <Link
            href={`/product/${product.id}`}
            className="block rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-700"
        >
            <div className="flex min-h-16 items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50/70 text-3xl dark:bg-green-950/50">
                    {product.image || "🛒"}
                </div>

                <div className="min-w-0 flex-1 pt-1">
                    <h3 className="break-words text-base font-bold text-gray-800 dark:text-gray-100">
                        {product.nameBn}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {getUnit(product.unit || "", product.category)}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-end justify-between gap-2">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        আজকের দাম
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-gray-800 dark:text-gray-100">
                        {product.today.toLocaleString("bn-BD", {
                            maximumFractionDigits: 2,
                        })}{" "}
                        <span className="text-sm font-medium">টাকা</span>
                    </p>
                </div>

                <div
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold ${changeColor}`}
                >
                    <span>{changeIcon}</span>
                    {formatNumber(Math.abs(product.change.pct))}%
                </div>
            </div>
        </Link>
    );
};

const ProductSection = ({
    title,
    icon,
    products,
}: {
    title: string;
    icon: "▲" | "▼";
    products: Product[];
}) => (
    <section className="py-6">
        <h2 className="ml-5 flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-100">
            <span
                className={
                    icon === "▲"
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-700 dark:text-green-400"
                        
                }
            >
                {icon}
            </span>

            {title}
        </h2>

        {products.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <p className="ml-5 mt-4 text-sm text-gray-500 dark:text-gray-400">
                এই মুহূর্তে কোনো পণ্য নেই।
            </p>
        )}
    </section>
);

const AllProduct = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
    );

    if (!res.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি");
    }

    const products: Product[] = await res.json();

    const increasedProducts = products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const decreasedProducts = products
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    return (
        <div>
            <ProductSection
                title="আজ দাম বেড়েছে"
                icon="▲"
                products={increasedProducts}
            />

            <ProductSection
                title="আজ দাম কমেছে"
                icon="▼"
                products={decreasedProducts}
            />

            <section id="সব-পণ্য" className="scroll-mt-32 py-6">
                <h2 className="ml-5 text-xl font-bold text-gray-800 dark:text-gray-100">
                    সব পণ্য
                </h2>

                <p className="ml-5 mt-2 text-sm text-gray-500 dark:text-gray-800">
                    মোট {products.length.toLocaleString("bn-BD")}টি পণ্যের
                    আজকের দাম ও পরিবর্তন
                </p>

                {products.length > 0 ? (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="ml-5 mt-4 text-sm text-gray-500 dark:text-gray-400">
                        বর্তমানে কোনো পণ্যের তথ্য পাওয়া যায়নি।
                    </p>
                )}
            </section>
        </div>
    );
};

export default AllProduct;
