import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// .env 파일에서 Socket 서버 URL 가져오기
const socket = io(import.meta.env.VITE_API_BASE_URL);

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageEndRef = useRef(null); // 메시지 끝을 자동으로 스크롤하기 위한 ref

    // 서버로부터 채팅 메시지 수신
    useEffect(() => {
        socket.on("chatMessage", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // 클린업: 컴포넌트가 언마운트될 때 소켓 이벤트 해제
        return () => {
            socket.off("chatMessage");
        };
    }, []);

    // 메시지 전송
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chatMessage", message); // 서버로 메시지 전송
            setMessage(""); // 입력 필드 초기화
        }
    };

    // 메시지 리스트의 끝으로 자동 스크롤
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                {/* 메시지 끝으로 자동 스크롤 */}
                <div ref={messageEndRef}></div>
            </div>
        </div>
    );
}

export default Chat;
