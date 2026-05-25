import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

const BACKEND = "http://localhost:8080";

function Login({ isModal = false, onClose }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    passwordHash: "",
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

  const submitLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};


    if (!form.userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요.";
    }

    if (!form.passwordHash.trim()) {
      newErrors.passwordHash = "비밀번호를 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${BACKEND}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const message = await response.text();

      if (response.ok) {
        alert(message);
        window.location.reload();
        if (isModal) {
            onClose();
        } else {
            navigate("/");
        }
      } else {

        if (message.includes("아이디")) {
          setErrors({ userId: message });
        } else if (message.includes("비밀번호")) {
          setErrors({ passwordHash: message });
        } else {
          alert(message);
        }
      }
    } catch (error) {
      console.error(error);
      alert("서버 연결 중 오류가 발생했습니다.");
    }
  };

  return isModal ? (
    <div className="join-card">
        {isModal ? (
            <button className="btn-return" onClick={onClose}>
            ✕
            </button>
        ) : (
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

        )}
        

        <h2 className="join-title">로그인</h2>

        <form onSubmit={submitLogin} className="join-form">

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

          <button type="submit" className="join-button">
            로그인
          </button>
          <p classname="account-verify">
            아직 회원이 아니신가요?{" "}
            <span className="login-link" onClick={() => navigate("/join")}>
              가입하기
            </span>
          </p>
        </form>
    </div>
  ) : (
    <div className="join-container">
      <div className="join-card">
        {isModal ? (
            <button className="btn-return" onClick={onClose}>
            ✕
            </button>
        ) : (
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

        )}
        

        <h2 className="join-title">로그인</h2>

        <form onSubmit={submitLogin} className="join-form">

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

          <button type="submit" className="join-button">
            로그인
          </button>
          <p classname="account-verify">
            아직 회원이 아니신가요?{" "}
            <span className="login-link" onClick={() => navigate("/join")}>
              가입하기
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;