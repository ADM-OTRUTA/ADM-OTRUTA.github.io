import Swiper from "swiper";
import "swiper/css";

const swiper: Swiper = new Swiper(".swiper", {
  slidesPerView: 1,
});

const swiperEl = document.querySelector(".swiper") as HTMLElement & {
  swiper: Swiper;
};
const swiperInst: Swiper = swiperEl.swiper;

const swiperPrevBtn = document.querySelector(
  ".swiper-btn-prev"
) as HTMLButtonElement;
const swiperNextBtn = document.querySelector(
  ".swiper-btn-next"
) as HTMLButtonElement;

function nextSlide(): void {
  swiperInst.slideNext(400, true);
}

function prevSlide(): void {
  swiperInst.slidePrev(400, true);
}

swiperNextBtn.addEventListener("click", nextSlide);
swiperPrevBtn.addEventListener("click", prevSlide);
swiperNextBtn.addEventListener("touchend", nextSlide);
swiperPrevBtn.addEventListener("touchend", prevSlide);

function updateBtns(): void {
  if (swiperInst.isEnd) {
    swiperNextBtn.classList.add("disabled");
    swiperNextBtn.setAttribute("disabled", "true");
  } else {
    swiperNextBtn.classList.remove("disabled");
    swiperNextBtn.removeAttribute("disabled");
  }

  if (swiperInst.isBeginning) {
    swiperPrevBtn.classList.add("disabled");
    swiperPrevBtn.setAttribute("disabled", "true");
  } else {
    swiperPrevBtn.classList.remove("disabled");
    swiperPrevBtn.removeAttribute("disabled");
  }
}
updateBtns();
swiperInst.on("slideChange", updateBtns);

const swiperNav = document.querySelector(".swiper-nav") as HTMLElement;

let slidesNumber: number = 0;

function navInit(): void {
  slidesNumber = swiperInst.slides.length;

  for (let i: number = 0; i < slidesNumber; i++) {
    const navItem = document.createElement("li") as HTMLElement;
    navItem.classList.add("swiper-nav-item");
    navItem.dataset.index = i.toString();

    navItem.addEventListener("click", () => {
      swiperInst.slideTo(i);
    });
    navItem.addEventListener("touchend", () => {
      swiperInst.slideTo(i);
    });

    swiperNav.appendChild(navItem);
  }
  updNavItems();
}

function updNavItems(): void {
  const navItems = document.querySelectorAll(
    ".swiper-nav-item"
  ) as NodeListOf<HTMLLIElement>;

  navItems.forEach((item: HTMLElement, i: number) => {
    if (i === swiperInst.activeIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

navInit();
swiperInst.on("slideChange", updNavItems);

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

Fancybox.bind("[data-fancybox]", {
  autoFocus: false,
});

// * global options
// ! closeButton
// ? closeExisting
// ? contentClick
// ? defaultType
// ? hideClass
// ? showClass
// ! hideScrollbar
// ?tpl
// ? wheel

// ? defaultDisplay

// ! інфо перенос

window.addEventListener("DOMContentLoaded", adjustInfoCard);
window.addEventListener("resize", adjustInfoCard);

function adjustInfoCard(): void {
  const lineBreak = document.querySelector(
    ".info-line-break"
  ) as HTMLSpanElement;

  if (window.innerWidth > 767 && window.innerWidth < 1280) {
    lineBreak.innerHTML = "";
  } else {
    lineBreak.innerHTML = "-";
  }
}

// // ! інфо стилі карток
// document.addEventListener('DOMContentLoaded', adjustFancyboxStyles);

// function adjustFancyboxStyles(): void {

// }

// ! галерея абзаци
window.addEventListener("DOMContentLoaded", adjustGalleryText);
window.addEventListener("resize", adjustGalleryText);

function adjustGalleryText(): void {
  const textContainer = document.querySelector(
    ".gallery-text-wrap"
  ) as HTMLDivElement;

  if (window.innerWidth > 1279) {
    textContainer.innerHTML = `<p class="gallery-text">Ми захищаємо наше життя і здоров'я. Вимагаємо винесення заводу за межі міста!</p>`;
  } else {
    textContainer.innerHTML = `<p class="gallery-text">Ми захищаємо наше життя і здоров'я.</p><p class="gallery-text">Вимагаємо винесення заводу за межі міста!</p>`;
  }
}

// ! футер кнопки
window.addEventListener("DOMContentLoaded", adjustFooterBtns);
window.addEventListener("resize", adjustFooterBtns);

function adjustFooterBtns(): void {
  const btns = document.querySelectorAll(
    ".footer-btn"
  ) as NodeListOf<HTMLButtonElement>;

  btns.forEach((btn: HTMLButtonElement) => {
    const lineBreak = btn.querySelector(
      ".footer-line-break"
    ) as HTMLSpanElement | null;

    if (lineBreak) {
      if (window.innerWidth > 767) {
        lineBreak.innerHTML = "<br />";
      } else {
        lineBreak.innerHTML = " ";
      }
    }
  });
}
