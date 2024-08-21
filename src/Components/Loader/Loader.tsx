import { MutatingDots } from "react-loader-spinner";
import "./Loader.scss";

export const Loader = () => {
    return (
        <div className="loader">
            <MutatingDots height="100" width="100" color="blue" ariaLabel="three-dots-loading" />
        </div>
    );
};
