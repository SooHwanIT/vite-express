import { useState, useEffect } from "react";

function Home() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(import.meta.env.VITE_API_BASE_URL)  // 백엔드 기본 주소로 요청
            .then((res) => res.json())
            .then((data) => setMessage(data.message))  // JSON 데이터의 message 필드 사용
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <div className="container">
            <h1>홈 페이지</h1>
            <p>{`TODO 앱을 사용하려면 "TODO" 메뉴를 클릭하세요.`}</p>
            <p> .env 테스트 {import.meta.env.VITE_API_BASE_URL}</p>
            {message && <p>{message}</p>} {/* Express에서 받은 메시지 출력 */}
        </div>
    );
}

export default Home;
