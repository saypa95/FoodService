function modalShowClose(modalSelector, modalShowTimerID) {
  const modal = document.querySelector(modalSelector);
  modal.classList.toggle("show");
  document.body.classList.toggle("overflowHide");
  if(modalShowTimerID){
    clearInterval(modalShowTimerID);
  }
}

function modal(modalSelector, modalShowTimerID) {
  const modal = document.querySelector(modalSelector);
  document.addEventListener("click", (e) => {
    if (
      e.target.dataset.modal != undefined ||
      e.target.dataset.close != undefined ||
      e.target == modal
    ) {
      modalShowClose(modalSelector, modalShowTimerID);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      modalShowClose(modalSelector, modalShowTimerID);
    }
  });

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      modalShowClose(modalSelector, modalShowTimerID);
      removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {modalShowClose};