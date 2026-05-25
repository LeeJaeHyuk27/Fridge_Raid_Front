import mainfood from "../assets/mainfood.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import LoginModal from "../components/LoginModal";
import { useRef } from "react";

const BACKEND = "http://localhost:8080";
const recommendedRecipes = [
  { title: "김치볶음밥"},
  { title: "참치 샐러드" },
  { title: "닭가슴살 샌드위치"},
];

function Home() {

    const navigate = useNavigate();
    const [bestRecipes, setBestRecipes] = useState([]);
    const [loginUser, setLoginUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const loginBtnRef = useRef(null);
    const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

    const handleLoginClick = () => {
    const rect = loginBtnRef.current.getBoundingClientRect();

    setModalPos({
        top: rect.bottom,
        left: rect.left +rect.width / 2,
    });

    setShowLogin(true);
    };
  
    const handleLogout = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/user/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const message = await response.text();

            alert(message);

            setLoginUser(null);

        } catch (error) {
            console.error(error);
            alert("로그아웃 실패");
        }
    };
    useEffect(() => {
    fetch("http://localhost:8080/api/recipes/best")
        .then((res) => res.json())
        .then((data) => {
        setBestRecipes(data);
        })
        .catch((err) => {
        console.error("BEST 레시피 불러오기 실패:", err);
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/user/userCheck", {
            credentials: "include", // 🔥 필수
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setLoginUser(data.user);
        })
        .catch((err) => {
            console.error("로그인 상태 확인 실패:", err);
        });
    }, []);

    return (
        <div className="app">
        <header className="navbar">
            <div className="container nav-inner">
            <div className="logo">Fridge Raid</div>
            <nav className="nav-links">
                <span className="active">홈</span>
                <span>내 냉장고</span>
                <span>레시피</span>
            </nav>
            <div className="nav-buttons">
                {loginUser ? (
                    <>
                        <span className="user-name">👤{loginUser.userName}</span>
                        <button className="btn-logout" onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <button ref={loginBtnRef} className="btn-login" onClick={handleLoginClick}>로그인</button>
                        <button className="btn-join" onClick={() => navigate("/join")}>시작하기</button>
                    </>
                )}
                
            </div>
            </div>
        </header>

        {/* HERO */}
        <section className="band band-hero">
            <div className="container hero">
            <div className="hero-text">
                <h1>
                냉장고 속 재료로 <br />
                바로 만들 수 있는 요리
                </h1>
                <p>지금 있는 재료로 만들 수 있는 요리를 찾아보세요!</p>
                <div className="hero-buttons">
                <button className="btn-primary" onClick={() => navigate("/fridge")}>내 냉장고 열기</button>
                <button className="btn-ghost">레시피 둘러보기</button>
                </div>
            </div>

            <div className="hero-image">
                <img
                src={mainfood}
                alt="대표 음식"
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/700x480?text=No+Image";
                }}
                />
            </div>
            </div>
        </section>

        {/* BEST */}
        <section className="band band-best">
            <div className="container section">
            <div className="section-title">
                <h2>이 달의 BEST 레시피</h2>
                <p>이번 달에 평점이 높은 인기 레시피 5선</p>
            </div>

            <div className="recipe-grid">
                {bestRecipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                    <img
                    src={`${BACKEND}${encodeURI(recipe.thumbnail)}`}
                    alt={recipe.title}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                    />
                    <div className="recipe-info">
                    <h3>{recipe.title}</h3>
                    <div className="rating">
                        ⭐ {recipe.avgRating} <span className="muted">({recipe.reviewCount})</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* BOTTOM */}
        <section className="band band-bottom">
            <div className="container section bottom-section">
            <div className="card fridge-preview">
                <div className="card-head">
                <h3>내 냉장고 미리보기</h3>
                <span className="chip">오늘</span>
                </div>

                <ul className="fridge-list">
                <li><span>🥚 계란</span><span className="muted">4개</span></li>
                <li><span>🧅 양파</span><span className="muted">1개</span></li>
                <li><span>🥬 김치</span><span className="muted">1팩</span></li>
                </ul>

                <div className="search-bar">
                <input placeholder="재료 검색 (예: 두부)" />
                <button className="icon-btn" title="검색">🔍</button>
                </div>

                <button className="btn-primary full">더보기</button>
            </div>

            <div className="recommended-wrap">
                <div className="section-title left">
                <h3>추천 레시피</h3>
                <p>지금 내 재료로 만들기 쉬운 메뉴</p>
                </div>

                <div className="recommend-grid">
                {recommendedRecipes.map((r, i) => (
                    <div key={i} className="recommend-card">
                    <img
                        src={r.img}
                        alt={r.title}
                        onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                    />
                    <div className="recommend-title">{r.title}</div>
                    <div className="rating small">⭐ 4.{7 - i} <span className="muted">(6{i})</span></div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </section>

        <footer className="footer">
            <div className="container footer-inner">© 2026 Fridge Raid — 냉장고털이</div>
        </footer>

        {showLogin && (
            <LoginModal
                onClose={() => setShowLogin(false)}
                position={modalPos}
            />
        )}
        </div>
  );
}

export default Home;