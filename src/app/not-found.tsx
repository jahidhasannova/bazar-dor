import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12 transition-colors dark:bg-gray-950">
            <div className="w-full max-w-lg text-center">
                <div className="relative mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-green-100 dark:bg-green-950 sm:h-44 sm:w-44">
                    <div className="absolute inset-3 rounded-full border-2 border-dashed border-green-300 dark:border-green-800" />

                    <span className="text-6xl font-black tracking-tight text-green-700 dark:text-green-400 sm:text-7xl">
                        404
                    </span>
                </div>

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                    পৃষ্ঠা পাওয়া যায়নি
                </p>

                <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                    ওহ! কোথায় চলে এলেন?
                </h1>

                <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                    দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি খুঁজে পাওয়া যায়নি।
                    হয়তো ঠিকানাটি ভুল হয়েছে অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে।
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                    <span aria-hidden="true">⌂</span>
                    হোম পেজে ফিরে যান
                </Link>

                <div className="mt-10 border-t border-gray-200 pt-5 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>
            </div>
        </main>
    );
}
