import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// 환경 변수 설정
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_BASE_URL, // .env에서 가져온 API 주소 사용
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: process.env.FRONT_BASE_URL, // .env에서 가져온 API 주소 사용
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// ✅ 라우트 연결
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// ✅ 기본 페이지
app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

// ✅ WebSocket 연결
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chatMessage", (msg) => {
        console.log("Message received:", msg);
        io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// 포트 설정 (환경변수 또는 기본값 5000)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
