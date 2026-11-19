# Freelance landing — сайты и Telegram Mini Apps

Продающий лендинг-визитка фрилансера-разработчика с двумя уровнями навигации (главная → категория → назад), RU/EN, админкой по секретной ссылке и деплоем через Docker + nginx + certbot.

## Стек

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- next-intl (RU / EN)
- Контент в `content.json` (редактирование через админку)

## Быстрый старт (локально)

```bash
cp .env.example .env.local
npm install
npm run generate:assets
npm run dev
```

Откройте [http://127.0.0.1:3847/ru](http://127.0.0.1:3847/ru).

Админка: `http://127.0.0.1:3847/<ADMIN_PATH>`  
Админка работает только если заданы сильные `ADMIN_PASSWORD` (≥12 символов) и `JWT_SECRET` (≥32 символов). Дефолтных паролей в коде нет.

## Переменные окружения

| Переменная | Описание |
|---|---|
| `TELEGRAM_USERNAME` | Основной Telegram username (без `@`) |
| `TELEGRAM_USERNAME_2` | Второй контакт (опционально, можно оставить пустым) |
| `ADMIN_PATH` | Секретный путь админки (обязателен для доступа к UI) |
| `ADMIN_PASSWORD` | Пароль админки, минимум 12 символов, без простых значений |
| `JWT_SECRET` | Секрет JWT-сессии, минимум 32 символа, отличный от пароля |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта (для SEO / OG) |

## Структура URL

- `/` → редирект на `/ru`
- `/ru`, `/en` — главная
- `/ru/sites`, `/en/sites` — подуслуги «Сайты»
- `/ru/bots`, `/en/bots` — подуслуги «Боты и Mini Apps»
- `/<ADMIN_PATH>` — админка (без ссылок из публичного UI)

## Админка

После входа можно редактировать:

- Hero (RU + EN)
- Карточки категорий на главной
- 5 шагов инструкции для покупателя
- Подуслуги на страницах категорий
- Текст блока «Оплата»
- Контакты (контакт 2 пуст по умолчанию → кнопка 2 дублирует контакт 1)
- Примеры работ (секция на сайте появляется только если есть хотя бы один пример)

Сохранение идёт в `POST /api/admin/content` и пишет `content.json` (+ файлы в `public/examples/`).

## Деплой на VPS (Docker + nginx + SSL)

1. Скопируйте проект на сервер, создайте `.env` из `.env.example` и задайте сильные `ADMIN_PASSWORD` / `JWT_SECRET` / `ADMIN_PATH`.
2. Укажите домен в `deploy/nginx.conf` и `NEXT_PUBLIC_SITE_URL`.
3. Первый выпуск сертификата (HTTP-only):

```bash
cp deploy/nginx.http-only.conf deploy/nginx.conf
# замените yourdomain.com на ваш домен в nginx.conf
docker compose up -d app nginx
docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d yourdomain.com -d www.yourdomain.com --email you@example.com --agree-tos --no-eff-email
```

4. Верните HTTPS-конфиг и перезапустите nginx:

```bash
# восстановите SSL-версию deploy/nginx.conf (с путями /etc/letsencrypt/...)
docker compose up -d nginx
```

5. Прод:

```bash
docker compose up -d --build
```

Тома:

- `content.json` — живой контент админки
- `public/examples` — загруженные картинки примеров
- `certbot/conf`, `certbot/www` — сертификаты Let’s Encrypt

## Скрипты

```bash
npm run dev              # http://0.0.0.0:3847
npm run build
npm run start
npm run generate:assets  # og.png + favicon
```

## Важно

- Цены на сайте не указываются — только «договорная» + предоплата 50% USDT.
- Форм обратной связи нет — только прямые ссылки на Telegram.
- Ссылок на админку в публичном UI нет.
