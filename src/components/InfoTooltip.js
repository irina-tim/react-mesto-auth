import successImage from "../images/infotooltip-success.svg";
import errorImage from "../images/infotooltip-error.svg";

function InfoTooltip({ onClose, isOpened, isOk }) {
  const successMessage = "Вы успешно зарегистрировались!";
  const errorMessage = "Что-то пошло не так! Попробуйте еще раз.";

  return (
    <div className={`popup popup-info ${isOpened && "popup_opened"}`}>
      <div className="popup-info__container ">
        <div
          className="popup-info__image"
          style={{
            backgroundImage: isOk
              ? `url(${successImage})`
              : `url(${errorImage})`,
          }}
        ></div>
        <h2 className="popup-info__title">
          {isOk ? successMessage : errorMessage}
        </h2>
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно с информацией о регистрации"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
