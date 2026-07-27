import { Gamepad2, FolderGit2, MessageCircle, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";

const NAV_SECTIONS = [
  {
    title: "Платформа",
    links: [
      { label: "Дашборд", href: "/dashboard" },
      { label: "Лідери", href: "/leaders" },
      { label: "Матчі", href: "/matches" },
      { label: "Статистика", href: "/stats" },
    ],
  },
  {
    title: "Ресурси",
    links: [
      { label: "Документація", href: "/docs" },
      { label: "API", href: "/api" },
      { label: "Блог", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Підтримка",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Зворотній зв'язок", href: "/feedback" },
      { label: "Правила", href: "/terms" },
      { label: "Конфіденційність", href: "/privacy" },
    ],
  },
];

const SOCIALS = [
  { icon: FolderGit2, href: "https://github.com", label: "GitHub" },
  { icon: MessageSquare, href: "https://twitter.com", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 font-mono">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="flex w-fit items-center text-xl font-semibold tracking-wide text-white transition-opacity hover:opacity-80"
            >
              <span className="mr-2 rounded-xl bg-turquoise p-1.5">
                <Zap color="black" />
              </span>
              NEXUS<span className="text-turquoise">.gg</span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              Відстежуй свій прогрес, аналізуй матчі та змагайся з найкращими
              гравцями. Твій шлях до вершини починається тут.
            </p>

            {/* Game badge */}
            <div className="flex w-fit items-center gap-2 rounded-xl bg-dark-blue/60 px-3.5 py-2 ring-1 ring-white/5">
              <Gamepad2 className="size-4 text-turquoise" />
              <span className="text-xs text-white/50">
                Dota 2 • CS2 • Valorant
              </span>
            </div>

            {/* Social links */}
            <div className="mt-1 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-xl bg-dark-blue/60 p-2.5 text-white/40 ring-1 ring-white/5 transition-all hover:text-turquoise hover:ring-turquoise/20"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-turquoise"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} NEXUS.gg — Усі права захищено.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/25">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-turquoise opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-turquoise" />
            </span>
            Всі системи працюють
          </div>
        </div>
      </div>
    </footer>
  );
}
