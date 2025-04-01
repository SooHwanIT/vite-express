import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { Server } from "socket.io";  // socket.io 모듈 import

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://vite-express-front.vercel.app',
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// 기본 페이지
app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!, connection successful! " });
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "api connection successful! hello!! " });
});

// Socket.io 서버 생성
const io = new Server(server, {
    cors: {
        origin: 'https://vite-express-front.vercel.app',  // 프론트엔드 도메인
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    // 예시로 클라이언트로 메시지 보내기
    socket.emit("message", { message: "Welcome to the Socket.io server!" });
});


// 로컬 개발용: Vercel 배포 시에는 실행되지 않음
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}

export default app;
