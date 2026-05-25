import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

const BACKEND = "http://localhost:8080";

function Join() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    passwordHash: "",
    userName: "",
  });

  const [errors, setErrors] = useState({});

  const changeForm = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitJoin = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요.";
    }

    if (!form.passwordHash.trim()) {
      newErrors.passwordHash = "비밀번호를 입력해주세요.";
    }

    if (!form.userName.trim()) {
      newErrors.userName = "닉네임을 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${BACKEND}/api/user/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const message = await response.text();

      if (response.ok) {
        alert(message);
        navigate("/");
        setForm({
          userId: "",
          passwordHash: "",
          userName: "",
        });
      } else {

        if (message.includes("아이디")) {
          setErrors({ userId: message });
        } else if (message.includes("비밀번호")) {
          setErrors({ passwordHash: message });
        } else if (message.includes("닉네임")) {
          setErrors({ userName: message });
        } else {
          alert(message);
        }
      }
    } catch (error) {
      console.error(error);
      alert("서버 연결 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <button className="btn-return" onClick={() => navigate("/")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <h2 className="join-title">회원가입</h2>
        <p className="join-subtitle">계정을 생성하고 더 많은 서비스를 이용해보세요.</p>

        <form onSubmit={submitJoin} className="join-form">
          <input
            type="text"
            name="userId"
            placeholder="아이디"
            value={form.userId}
            onChange={changeForm}
            className="join-input"
          />
          {errors.userId && <p className="error-text">{errors.userId}</p>}


          <input
            type="password"
            name="passwordHash"
            placeholder="비밀번호"
            value={form.passwordHash}
            onChange={changeForm}
            className="join-input"
          />
          {errors.passwordHash && <p className="error-text">{errors.passwordHash}</p>}

          <input
            type="text"
            name="userName"
            placeholder="닉네임"
            value={form.userName}
            onChange={changeForm}
            className="join-input"
          />
          {errors.userName && <p className="error-text">{errors.userName}</p>}

          <button type="submit" className="join-button">
            회원가입
          </button>
          <p classname="account-verify">
            이미 계정이 있으신가요?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              로그인
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Join;