import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { RandomAvatar } from "react-random-avatars";
import "./CardDetail.scss";
import { InfoItem } from "../InfoItem/InfoItem";
import { fetchCards } from "../../store/cardsSlice";
import { Loader } from "../Loader/Loader";
import {
    AiFillAlert,
    AiFillCodepenCircle,
    AiFillBulb,
    AiFillCheckSquare,
    AiFillEnvironment,
    AiFillPhone,
    AiFillSignal,
    AiFillZhihuCircle,
    AiOutlineDocker,
    AiOutlineDribbbleSquare,
    AiOutlineQq,
    AiOutlineSlackSquare,
    AiOutlineWeiboCircle,
    AiOutlineWechat,
    AiFillExperiment,
    AiFillCode,
} from "react-icons/ai";

export const CardDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.cards);
    const card = useSelector((state: RootState) => state.cards.cards.find((card) => card.id === id));

    useEffect(() => {
        if (!card) {
            dispatch(fetchCards());
        }
		scrollTo(0, 0);
    }, [dispatch, card]);

    if (loading) {
        return <Loader />;
    }

    if (!card) {
        return (
            <div className="card">
                <div className="card__not-found">Не найдено</div>
                <button className="card__back" onClick={() => navigate("/test-alfa")}>
                    Назад
                </button>
            </div>
        );
    }

    const cardDetails = [
        { label: "Username", value: card.username, icon: <AiFillCodepenCircle /> },
        { label: "Email", value: card.email, icon: <AiFillAlert /> },
        { label: "Website", value: card.website, icon: <AiFillEnvironment /> },
        { label: "Company", value: card.company.name, icon: <AiOutlineDocker /> },
        { label: "Liked", value: card.liked ? "Yes" : "No", icon: card.liked ? <AiFillCheckSquare /> : <AiFillBulb /> },
        { label: "Street", value: card.address.street, icon: <AiFillPhone /> },
        { label: "City", value: card.address.city, icon: <AiFillSignal /> },
        { label: "Zipcode", value: card.address.zipcode, icon: <AiFillZhihuCircle /> },
        { label: "Phone", value: card.phone, icon: <AiOutlineDribbbleSquare /> },
        { label: "Catch Phrase", value: card.company.catchPhrase, icon: <AiOutlineQq /> },
        { label: "BS", value: card.company.bs, icon: <AiOutlineWeiboCircle /> },
        { label: "Lat", value: card.address.geo.lat, icon: <AiOutlineWechat /> },
        { label: "Lng", value: card.address.geo.lng, icon: <AiOutlineSlackSquare /> },
        { label: "ID", value: card.id, icon: <AiFillExperiment /> },
        { label: "Suite", value: card.address.suite, icon: <AiFillCode /> },
    ];

    return (
        <div className="card">
            <div className="card__container list__container">
                <button className="card__back" onClick={() => navigate("/test-alfa/")}>
                    Назад
                </button>
                <div className="card__avatar">
                    <RandomAvatar size={100} name={card.name} />
                    <h2>{card.name}</h2>
                </div>
                <div className="card__info">
                    {cardDetails.map(({ label, value, icon }) => (
                        <InfoItem key={label} label={label} value={value} icon={icon} />
                    ))}
                </div>
            </div>
        </div>
    );
};
