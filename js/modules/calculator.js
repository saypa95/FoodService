function calculator() {
  const result = document.querySelector(".calculating__result span");
  let gender = localStorage.getItem("gender") || "female",
    height,
    weight,
    age,
    ratio = +localStorage.getItem("ratio") || 1.375;

  document.querySelectorAll(".calculating__choose div").forEach((element) => {
    if (
      element.getAttribute("id") == gender ||
      element.dataset.ratio == ratio
    ) {
      element.classList.add("calculating__choose-item_active");
    } else {
      element.classList.remove("calculating__choose-item_active");
    }
  });

  function calcCalories() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "_____ ";
      return;
    }

    if (gender == "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcCalories();

  function getStaticInformation(e) {
    if (e.target.classList.contains("calculating__choose-item")) {
      if (e.target.dataset.ratio) {
        ratio = +e.target.dataset.ratio;
        localStorage.setItem("ratio", +e.target.dataset.ratio);
      } else {
        gender = e.target.getAttribute("id");
        localStorage.setItem("gender", e.target.getAttribute("id"));
      }

      e.currentTarget.querySelectorAll("div").forEach((element) => {
        element.classList.remove("calculating__choose-item_active");
      });

      e.target.classList.add("calculating__choose-item_active");
      calcCalories();
    }
  }

  document
    .querySelector("#gender")
    .addEventListener("click", getStaticInformation);
  document
    .querySelector(".calculating__choose_big")
    .addEventListener("click", getStaticInformation);

  function getDynamicInformation(e) {
    if (e.target.classList.contains("calculating__choose-item")) {
      if (e.target.value.match(/\D/g)) {
        e.target.style.border = "1px solid red";
      } else {
        e.target.style.border = "none";
      }

      switch (e.target.getAttribute("id")) {
        case "height":
          height = +e.target.value;
          break;
        case "weight":
          weight = +e.target.value;
          break;
        case "age":
          age = +e.target.value;
          break;
      }

      calcCalories();
    }
  }

  document
    .querySelector(".calculating__choose_medium")
    .addEventListener("input", getDynamicInformation);
}

export default calculator;
