import {getResource} from '../services/services';

function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes.length ? classes : ["menu__item"];
      this.parent = document.querySelector(parentSelector);
      this.rate = 65;
      this.convertToRUB();
    }

    convertToRUB() {
      this.price *= this.rate;
    }

    render() {
      const element = document.createElement("div");
      element.classList.add(...this.classes);
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, alt, title, descr, price }) => {
      new MenuCard(img, alt, title, descr, price, ".menu .container").render();
    });
  });
}

export default cards;
