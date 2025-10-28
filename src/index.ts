import "dotenv/config";
import express from "express";
import ky from "ky";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "supersecret";

if (!BOT_TOKEN) {
  console.warn("⚠️ BOT_TOKEN пуст. Заполни его в .env");
}

const TG = ky.create({
  prefixUrl: `https://api.telegram.org/bot${BOT_TOKEN}`,
  retry: 0,
});

// --- Healthcheck
app.get("/", (_req, res) => res.send("OK"));

// --- Временный тест вызова TG API
app.get("/ping", async (_req, res) => {
  try {
    const info = await TG.get("getMe").json();
    res.json(info);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "tg error" });
  }
});

// --- Основной вебхук
app.post(`/webhook/${WEBHOOK_SECRET}`, async (req, res) => {
  // Безопасность: проверим секрет из заголовка (Telegram шлёт его, если мы задали secret_token в setWebhook)
  const incomingSecret = req.header("X-Telegram-Bot-Api-Secret-Token");
  if (incomingSecret !== WEBHOOK_SECRET) {
    // Логируем, но отвечаем 200, чтобы не было ретраев
    console.log("❌ Wrong secret header");
    return res.sendStatus(200);
  }

  const update = req.body;

  try {
    // Текстовые сообщения
    if (update.message) {
      const chatId = update.message.chat.id as number;
      const text: string = update.message.text || "";

      if (text === "/start") {
        // 1) Фото-баннер + inline-кнопки
        await TG.post("sendPhoto", {
          json: {
            chat_id: chatId,
            // Поставь свой баннер с публичным URL
            photo: "https://i.imgur.com/8Km9tLL.jpg",
            caption: "Привет! 👋\nЛежи, отдыхай — а мы майним тебе плюшки 😼",
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "▶️ Play",
                    url: "https://t.me/your_game_bot?start=ref123",
                  },
                ],
                [{ text: "⚡ Earn $CAPY", callback_data: "earn" }],
                [{ text: "❓ Help", url: "https://example.com/help" }],
              ],
            },
          },
        }).json();

        // 2) Нижняя клавиатура (reply)
        await TG.post("sendMessage", {
          json: {
            chat_id: chatId,
            text: "Выбирай действие ниже 👇",
            reply_markup: {
              keyboard: [[{ text: "Play game" }, { text: "Help" }]],
              resize_keyboard: true,
            },
          },
        }).json();
      } else if (/play game/i.test(text)) {
        await TG.post("sendMessage", {
          json: {
            chat_id: chatId,
            text: "Открывай игру 👉 https://t.me/your_game_bot?start=ref123",
          },
        }).json();
      } else if (/help/i.test(text)) {
        await TG.post("sendMessage", {
          json: {
            chat_id: chatId,
            text: "FAQ: https://example.com/help",
          },
        }).json();
      } else {
        await TG.post("sendMessage", {
          json: {
            chat_id: chatId,
            text: "Жми кнопки: Play / Earn / Help",
          },
        }).json();
      }
    }

    // Клики по inline-кнопкам
    if (update.callback_query) {
      const cq = update.callback_query;
      const chatId = cq.message.chat.id as number;

      // всплывающее уведомление на кнопку
      await TG.post("answerCallbackQuery", {
        json: { callback_query_id: cq.id, text: "Начинаем начисления…" },
      }).json();

      if (cq.data === "earn") {
        // Тут можно дернуть свой бэкенд
        await TG.post("sendMessage", {
          json: { chat_id: chatId, text: "✅ Запрос на Earn принят." },
        }).json();
      }
    }

    // Всегда быстро отвечаем 200
    res.sendStatus(200);
  } catch (e: any) {
    console.log("TG error:", e?.response?.body || e?.message);
    res.sendStatus(200);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`➡️  Webhook path: /webhook/${WEBHOOK_SECRET}`);
});
