import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://vite-express-front.vercel.app',
    credentials: true
}));

// app.use(cors({
//     origin: process.env.FRONT_BASE_URL,
//     credentials: true
// }));

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

// 로컬 개발용: Vercel 배포 시에는 실행되지 않음
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}

export default app;
