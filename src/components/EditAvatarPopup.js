import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const checks = ["valueMissing", "typeMismatch"];
  const [url, setUrl] = useState("");
  const errorMessage = "Please enter a valid URL";
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const checkValidity = (e) => {
    const { validity } = e.target;
    const checksPassed = checks.filter((check) => validity[check]).length === 0;
    setIsValid(checksPassed);
    setIsSubmitButtonEnabled(checksPassed);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: url,
    });
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
    checkValidity(e);
  }

  useEffect(() => {
    setUrl("");
    setIsValid(true);
    setIsSubmitButtonEnabled(false);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"avatar-update"}
      title={"Обновить аватар"}
      submitButtonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isSubmitButtonEnabled={isSubmitButtonEnabled}
    >
      <div className="popup__field">
        <input
          id="avatar-link-input"
          className={`popup__input popup__input_type_avatar-link ${
            !isValid && url !== "" && "popup__input_type_error"
          }`}
          type="url"
          name="link"
          placeholder="Ссылка на новый аватар"
          required
          onChange={handleUrlChange}
          value={url}
        />
        <span
          className={`avatar-link-input-error popup__input-error ${
            !isValid && url !== "" && "popup__input-error_visible"
          }`}
        >
          {!isValid && errorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
