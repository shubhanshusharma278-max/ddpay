export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const body = req.body;
  if (body && body.message) {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: body.message.chat.id,
        text: `DD Pay: Bot connect ho gaya! Welcome 🚀`
      })
    });
  }
  res.status(200).json({ ok: true });
}
