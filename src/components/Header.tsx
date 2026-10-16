import NavLinks from "./NavLinks";
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Userinfo from "./ Userinfo";

const HeaderDate = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {date}
    </p>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-2xl">
              🛒
            </div>

            <div className="flex flex-col">
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                বাজার দর
              </div>

              <Suspense fallback={<p className="text-sm text-gray-500">তারিখ লোড হচ্ছে...</p>}>
                <HeaderDate />
              </Suspense>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Userinfo></Userinfo>
          </div>

        </div>
      </div>

      <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>

      <div className="mx-auto max-w-7xl px-6 py-4">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-700 border-t-transparent dark:border-green-400 dark:border-t-transparent"></div>
              <span>ক্যাটাগরি লোড হচ্ছে...</span>
            </div>
          }
        >
          <NavLinks />
        </Suspense>
      </div>

      <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>
    </header>
  );
};

export default Header;