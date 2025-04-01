import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// .env 파일에서 Socket 서버 URL 가져오기
const socket = io(import.meta.env.API_BASE_URL);

function Home() {
    const [helloMessage, setHelloMessage] = useState("");

    // 서버로부터 "헬로" 메시지 수신
    useEffect(() => {
        socket.on("chatMessage", (msg) => {
            // 서버로부터 "헬로" 메시지가 오면 화면에 출력
            if (msg === "헬로") {
                setHelloMessage(msg);
            }
        });

        return () => {
            socket.off("chatMessage");
        };
    }, []);

    return (
        <div className="container">
            <h1>홈 페이지</h1>
            <p>TODO 앱을 사용하려면 "TODO" 메뉴를 클릭하세요.asdq</p>
            {helloMessage && <p>{helloMessage}</p>} {/* "헬로" 메시지 출력 */}
        </div>
    );
}

export default Home;
