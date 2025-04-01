import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// CORS 미들웨어 사용
app.use(cors({
    origin: 'http://localhost:5173'  // 요청을 허용할 클라이언트의 주소
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// 기본 페이지
app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!, connection successful! " });
});

app.get("/api", (req, res) => {
    res.json({ message: "api connection successful! " });
});
app.get("/api/hello", (req, res) => {
    res.json({ message: "hello" });
});

// 로컬 개발용: Vercel 배포 시에는 실행되지 않음
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
