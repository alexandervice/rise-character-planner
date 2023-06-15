const apiKey = process.env.CHAT_GPT_API_KEY;

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-7SIWOUnZ18FQbvUshQPa3SG6",
    apiKey: CHAT_GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

// Configure OpenAI API client
const openaiClient = new openai.OpenAIApi(apiKey);

// Route handler for /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Send the message to ChatGPT using the OpenAI API
    const response = await openaiClient.chatCompletion({
      messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message }],
    });

    // Extract the generated reply from the OpenAI API response
    const reply = response.choices[0].message.content;

    // Send the reply back to the React frontend
    res.json({ reply });
  } catch (error) {
    // Handle errors, such as sending an error response to the frontend
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});