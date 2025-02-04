import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'



// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000; // Backend port

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: '*' }));


// API endpoint for interacting with Claude AI
app.post('/api/get-recipe', async (req, res) => {
    const ingredients = req.body.ingredients; // Extract ingredients from request body

    if (!ingredients || ingredients.length === 0) {
        return res.status(400).send("Ingredients are required");
    }

    // Convert the ingredients array into a string for the API
    const ingredientsString = ingredients.join(", "); 


    try {
        // Make an API call to Claude API (Anthropic)
        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',  // Replace with the correct endpoint
            {
                model: "claude-3-haiku-20240307",
                max_tokens: 1024,
             
                messages: [
                    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
                ]
            },
            {
                headers: {
                    'x-api-key': process.env.ANTHROPIC_API_KEY,  // Use the server-side API key
                    "Content-Type": "application/json",
                    "accept": "application/json",
                    "anthropic-version": "2023-06-01",
     
                }
            }
        );

        // Send the API response back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error calling Claude API:", error.message);
        if (error.response) {
            console.error("API Response Error:", error.response.data);
        }
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
