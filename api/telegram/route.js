// app/api/telegram/route.js
export async function POST(req) {
  const { message } = await req.json();

  const BOT_TOKEN = process.env.BOT_TOKEN; // Vercel me add karna
  const CHAT_ID = process.env.CHAT_ID;

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: `🔔 New Entry from DDPay:\n\n${message}`,
      parse_mode: 'HTML'
    })
  });

  return Response.json({ success: true });
}
