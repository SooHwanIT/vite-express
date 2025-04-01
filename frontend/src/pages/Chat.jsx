import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // 서버와 연결

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // 서버로부터 메시지 수신
    useEffect(() => {
        socket.on("chatMessage", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off("chatMessage");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chatMessage", message); // 서버로 메시지 전송
            console.log(message);
            setMessage(""); // 입력 필드 초기화
        }
    };

    return (
        <div>
            <h1>실시간 채팅</h1>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage}>보내기</button>
            </div>
            <div>
                <h2>채팅 기록</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Chat;
