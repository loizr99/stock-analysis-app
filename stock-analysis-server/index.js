import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/*path", async (req, res) => {
    const path = req.params.path || "";
    const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""
    const url = `https://query1.finance.yahoo.com/${path}${query}`;

    try {
        const response = await fetch(url);
        const data = await response.text();
        res.status(response.status).send(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});