const PORT = 8000
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const apiKey = process.env.API_KEY

app.post("/completion", async (req, res) => {
    const Options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', Options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log("Your server is running on Port" + PORT))