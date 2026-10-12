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
    <div className="w-full overflow-hidden border-y border-green-100 bg-green-50">
      <MarqueeText className="w-full" direction="right" duration={15}>
        {headlines.map((h) => (
          <span
            key={h.id}
            className="mx-1 inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-gray-700"
          >
            <span className="text-xl">{h.image}</span>

            <span>{h.nameBn}</span>

            <span className="font-bold text-green-700">
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
                  ? "text-green-600"
                  : h.change.dir === "down"
                    ? "text-red-600"
                    : "text-gray-500"
              }
            >
              {h.change.dir === "up"
                ? "▼"
                : h.change.dir === "down"
                  ? "▲"
                  : "—"}{" "}
              {Math.abs(h.change.pct).toLocaleString("bn-BD")}%
            </span>

            <div className="divider divider-horizontal mx-1"></div>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
