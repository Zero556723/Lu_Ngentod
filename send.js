export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()
  const { text } = req.body
  if (!text) return res.status(400).json({ success: false, error: "No text provided" })
  try {
    const r = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text,
        parse_mode: "HTML"
      })
    })
    if (r.ok) res.status(200).json({ success: true })
    else res.status(500).json({ success: false })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}