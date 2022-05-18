class UserInfo {
  constructor({ nameSelector, descriptionSelector, profileAvatar }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(link) {
    this._profileAvatar.style.backgroundImage = "url('" + link + "')";
  }
}

export { UserInfo };
