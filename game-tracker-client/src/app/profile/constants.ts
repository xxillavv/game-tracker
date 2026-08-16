export const averageDotaGameTime = 0.7  // Середній час одної гри, для обрахунку середньої кількості годин в грі

export const rankNames: Record<number, string> = {
  1: "Herald",
  2: "Guardian",
  3: "Crusader",
  4: "Archon",
  5: "Legend",
  6: "Ancient",
  7: "Divine",
  8: "Immortal",
};

export const games = [
  {
    id: "dota2",
    name: "Dota 2",
    platform: "STEAM",
    placeholder: "Введіть ваш Dota 2 ID",
    hint: "Відкрийте Steam → профіль → URL містить ваш ID, або знайдіть Friend ID у клієнті Dota 2.",
    hintLink: "https://steamcommunity.com",
    comingSoon: false,
    icon: "🎮",
  },
  {
    id: "brawlstars",
    name: "Brawl Stars",
    platform: "SUPERCELL",
    placeholder: "Введіть ваш тег (#XXXXXXXX)",
    hint: "Відкрийте Brawl Stars → натисніть на профіль → тег під ніком.",
    comingSoon: true,
    icon: "⭐",
  },
  {
    id: "valorant",
    name: "Valorant",
    platform: "RIOT",
    placeholder: "Введіть Riot ID (Name#Tag)",
    hint: "Відкрийте Valorant → Riot ID у верхньому правому куті лобі.",
    comingSoon: true,
    icon: "🎯",
  },
];