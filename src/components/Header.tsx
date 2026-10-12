import Image from "next/image";
import NavLinks from "./NavLinks";
import { Suspense } from "react";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-800 p-2 rounded-lg w-fit">
              <Image
                src="/logo-icon.png"
                alt="Logo"
                width={10}
                height={100}
                className="w-7 h-7 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <div className="text-3xl font-bold text-gray-800">বাজার দর</div>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-sm border border-green-700 px-5 py-2 font-medium text-green-700 transition-colors hover:bg-green-100">
              সাইন ইন
            </button>

            <button className="rounded-sm bg-green-700 px-5 py-2 font-medium text-white transition-colors hover:bg-green-800">
              সাইন আপ
            </button>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gray-200"></div>

      <div className="mx-auto max-w-7xl px-6 py-4">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 text-sm text-green-700">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-700 border-t-transparent"></div>
              <span>ক্যাটাগরি লোড হচ্ছে...</span>
            </div>
          }
        >
          <NavLinks />
        </Suspense>
      </div>

      <div className="h-px w-full bg-gray-200"></div>
    </header>
  );
};

export default Header;
