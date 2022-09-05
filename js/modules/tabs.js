function tabs(tabSelctor, tabsParentSelector, tabContentSlector, activeClass) {
  const tabs = document.querySelectorAll(tabSelctor),
    tabsParent = document.querySelector(tabsParentSelector),
    tabContent = document.querySelectorAll(tabContentSlector);

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabSelctor.slice(1))) {
      tabs.forEach((tab, i) => {
        if (tab == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
}

export default tabs;