"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderNavigation = () => {
  const pageLinks = [
    {
      id: 1,
      href: "/",
      pathToCheck: "/",
      linkText: "Головна",
    },
    {
      id: 2,
      href: "/leaders?page=1",
      pathToCheck: "/leaders",
      linkText: "Лідери",
    },
    {
      id: 3,
      href: "/matches",
      pathToCheck: "/matches",
      linkText: "Матчі",
    },
  ];

  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-2">
      {pageLinks.map((el) => {
        return (
          <li
            className={
              el.pathToCheck === pathname
                ? "rounded-xl px-5 py-2.5 text-sm transition-al bg-dark-blue/60 ring-1 ring-turquoise/20 text-turquoise"
                : "rounded-xl px-5 py-2.5 text-sm text-white/60 transition-all hover:bg-dark-blue/40 hover:text-white"
            }
            key={el.id}
          >
            <Link href={el.href}>{el.linkText}</Link>
          </li>
        );
      })}
    </ul>
  );
};
