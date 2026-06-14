import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import fridgeImg from "../assets/fridge.png";

import meatImg from "../assets/meat.png";
import vegetableImg from "../assets/vegetable.png";
import fruitImg from "../assets/fruit.png";
import dairyImg from "../assets/dairy.png";
import seafoodImg from "../assets/seafood.png";
import grainImg from "../assets/grain.png";
import mushroomImg from "../assets/mushroom.png";
import drinkImg from "../assets/drink.png";
import seasoningImg from "../assets/seasoning.png";
import processedImg from "../assets/processed.png";

import "./Fridge.css";

function Fridge() {

    const navigate = useNavigate();

    const [fridgeItems, setFridgeItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] =
        useState(null);

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
        .catch(console.error)
        .finally(() => {

            setLoading(false);

        });

    }, [navigate]);

    const groupedItems = useMemo(() => {

        const grouped = {};

        fridgeItems.forEach((item) => {

            if (!grouped[item.ingredientType]) {

                grouped[item.ingredientType] = [];

            }

            grouped[item.ingredientType].push(item);

        });

        return grouped;

    }, [fridgeItems]);

    const categories = [

        {
            type: "유제품",
            image: dairyImg,
            className: "dairy"
        },

        {
            type: "과일",
            image: fruitImg,
            className: "fruit"
        },

        {
            type: "채소",
            image: vegetableImg,
            className: "vegetable"
        },

        {
            type: "육류",
            image: meatImg,
            className: "meat"
        },

        {
            type: "해산물",
            image: seafoodImg,
            className: "seafood"
        },

        {
            type: "곡물",
            image: grainImg,
            className: "grain"
        },

        {
            type: "버섯",
            image: mushroomImg,
            className: "mushroom"
        },

        {
            type: "음료",
            image: drinkImg,
            className: "drink"
        },

        {
            type: "조미료",
            image: seasoningImg,
            className: "seasoning"
        },

        {
            type: "가공식품",
            image: processedImg,
            className: "processed"
        },

    ];

    if (loading) {

        return (
            <div className="loading">
                냉장고 불러오는 중...
            </div>
        );
    }

    return (

        <div className="fridge-page">

            <div className="fridge-wrapper">

                <img
                    src={fridgeImg}
                    alt="냉장고"
                    className="fridge-image"
                />

                {
                    categories.map((category) => {

                        if (
                            !groupedItems[category.type]
                        ) {
                            return null;
                        }

                        return (

                            <img
                                key={category.type}
                                src={category.image}
                                alt={category.type}
                                className={`category-icon ${category.className}`}
                                onClick={() =>
                                    setSelectedCategory(
                                        category.type
                                    )
                                }
                            />

                        );

                    })
                }

            </div>

            {
                selectedCategory && (

                    <div
                        className="modal-overlay"
                        onClick={() =>
                            setSelectedCategory(null)
                        }
                    >

                        <div
                            className="modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <div
                                className="modal-header"
                            >

                                <h2>
                                    {selectedCategory}
                                </h2>

                                <button
                                    className="close-btn"
                                    onClick={() =>
                                        setSelectedCategory(
                                            null
                                        )
                                    }
                                >
                                    ✕
                                </button>

                            </div>

                            <div className="modal-body">

                                {
                                    groupedItems[
                                        selectedCategory
                                    ]?.map((item) => (

                                        <div
                                            key={
                                                item.fridgeItemId
                                            }
                                            className="modal-item"
                                        >

                                            <span>
                                                {
                                                    item.ingredientName
                                                }
                                            </span>

                                            <span>

                                                {
                                                    item.quantityValue
                                                }

                                                {
                                                    item.quantityUnit
                                                }

                                            </span>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );
}

export default Fridge;