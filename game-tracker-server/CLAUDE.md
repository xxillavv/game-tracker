# Інструкції для AI-агента та контекст проєкту (Game Tracker Server)

`game-tracker-server` — це REST API бекенд платформи NEXUS.gg (статистика Dota 2, історія матчів, лідерборди, профілі користувачів). Клієнт — сусідній пакет `../game-tracker-client` (Next.js, порт `3000`), який ходить у цей API з `credentials: true`.

---

## 1. Технологічний стек та інструменти
- **Фреймворк:** NestJS 11, проєкт працює як **ES Modules** (`"type": "module"`, `module: nodenext`).
- **Мова:** TypeScript 5 (`strictNullChecks` увімкнено).
- **БД:** PostgreSQL через Prisma ORM 7.8 з драйвер-адаптером `@prisma/adapter-pg`.
  - Згенерований клієнт лежить у `generated/prisma` (не редагувати вручну).
  - Доступ до БД — тільки через `PrismaService` (`src/lib`), який є глобальним модулем.
- **Аутентифікація:** `@nestjs/jwt` (access-токен 15 хв) + refresh-сесії в таблиці `Sessions`, токени передаються в HTTP-only cookie (`cookie-parser`).
- **Валідація:** `class-validator` + `class-transformer` через глобальний `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`).
- **Зовнішні API:** OpenDota та Valve Web API через `@nestjs/axios` (`HttpService` + `firstValueFrom`).
- **Файли:** AWS S3 (`@aws-sdk/client-s3`) для аватарів, завантаження через `multer`.
- **Rate limiting:** `@nestjs/throttler`.
- **Тести:** Jest 30 + `@swc/jest`.

---

## 2. Команди
- `npm run start:dev` — dev-сервер з watch (`http://localhost:3001/api`).
- `npm run build` — збірка в `dist/`.
- `npm run lint` — ESLint з `--fix`.
- `npm run format` — Prettier.
- `npm test` — юніт-тести (запускаються через `--experimental-vm-modules`, бо ESM).
- `npx prisma migrate dev --name <назва>` — нова міграція.
- `npx prisma generate` — перегенерувати клієнт після зміни схеми.

---

## 3. Структура проєкту
- `src/main.ts` — bootstrap: CORS (`http://localhost:3000`), глобальний префікс `api`, `ValidationPipe`, `cookieParser`, `GlobalExceptionFilter`.
- `src/<feature>/` — фіч-модулі: `auth`, `users`, `connections`, `statistics`, `matches`, `leaderboard`. Кожен містить `*.module.ts`, `*.controller.ts`, `*.service.ts` та `*.spec.ts` для контролера і сервісу.
- `src/guards/auth.guard.ts` — `AuthGuard`, читає `accessToken` з cookie і кладе `request.user.userId`.
- `src/exceptionFilters/global.filter.ts` — глобальний фільтр помилок.
- `src/providers/` — сервіси-обгортки над зовнішніми API (наприклад, `DotaProvider`).
- `src/lib/` — `PrismaModule` / `PrismaService`.
- `utils/dto/` — DTO-класи з декораторами валідації (`<entity>.dto.ts`).
- `utils/types/` — спільні типи (`<entity>.types.ts`), напр. `TRequestWithUser`, відповіді зовнішніх API.
- `prisma/schema.prisma` + `prisma/migrations/` — схема та історія міграцій.

---

## 4. Архітектурні правила та обмеження (Constraints)
- **ESM-імпорти:** усі відносні імпорти обовʼязково із суфіксом `.js` (`import { X } from './x.service.js'`). Без цього збірка та тести падають.
- **Шари:**
  - Контролер — тонкий: тільки маршрут, guard'и, пайпи, DTO, виклик сервісу. Жодної бізнес-логіки чи запитів до БД.
  - Сервіс — бізнес-логіка та робота з `PrismaService`.
  - Зовнішні HTTP-запити — тільки через провайдери в `src/providers/`, не напряму з сервісів фіч.
- **Аутентифікація:** захищені ендпоінти позначаються `@UseGuards(AuthGuard)`, а id користувача береться з `request.user.userId` (тип `TRequestWithUser`). Ніколи не приймай `userId` поточного користувача з body/query.
- **Валідація вхідних даних:** тіло запиту — завжди DTO-клас з `utils/dto`; параметри шляху — через `ParseIntPipe` тощо.
- **Помилки:** кидай вбудовані `HttpException` NestJS (`NotFoundException`, `UnauthorizedException`, `ServiceUnavailableException`…) з коротким англомовним повідомленням, що закінчується крапкою. Помилки зовнішніх API мапляться в провайдері (404 → `NotFoundException`, решта → `ServiceUnavailableException`).
- **БД:**
  - Пов'язані операції запису (delete + create, sync) виконуй у `prisma.$transaction`.
  - У `select` повертай лише потрібні поля; ніколи не віддавай назовні `password` чи токени.
  - Зміни схеми — тільки через нову міграцію, старі міграції не редагувати.
  - Назви в схемі: моделі в PascalCase (множина), поля в camelCase з `@map("snake_case")`, таблиці через `@@map`.
- **Секрети:** беруться з `.env` (`DATABASE_URL`, `SECRET_KEY`, `PORT`, `AWS_*`). Не хардкодь і не логуй їх, не коміть `.env`.
- **Rate limiting:** для частих read-ендпоінтів (напр. `/me`, списки) використовуй `@SkipThrottle()`, sync-ендпоінти до зовнішніх API залишай під throttler'ом.
- **Контракт із клієнтом:** при зміні форми відповіді чи маршруту перевір відповідні типи в `../game-tracker-client/src/types/` та API-функції в `../game-tracker-client/src/api/`.

---

## 5. Стиль коду та угоди
- **Форматування:** Prettier (`singleQuote`, `trailingComma: all`). Перед завершенням задачі запускай `npm run lint`.
- **Назви файлів:** kebab/dot-case за конвенцією Nest — `matches.service.ts`, `auth.guard.ts`, `dota-api.service.ts`.
- **Типи:**
  - Типи-аліаси з префіксом `T` (`TRequestWithUser`), інтерфейси з префіксом `I` (`IDotaMatches`).
  - Нові спільні типи — в `utils/types/<entity>.types.ts`, DTO — в `utils/dto/<entity>.dto.ts`.
  - Уникай `any`; для відповідей зовнішніх API описуй інтерфейс.
- **DI:** залежності через `constructor(private readonly ...)`.

---

## 6. Тести
- Кожен новий контролер/сервіс супроводжується `*.spec.ts` поруч із файлом.
- Залежності мокаються через `Test.createTestingModule` + `overrideProvider(...).useValue(...)`; `AuthGuard` — через `.overrideGuard(AuthGuard).useValue({ canActivate: () => true })`.
- `PrismaService` і зовнішні провайдери в юніт-тестах завжди мокаються, реальних запитів до БД/API немає.
- Покривай як успішний сценарій, так і прокидання помилок (`NotFoundException` тощо).

---

## 7. Git
- Основна гілка — `develop`; фічі в гілках `feature/<назва>`.
- Conventional Commits: `feat(scope): ...`, `fix(scope): ...`, `refactor(scope): ...`.

---

## 8. Рекомендації для відповідей AI
- **Спершу план, потім код:** перед будь-якими змінами у файлах детально опиши, що саме плануєш змінити і в яких файлах (шлях до кожного файлу та суть змін у ньому), і спитай, чи приступати до роботи. Не змінюй жодного файлу, доки користувач явно не підтвердить.
- Генеруй готовий до продакшну код без заглушок і `TODO`.
- Дотримуйся існуючих патернів модулів (див. `src/matches/` як еталон).
- Якщо вимога нечітка, спершу запропонуй критерії приймання (Acceptance Criteria), а потім пиши великий блок коду.
- Спілкування з користувачем — українською; код, назви та повідомлення помилок API — англійською.
