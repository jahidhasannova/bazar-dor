import CategoryNav from "./CategoryNav";

interface Category {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  const data: Category[] = await res.json();

  return <CategoryNav navs={data} />;
};

export default NavLinks;