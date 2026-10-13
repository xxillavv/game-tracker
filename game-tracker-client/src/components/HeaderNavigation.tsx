"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IHeaderNavigationProps } from "@/types/navigation.types";

export const HeaderNavigation = ({
  variant = "row",
  onNavigate,
}: IHeaderNavigationProps) => {
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
    <ul
      className={
        variant === "column"
          ? "flex flex-col gap-1"
          : "flex items-center gap-1 lg:gap-2"
      }
    >
      {pageLinks.map((el) => {
        return (
          <li
            className={
              el.pathToCheck === pathname
                ? "rounded-xl text-sm transition-all bg-dark-blue/60 ring-1 ring-turquoise/20 text-turquoise"
                : "rounded-xl text-sm text-white/60 transition-all hover:bg-dark-blue/40 hover:text-white"
            }
            key={el.id}
          >
            <Link
              href={el.href}
              onClick={onNavigate}
              className={`block py-2.5 ${variant === "column" ? "px-4" : "px-3 lg:px-5"}`}
            >
              {el.linkText}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
