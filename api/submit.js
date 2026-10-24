module.exports = async (req, res) => {
    // CORS headers taaki website se request block na ho
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    // Yahan apna Token aur Chat ID daalein (quotes ke andar)
    const BOT_TOKEN = '8634684029:AAEgqjR0BZtmXCmXeZZktun9pa0IwXWP-tU'
    const CHAT_ID = '8634684029' 

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ error: data.description });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
