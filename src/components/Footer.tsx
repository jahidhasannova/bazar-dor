const Footer = () => {
  return (
    <footer className="mt-16 border-t border-green-100 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 sm:text-left">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400 sm:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
