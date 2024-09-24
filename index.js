// Variables Declarations
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let items = document.querySelectorAll(".carousel .item ");
let images = document.querySelectorAll(".carousel .item .image img");
let countItem = items.length;
let active = 1;
let past = null;
let later = null;
//indicators
let dots = document.querySelectorAll(".indicators .dot");
//swipe
let isDragStart = false;

// next button
next.onclick = () => {
  carousel.classList.remove("prev");
  carousel.classList.add("next");
  active = active + 1 >= countItem ? 0 : active + 1;
  past = active - 1 < 0 ? countItem - 1 : active - 1;
  later = active + 1 >= countItem ? 0 : active + 1;
  changeSlider();
};
//  previous button
prev.onclick = () => {
  carousel.classList.remove("next");
  carousel.classList.add("prev");
  active = active - 1 < 0 ? countItem - 1 : active - 1;
  past = active + 1 >= countItem ? 0 : active + 1;
  later = past + 1 >= countItem ? 0 : past + 1;
  changeSlider();
};
//auto play
let autoplay = setInterval(() => {
  next.click();
}, 3000);
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoplay);
});
carousel.addEventListener("mouseleave", () => {
  autoplay = setInterval(() => {
    next.click();
  }, 3000);
});

const changeSlider = () => {
  // find the current item then remove active from it
  //add the active class to the next item
  let oldActive = document.querySelector(".carousel .item.active");

  if (oldActive) {
    oldActive.classList.remove("active");
  }
  // find the previous item then remove past from it
  //add the past class to the next item
  let oldPast = document.querySelector(".carousel .item.past");
  if (oldPast) {
    oldPast.classList.remove("past");
  }
  // find the next item then remove later from it
  //add the next class to the next item
  let oldLater = document.querySelector(".carousel .item.later");
  if (oldLater) {
    oldLater.classList.remove("later");
  }
  items.forEach((e) => {
    e.querySelector(".image img").style.animation = "none";
    e.querySelector(".image figcaption").style.animation = "none";
    void e.offsetWidth;
    e.querySelector(".image img").style.animation = "";
    e.querySelector(".image figcaption").style.animation = "";
  });

  items[active].classList.add("active");
  items[past].classList.add("past");
  items[later].classList.add("later");

  clearInterval(autoplay);
  autoplay = setInterval(() => {
    next.click();
  }, 3000);

  updateIndicators();
};
// indicators
const updateIndicators = () => {
  dots.forEach((dot, index) => {
    if (index === active) {
      dot.classList.add("active-dot");
    } else {
      dot.classList.remove("active-dot");
    }
  });
};

dots.forEach((dot, index) => {
  dot.onclick = () => {
    active = index;
    past = active - 1 < 0 ? countItem - 1 : active - 1;
    later = active + 1 > -countItem ? 0 : active + 1;
    changeSlider();
  };
});

// swipe
