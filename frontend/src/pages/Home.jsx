import { useState, useEffect } from "react";

function Home() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/hello`)  // 백엔드 기본 주소로 요청
            .then((res) => res.json())
            .then((data) => setMessage(data.message))  // JSON 데이터의 message 필드 사용
            .catch((err) => console.error("Error:", err));
    }, []);

    const prodectOrDeveloment = () => {
        if (import.meta.env.MODE === 'production') {
            return <div>프로덕션 환경입니다!</div>;
        } else if (import.meta.env.MODE === 'development') {
            return <div>개발 환경입니다!</div>;
        }
    };

    return (
        <div className="container">
            <h1>홈 페이지</h1>
            <p>{`TODO 앱을 사용하려면 "TODO" 메뉴를 클릭하세요.`}</p>
            <p> .env 테스트 {import.meta.env.VITE_API_BASE_URL}</p>
            {message && <p>{message}</p>} {/* Express에서 받은 메시지 출력 */}
            <p> 빌드 버전 0.1</p>
            {prodectOrDeveloment()} {/* 함수 호출 형태로 변경 */}
        </div>
    );
}

export default Home;
