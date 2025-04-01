const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

// Vercel의 핸들러 설정
module.exports = app;
