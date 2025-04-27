export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const inputText = req.body.text;

  const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: inputText })
  });

  const data = await response.json();

  if (data.error) {
    return res.status(500).json({ error: data.error });
  }

  const summary = data[0]?.summary_text || "Summary could not be generated.";

  res.status(200).json({ summary });
}