import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONT_BASE_URL,
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// ✅ 기본 페이지
app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!, connection successful! " });
});

// ✅ 기본 페이지
app.get("/api", (req, res) => {
    res.json({ message: "api connection successful! " });
});


// 포트 설정 (환경변수 또는 기본값 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
