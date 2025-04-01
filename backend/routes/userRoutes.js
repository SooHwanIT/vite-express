import express from "express";

const router = express.Router();
let users = []; // 임시 메모리 저장소

// ✅ 사용자 목록 가져오기
router.get("/", (req, res) => {
    res.json(users);
});

// ✅ 사용자 추가하기
router.post("/", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const newUser = { id: Date.now(), name };
    users.push(newUser);
    res.status(201).json(newUser);
});

export default router;

