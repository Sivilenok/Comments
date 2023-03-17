"use strict"
// Валидация формы
document.addEventListener("DOMContentLoaded", function (event) {
  const form = document.querySelector(".reviews__form");
  const nameInput = document.querySelector("#name");
  const nameError = document.querySelector("#name-error");
  const textArea = document.querySelector("#text");
  const textError = document.querySelector("#text-error");
  const dateInput = document.querySelector("#date");
  const dateError = document.querySelector("#date-error");
  const commentList = document.querySelector(".comment__list");

  function isValidName(name) {
    return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name);
  }

  function isValidText(text) {
    return text.trim().length > 0 && text.trim().length <= 100;
  }

  nameInput.classList.remove("invalid");
  nameError.textContent = "";
  textArea.classList.remove("invalid");
  textError.textContent = "";

  nameInput.addEventListener("input", () => {
    if (nameInput.classList.contains("invalid")) {
      nameInput.classList.remove("invalid");
      nameError.textContent = "";
    }
  });

  textArea.addEventListener("input", () => {
    if (textArea.classList.contains("invalid")) {
      textArea.classList.remove("invalid");
      textError.textContent = "";
    }
  });

  dateInput.addEventListener("input", () => {
    if (dateInput.classList.contains("invalid")) {
      dateInput.classList.remove("invalid");
      dateError.textContent = "";
    }
  });

  function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "сегодня, " + date.toLocaleTimeString();
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "вчера, " + date.toLocaleTimeString();
    } else {
      return date.toLocaleString();
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const text = textArea.value;
    let date = new Date();
    let dateFormate = formatDate(date);
    let valid = true;

    if (!isValidName(nameInput.value)) {
      nameInput.classList.add("invalid");
      nameError.textContent = "Введите корректное имя";
      valid = false;
    }

    if (!isValidText(textArea.value)) {
      textArea.classList.add("invalid");
      textError.textContent = textArea.value.length > 100 ? "Превышен текст":"Введите текст";
      valid = false;
    }

    if (dateInput.value) {
      const inputDate = new Date(dateInput.value);
      const today = new Date();
      if (
        isNaN(inputDate) ||
        inputDate > today) {
        dateInput.classList.add("invalid");
        dateError.textContent = "Введите корректную дату";
        valid = false;
      } else {
        date = inputDate;
        dateFormate = formatDate(date);
      }
    } else {
      date = new Date();
      dateFormate = formatDate(date);
    }

    if (!valid) {
      event.preventDefault();
    } else {
      if (name.trim() !== "" && text.trim() !== "") {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment__item");
        commentItem.innerHTML = `
        <div class="comment__header">
          <h3 class="comment__name">${name}</h3>
          <span class="comment__date">${dateFormate}</span>
          <div class="comment__button-wrapper">
            <button class="delete-button" aria-label="Удалить комментарий">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path fill="currentColor"
                  d="M14.6 3.5H9.5V2.1c0-.4-.3-.8-.8-.8H7.2c-.4 0-.8.3-.8.8v1.4H1.4c-.4 0-.8.3-.8.8s.3.8.8.8h1.3L3.3 14c.1.8.8 1.4 1.6 1.4h7.1c.8 0 1.5-.6 1.6-1.4l1.3-9.7h1.3c.4 0 .8-.3.8-.8s-.3-.8-.8-.8zM5.3 2.1c0-.1.1-.3.3-.3h1.5c.1 0 .3.1.3.3v1.4H5.3V2.1zm6.4 11.4c0 .3-.3.6-.6.6H5.9c-.3 0-.6-.3-.6-.6l-1-7.6h9.6l-1 7.6z" />
              </svg>
            </button>
            <button class="comment__button-like" aria-label="Поставить лайк">
              <svg class="like-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor"d="M12.7,20.3L12,19.6C5.2,14.2,2,10.7,2,7.5c0-2.8,2.2-5,5-5c1.6,0,3,0.8,4,2c1-1.2,2.4-2,4-2c2.8,0,5,2.2,5,5c0,3.2-3.2,6.7-10,12.1z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="comment__body">
          <div class="comment__rating"></div>
          <p class="comment__text">${text}</p>
        </div>
        `;

        commentList.appendChild(commentItem);
        nameInput.value = "";
        textArea.value = "";
        dateInput.value = "";

        const deleteButton = commentItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
          commentList.removeChild(commentItem);
        });

        const likeButton = commentItem.querySelector('.comment__button-like');
        const likeIcon = likeButton.querySelector("svg path");
        likeButton.addEventListener('click', () => {
          if (likeIcon.getAttribute("fill") === "currentColor") {
            likeIcon.setAttribute("fill", "red");
          } else {
            likeIcon.setAttribute("fill", "currentColor");
          }
        });
      }
    }
  });
});
