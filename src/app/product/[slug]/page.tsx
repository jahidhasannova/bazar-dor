
import Link from "next/link";

type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
    avg?: number;
};

type Product = {
    id: number;
    nameBn: string;
    unit: string;
    image: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    category?: string;
    categoryBn?: string;
    markets?: Market[];
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

const categoryNames: Record<string, string> = {
    rice: "চাল",
    chaal: "চাল",
    chal: "চাল",

    mach: "মাছ",
    mangsho: "মাংস",
    mosla: "মসলা",

    tel: "তেল",
    oil: "তেল",
    "soybean-oil": "সয়াবিন তেল",
    soybean_oil: "সয়াবিন তেল",
    "palm-oil": "পাম তেল",
    palm_oil: "পাম তেল",
    "mustard-oil": "সরিষার তেল",
    mustard_oil: "সরিষার তেল",
    dal: "ডাল",
    lentil: "ডাল",
    fish: "মাছ",
    meat: "মাংস",
    vegetable: "সবজি",
    vegetables: "সবজি",
    sobji: "সবজি",
    fruit: "ফলমূল",
    fruits: "ফলমূল",
    spice: "মসলা",
    spices: "মসলা",
    eggs: "ডিম",
    egg: "ডিম",
    milk: "দুধ",
    "dim-dui": "ডিম-দুধ",
    dim_dui: "ডিম-দুধ",
    onion: "পেঁয়াজ",
    potato: "আলু",
    tomato: "টমেটো",
    chicken: "মুরগি",
    beef: "গরুর মাংস",
    sugar: "চিনি",
    salt: "লবণ",
    flour: "আটা",
    wheat: "গম",
    garlic: "রসুন",
    ginger: "আদা",
    chili: "মরিচ",
    chilli: "মরিচ",
    cucumber: "শসা",
    carrot: "গাজর",
    banana: "কলা",
    apple: "আপেল",
    orange: "কমলা",
};

const formatNumber = (number: number) =>
    number.toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
    });

const getUnit = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        kilo: "কেজি",
        kilogram: "কেজি",
        kilograms: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        liters: "লিটার",
        litres: "লিটার",
        l: "লিটার",
        piece: "পিস",
        pieces: "পিস",
        pc: "পিস",
        pcs: "পিস",
        dozen: "ডজন",
        gram: "গ্রাম",
        grams: "গ্রাম",
        g: "গ্রাম",
        ml: "মিলিলিটার",
        milliliter: "মিলিলিটার",
        millilitre: "মিলিলিটার",
        packet: "প্যাকেট",
        pack: "প্যাকেট",
        bottle: "বোতল",
        bunch: "আঁটি",
        pair: "জোড়া",
    };

    const normalized = unit.trim().toLowerCase();

    return units[normalized] || unit;
};

const getCategoryName = (value?: string) => {
    if (!value) return "";

    const normalized = value.trim().toLowerCase();

    return (
        categoryNames[normalized] ||
        categoryNames[normalized.replace(/-/g, "_")] ||
        value
    );
};

const ProductDetailsPage = async ({ params }: PageProps) => {
    const { slug } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products/${encodeURIComponent(slug)}`,
        { cache: "no-store" },
    );

    if (!res.ok) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
                <section className="w-full max-w-lg rounded-3xl border border-green-100 bg-white px-6 py-10 text-center shadow-lg shadow-green-100/50 dark:border-gray-700 dark:bg-gray-900 dark:shadow-none sm:px-10">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-5xl dark:bg-green-950">
                        🛒
                    </div>

                    <p className="mt-6 text-sm font-bold tracking-widest text-green-700 dark:text-green-400">
                        404 · পণ্য পাওয়া যায়নি
                    </p>

                    <h1 className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl">
                        দুঃখিত! পণ্যটি খুঁজে পাওয়া যায়নি
                    </h1>

                    <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-300">
                        পণ্যের লিংকটি ভুল হতে পারে অথবা পণ্যটি বর্তমানে উপলব্ধ নেই।
                        অনুগ্রহ করে হোম পেজ থেকে আপনার পছন্দের পণ্যটি খুঁজে নিন।
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900"
                        >
                            <span>⌂</span>
                            হোম পেজে ফিরে যান
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            পণ্য খুঁজুন
                        </Link>
                    </div>

                    <p className="mt-8 text-xs text-gray-400">
                        বাজার দর · প্রতিদিনের বাজারদর জানুন
                    </p>
                </section>
            </main>
        );
    }

    const product: Product = await res.json();

    const markets = Array.isArray(product.markets)
        ? product.markets.filter(
              (market) =>
                  typeof market.market === "string" &&
                  typeof market.division === "string" &&
                  Number.isFinite(market.min) &&
                  Number.isFinite(market.max),
          )
        : [];

    const normalizedCategory = (product.category || "").trim().toLowerCase();

    const unit = ["tel", "oil"].includes(normalizedCategory)
        ? "লিটার"
        : getUnit(product.unit || "");

    const category =
        getCategoryName(product.categoryBn || product.category) || "বাজারদর";

    const categorySlug = (product.category || product.categoryBn || "")
        .trim()
        .toLowerCase();

    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const changeColor = isUp
        ? "text-red-600 dark:text-red-400"
        : isDown
          ? "text-green-700 dark:text-green-400"
          : "text-gray-500 dark:text-gray-400";

    const changeAmount =
        product.change.dir === "flat"
            ? 0
            : (product.today * Math.abs(product.change.pct)) /
              (100 + (isUp ? product.change.pct : -product.change.pct));

    const changeText = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত";

    const getMarketAverage = (market: Market) =>
        market.avg ?? (market.min + market.max) / 2;

    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : 0;

    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : 0;

    const averagePrice =
        markets.length > 0
            ? markets.reduce(
                  (total, market) => total + getMarketAverage(market),
                  0,
              ) / markets.length
            : 0;

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
    <Link
        href="/"
        className="text-gray-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
    >
        হোম
    </Link>

    <span>›</span>

    <Link
        href={`/category/${categorySlug}`}
        className="text-gray-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
    >
        {category}
    </Link>

    <span>›</span>

    <span className="font-semibold text-gray-900 dark:text-green-400">
        {product.nameBn}
    </span>
</nav>

            <section className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_112px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_160px] sm:gap-6">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl dark:bg-green-950 sm:h-16 sm:w-16 sm:text-4xl">
                            {product.image || "🛒"}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h1 className="break-words text-lg font-extrabold leading-7 text-gray-900 dark:text-gray-100 sm:text-2xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                প্রতি {unit} · {category}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-gray-700 dark:text-gray-300 sm:text-sm">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className={`font-bold ${changeColor}`}>
                                    {changeText}
                                </span>{" "}
                                {formatNumber(changeAmount)} টাকা
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-xl border border-green-100 bg-green-50 px-2 py-2 text-center dark:border-green-900 dark:bg-green-950 sm:px-3 sm:py-3">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            আজকের দাম
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-black dark:text-white">
                            {formatNumber(product.today)}
                        </p>

                        <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">
                            টাকা / {unit}
                        </p>

                        <div
                            className={`mt-2 flex items-center gap-1 font-bold ${changeColor}`}
                        >
                            <span className="text-sm">
                                {isUp ? "▲" : isDown ? "▼" : "—"}
                            </span>

                            <span className="text-sm text-black dark:text-white">
                                {formatNumber(Math.abs(product.change.pct))}%
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        দামের সারসংক্ষেপ
                    </h2>

                    {markets.length > 0 ? (
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    সর্বনিম্ন দাম
                                </p>

                                <p className="mt-2 text-2xl font-bold text-green-700 dark:text-green-400">
                                    {formatNumber(minPrice)} টাকা
                                </p>

                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                    সবচেয়ে কম দামের বাজার
                                </p>
                            </div>

                            <div className="rounded-xl bg-red-50 p-4 dark:bg-red-950">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    সর্বাধিক দাম
                                </p>

                                <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                                    {formatNumber(maxPrice)} টাকা
                                </p>

                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                    সবচেয়ে বেশি দামের বাজার
                                </p>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    গড় দাম
                                </p>

                                <p className="mt-2 text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    {formatNumber(averagePrice)} টাকা
                                </p>

                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    প্রতি {unit}-এর হিসাবে
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            এই পণ্যের বাজারভিত্তিক দামের তথ্য API-তে পাওয়া যায়নি।
                        </p>
                    )}
                </div>

                <div className="mt-8 pt-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    {markets.length > 0 ? (
                        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 sm:rounded-2xl">
                            <table className="w-full min-w-[620px] text-left text-sm">
                                <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                    <tr>
                                        <th className="px-4 py-3">বাজার</th>
                                        <th className="px-4 py-3">বিভাগ</th>
                                        <th className="px-4 py-3">সর্বনিম্ন</th>
                                        <th className="px-4 py-3">সর্বাধিক</th>
                                        <th className="px-4 py-3">গড়</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {markets.map((market, index) => (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className={`border-t border-gray-300 transition-colors hover:bg-green-300 dark:border-gray-700 dark:hover:bg-green-950 ${
                                                index % 2 === 0
                                                    ? "bg-white dark:bg-gray-900"
                                                    : "bg-green-50 dark:bg-gray-800"
                                            }`}
                                        >
                                            <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100">
                                                {market.market}
                                            </td>

                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                                {market.division}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-3 text-gray-800 dark:text-gray-200">
                                                {formatNumber(market.min)} টাকা
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-3 text-gray-800 dark:text-gray-200">
                                                {formatNumber(market.max)} টাকা
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-3 text-gray-800 dark:text-gray-200">
                                                {formatNumber(
                                                    getMarketAverage(market),
                                                )}{" "}
                                                টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            বাজারের তালিকা দেখানোর মতো তথ্য পাওয়া যায়নি।
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ProductDetailsPage;
