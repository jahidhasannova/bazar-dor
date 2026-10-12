import Image from "next/image";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 md:grid-cols-2 lg:p-10">
        <div>
          <p className="mb-4 w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            {date}
          </p>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-800 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mb-6 max-w-xl text-base leading-8 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম জানুন এক জায়গায়।
            বাজারভিত্তিক গড়, সর্বনিম্ন ও সর্বোচ্চ দাম এবং দামের পরিবর্তন দেখুন
            সহজেই।
          </p>

          <button className="inline-flex items-center gap-3 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-md shadow-green-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg hover:shadow-green-700/30 active:translate-y-0">
            সব পণ্য দেখুন ↓
          </button>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={600}
            height={400}
            priority
            className="h-64 w-full rounded-xl object-contain sm:h-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
