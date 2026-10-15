import Link from "next/link";

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-green-100 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="flex flex-col items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl transition-transform duration-200 hover:scale-105"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-2xl shadow-md shadow-green-700/20">
                            🛒
                        </span>

                        <span className="text-2xl font-extrabold tracking-tight text-green-800 dark:text-green-400">
                            বাজার দর
                        </span>
                    </Link>

                    <div className="mt-5 flex w-full flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <p className="text-center text-sm font-medium leading-7 text-gray-700 dark:text-gray-300 sm:text-left sm:text-base">
                            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                        </p>

                        <p className="text-center text-xs leading-6 text-gray-500 dark:text-gray-400 sm:max-w-xl sm:text-right sm:text-sm">
                            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-5 text-center dark:border-gray-800">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-green-700 transition-colors hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                    >
                        🏠 হোম পেজ
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
