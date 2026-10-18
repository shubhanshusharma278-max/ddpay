export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }
  try {
    const { name, phone, amount, utr } = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log('Body:', req.body);
    console.log('Token exists:', !!token, 'ChatId:', chatId);

    const text = `🔥 New DD Pay\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💰 Amount: ${amount}\n🏦 UTR: ${utr}`;

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text }),
    });

    const result = await tg.json();
    console.log('Telegram result:', result);
    
    if (!result.ok) {
      return res.status(500).json(result);
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log('Error:', e.message);
    return res.status(500).json({ error: e.message });
  }
}
