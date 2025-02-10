import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';




// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000; // Backend port

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per window
    message: 'Too many requests, please try again later.'
  });
  


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: '*' }));

// Improved Bot Protection: Block bots based on regex matching
app.use((req, res, next) => {
    const botPatterns = /bot|crawler|spider|scraper|curl|wget|http/i;
    const userAgent = req.headers["user-agent"];
    if (!userAgent || botPatterns.test(userAgent)) {
        return res.status(403).json({ error: "Bots are not allowed" });
    }
    next();
});

// Dynamic IP Blocking
const blockedIPs = new Set();
const requestCounts = new Map();

const getClientIP = (req) => {
    return (req.headers["x-forwarded-for"] || req.connection.remoteAddress || "").split(",")[0].trim();
};


app.use((req, res, next) => {
    const ip = getClientIP(req);

    if (blockedIPs.has(ip)) {
        return res.status(403).json({ error: "Access Denied" });
    }

    requestCounts.set(ip, (requestCounts.get(ip) || 0) + 1);

    if (requestCounts.get(ip) > 50) {
        blockedIPs.add(ip);
        setTimeout(() => blockedIPs.delete(ip), 15 * 60 * 1000); // Unblock after 15 min
    }

    next();
});

app.get('/healthz', async (req, res) => {
    return res.status(200).send("Health check");
});


// API endpoint for interacting with Claude AI
app.post('/api/get-recipe', limiter, async (req, res) => {
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
