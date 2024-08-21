import "./InfoItem.scss";
interface InfoItemProps {
    label: string;
    value: string | React.ReactNode;
    icon?: React.ReactNode; // Пропс для иконки
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value, icon }) => (
    <div className="info-item">
        {icon && <div className="info-item__icon">{icon}</div>}
        <div className="info-item__container">
            <div className="info-item__label">{label}</div>
            <div className="info-item__value">{value}</div>
        </div>
    </div>
);
