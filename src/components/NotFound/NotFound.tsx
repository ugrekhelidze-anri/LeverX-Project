import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

type NotFoundProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export const NotFound = ({
  // default values for props if not provided
  title = "404 Page not found",
  description = "Sorry, we cant find that page. It might be an old link or maybe it was moved.",
  buttonLabel = "GO TO THE HOME PAGE",
}: NotFoundProps) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="profile-error page--fade-in">
      <div className="profile-error__content">
        <img
          src="/assets/notfoundpicture.png"
          alt="notfound"
          className="profile-error__image"
        />
        <h1>{title}</h1>
        <p>{description}</p>
        <button
          className="profile-error__home-button"
          type="button"
          onClick={goHome}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};
