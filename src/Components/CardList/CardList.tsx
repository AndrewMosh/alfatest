// src/components/CardList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RandomAvatar } from "react-random-avatars";
import { fetchCards, toggleLike, deleteCard, toggleFilter } from "../../store/cardsSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import "./CardList.scss";
import like from "../../assets/like.svg";
import liked from "../../assets/liked.svg";
import { Loader } from "../Loader/Loader";

export const CardList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { cards, likedOnly, loading } = useSelector((state: RootState) => state.cards);

    useEffect(() => {
        dispatch(fetchCards());
    }, [dispatch]);

    const handleLike = (id: string) => {
        dispatch(toggleLike(id));
    };

    const handleDelete = (id: string) => {
        dispatch(deleteCard(id));
    };

    const handleFilterToggle = () => {
        dispatch(toggleFilter());
    };

    const filteredCards = likedOnly ? cards.filter((card: { liked: unknown }) => card.liked) : cards;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="list">
            <div className="list__container">
                <button className="list__filter" onClick={handleFilterToggle}>
                    {likedOnly ? "Показать все" : "Только избранные"}
                </button>
                <div className="list__cards">
                    {filteredCards.map((card) => (
                        <div className="list__card" key={card.id}>
                            <div className="list__content" onClick={() => navigate(`/card/${card.id}`)}>
                                <div className="list__avatar">
                                    <h2 className="list__name">{card.name}</h2>
                                    <div>
                                        <RandomAvatar size={60} name={card.name} />
                                    </div>
                                </div>

                                <p className="list__company">{card.company.name}</p>
                                <p className="list__catchphrase">{card.company.catchPhrase}</p>
                            </div>
                            <div className="list__buttons">
                                <button className="list__like" onClick={() => handleLike(card.id)}>
                                    <img src={!card.liked ? like : liked} alt={!card.liked ? "like" : "unlike"} />
                                </button>
                                <button className="list__delete" onClick={() => handleDelete(card.id)} title="Удалить">
                                    &#10006;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {!filteredCards.length ? <div className="list__not-found">Здесь пусто : (</div> : null}
            </div>
        </div>
    );
};
