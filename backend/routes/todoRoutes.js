import express from "express";

const router = express.Router();
let todos = []; // 메모리 저장소

// ✅ TODO 목록 가져오기
router.get("/", (req, res) => {
    res.json(todos);
});

// ✅ TODO 추가하기
router.post("/", (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const newTodo = { id: Date.now(), text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// ✅ TODO 삭제하기
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== Number(id));
    res.json({ message: "Deleted successfully" });
});

export default router;
