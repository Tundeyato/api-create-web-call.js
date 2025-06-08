// api/create-web-call.js
export default async function handler(req, res) {
  // Enable CORS for your frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { agent_id } = req.body;

    // Validate that agent_id is provided
    if (!agent_id) {
      return res.status(400).json({
        status: 'error',
        message: 'agent_b449a1bb0551cd01819e703188'
      });
    }

    // Call Retell's create-web-call API
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: agent_id
      })
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Retell API error:', errorData);
      return res.status(response.status).json({
        status: 'error',
        message: errorData.message
