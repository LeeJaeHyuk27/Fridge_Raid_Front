import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Fridge.css";

function Fridge() {

    const navigate = useNavigate();

    const [fridgeItems, setFridgeItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("http://localhost:8080/api/fridge", {
            credentials: "include",
        })
        .then((res) => {

            if (res.status === 401) {

                navigate("/login");

                return null;
            }

            if (!res.ok) {
                throw new Error("냉장고 조회 실패");
            }

            return res.json();
        })
        .then((data) => {

            if (!data) return;

            setFridgeItems(data);

        })
        .catch((err) => {

            console.error(err);

        })
        .finally(() => {

            setLoading(false);

        });

    }, [navigate]);

    if (loading) {
        return (
            <div className="fridge-loading">
                냉장고 불러오는 중...
            </div>
        );
    }

    const categoryCount = fridgeItems.reduce((acc, item) => {

        const type = item.ingredientType;

        acc[type] = (acc[type] || 0) + 1;

        return acc;

    }, {});

    return (

        <div className="fridge-page">

            <div className="fridge-topbar">

                <div className="logo">
                    Fridge Raid
                </div>

                <div className="page-title">
                    내 냉장고
                </div>

                <div className="fridge-status">
                    재료 {fridgeItems.length}개
                </div>

            </div>

            <div className="fridge-wrapper">

                <img
                    src="/assets/fridge.png"
                    alt="냉장고"
                    className="fridge-image"
                />

                {/* 유제품 */}
                <button className="category dairy">

                    <div className="emoji">
                        🥛
                    </div>

                    <div className="count">
                        {categoryCount["유제품"] || 0}
                    </div>

                </button>

                {/* 과일 */}
                <button className="category fruit">

                    <div className="emoji">
                        🍎
                    </div>

                    <div className="count">
                        {categoryCount["과일"] || 0}
                    </div>

                </button>

                {/* 채소 */}
                <button className="category vegetable">

                    <div className="emoji">
                        🥬
                    </div>

                    <div className="count">
                        {categoryCount["채소"] || 0}
                    </div>

                </button>

                {/* 육류 */}
                <button className="category meat">

                    <div className="emoji">
                        🥩
                    </div>

                    <div className="count">
                        {categoryCount["육류"] || 0}
                    </div>

                </button>

            </div>

        </div>
    );
}

export default Fridge;