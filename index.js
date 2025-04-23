require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST endpoint for grocery list
app.post('/api/groceries', async (req, res) => {
  const { groceryList } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not set.' });
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Find the best current UK grocery prices for the following items. List each item, the best price you can find, and the store. Items: ${groceryList}`;

  console.log('Received grocery list:', groceryList);
  console.log('Using Gemini model: gemini-2.0-flash');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [prompt],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    console.log('Gemini raw response:', JSON.stringify(response, null, 2));

    // Extract answer and grounding metadata
    const answer = response.text || (response.candidates && response.candidates[0].content.parts[0].text);
    const groundingMetadata = response.candidates && response.candidates[0].groundingMetadata;
    console.log('Extracted answer:', answer);
    console.log('Grounding metadata:', JSON.stringify(groundingMetadata, null, 2));
    res.json({ answer, groundingMetadata });
  } catch (err) {
    console.error('Gemini API error:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Failed to fetch prices from Gemini.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
