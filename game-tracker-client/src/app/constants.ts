import { FolderGit2, MessageCircle, MessageSquare } from "lucide-react";

export const footerNavigationSections = [
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

export const footerSocials = [
  { icon: FolderGit2, href: "https://github.com", label: "GitHub" },
  { icon: MessageSquare, href: "https://twitter.com", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
];