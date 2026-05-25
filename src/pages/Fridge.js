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

            console.log(data);

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
        return <div>로딩중...</div>;
    }

    return (
        <div className="fridge-page">

            <div className="fridge-container">

                <div className="fridge-header">
                    <h1>내 냉장고</h1>
                </div>

                {fridgeItems.length === 0 ? (

                    <div className="empty-message">
                        냉장고에 재료가 없습니다.
                    </div>

                ) : (

                    <div className="fridge-list">

                        {fridgeItems.map((item) => (

                            <div
                                key={item.fridgeItemId}
                                className="fridge-item"
                            >

                                <div className="ingredient-info">

                                    <div className="ingredient-name">
                                        {item.ingredientName}
                                    </div>

                                    <div className="ingredient-type">
                                        {item.ingredientType}
                                    </div>

                                </div>

                                <div className="ingredient-quantity">

                                    {item.quantityValue}
                                    {item.quantityUnit}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Fridge;