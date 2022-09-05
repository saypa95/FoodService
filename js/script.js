import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calculator from "./modules/calculator";
import forms from "./modules/forms";
import slider from "./modules/slider";
import {modalShowClose} from './modules/modal';

window.addEventListener("DOMContentLoaded", () => {
  const modalShowTimerID = setTimeout(() => modalShowClose(".modal",modalShowTimerID ), 15000);

  tabs(".tabheader__item", ".tabheader__items", ".tabcontent", "tabheader__item_active");
  modal(".modal", modalShowTimerID);
  timer(".timer", "2022-10-01");
  cards();
  calculator();
  forms("form", modalShowTimerID);
  slider({
    sliderSelector: ".offer__slider",
    slideSelector: ".offer__slide",
    btnPrevSlideSelector: ".offer__slider-prev",
    btnNextSlideSelector: ".offer__slider-next",
    sliderWrapperSelector: ".offer__slider-wrapper",
    slidesFieldSelector: ".offer__slider-inner"
  });
});
