import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: "kg" | "litre" | "dozen" | "piece";
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const headlines: Product[] = await res.json();

  return (
    <div className="my-0 w-full overflow-hidden border-y border-gray-200 bg-green-100 dark:border-gray-700 dark:bg-gray-800">
      <MarqueeText className="w-full" direction="right" duration={15}>
        {headlines.map((h) => (
          <span
            key={h.id}
            className="mx-1 inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <span className="text-xl">{h.image}</span>

            <span>{h.nameBn}</span>

            <span className="font-bold text-green-700 dark:text-green-400">
              {h.today.toLocaleString("bn-BD")} টাকা/
              {h.unit === "kg"
                ? "কেজি"
                : h.unit === "litre"
                  ? "লিটার"
                  : h.unit === "dozen"
                    ? "ডজন"
                    : "পিস"}
            </span>

            <span
              className={
                h.change.dir === "up"
                  ? "text-green-600 dark:text-green-400"
                  : h.change.dir === "down"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
              }
            >
              {h.change.dir === "up"
                ? "▼"
                : h.change.dir === "down"
                  ? "▲"
                  : "—"}{" "}
              {Math.abs(h.change.pct).toLocaleString("bn-BD")}%
            </span>

            <div className="divider divider-horizontal mx-1 dark:before:bg-gray-600 dark:after:bg-gray-600"></div>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
