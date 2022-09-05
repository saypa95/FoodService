import { modalShowClose } from "./modal";
import {postData} from '../services/services';

function forms(formSelector, modalShowTimerID) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((item) => {
    bindPostData(item);
  });

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так...",
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          shwowThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          shwowThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function shwowThanksModal(message) {
    const prevModalContent = document.querySelector(".modal__content");

    prevModalContent.classList.add("hide");
    if (!document.querySelector(".modal").classList.contains("show")) {
      modalShowClose(".modal", modalShowTimerID);
    }

    const newModalContent = document.createElement("div");
    newModalContent.classList.add("modal__content");
    newModalContent.innerHTML = `<div data-close class="modal__close">&times;</div> <div class="modal__title">${message}</div>`;

    document.querySelector(".modal__dialog").append(newModalContent);

    setTimeout(() => {
      newModalContent.remove();
      prevModalContent.classList.remove("hide");
      prevModalContent.classList.add("show");
      if (document.querySelector(".modal").classList.contains("show")) {
        modalShowClose(".modal", modalShowTimerID);
      }
    }, 4000);
  }
}

export default forms;
