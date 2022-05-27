//Selector
const access_key = "D6GVL6ykNHf5e5E7lI1DUic09zT5xuEZ9zqWROZSrys";
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const scrollNext = document.querySelector("#next");
const scrollPrev = document.querySelector("#prev");
const categoryItem = document.querySelectorAll(".category .nav_links");
const categoryMenu = document.querySelector(".category");
const grid_wrapper = document.querySelector(".grid_wrapper");
const large_img = document.querySelector(".large_img");
const image_popup = document.querySelector(".image_popup");
const close_btn = document.querySelector(".close_btn");
const overlay = document.querySelector(".overlay");
const prvBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".next-btn");
const search_input = document.querySelector(".search_input");
const download = document.querySelector('.down_btn')
let current = 0;

//  Slider Left
const slideLeft = () => {
  let slider = document.querySelector("#slider");
  slider.scrollLeft = slider.scrollLeft - 500;
};
//   Slider Right
const slideRight = () => {
  let slider = document.querySelector("#slider");
  slider.scrollLeft = slider.scrollLeft + 500;
};

scrollPrev.addEventListener("click", slideLeft);
scrollNext.addEventListener("click", slideRight);

//Disbale Next Prev When we scroll down
window.addEventListener("scroll", function () {
  categoryMenu.classList.toggle("hidden", window.scrollY > 0);
});

//   When User Click Any Navlinks show active class
function setMenuActive() {
  categoryItem.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");
}

categoryItem.forEach((n) => n.addEventListener("click", setMenuActive));

//fetch All Images

// getImages()
(async () => {
  const res = await fetch(random_photo_url);
  const data = await res.json();
  setSlide(data);
  setImage(data);
})();

function setImage(data) {
  let html = "";
  data.forEach((item) => {
    const { urls, user } = item;

    html += `
      <img src=${urls?.regular} class="gallary_img" alt=${user?.username} />
      `;
  });

  grid_wrapper.innerHTML = html;

  //When user Click Any Particular image
  const gallary_img = document.querySelectorAll(".gallary_img");

  gallary_img.forEach((singleImg, index) => {
    const { links, downloads, views, user } = data[index];
    singleImg.addEventListener("click", () => {
      overlay.classList.add("active");
      image_popup.classList.add("show");
      large_img.src = singleImg.src;
      document.querySelector(".viewCount").innerHTML = views;
      download.setAttribute('href', links?.download)
      document.querySelector(".downloadCount").innerHTML = downloads;
      document.querySelector(".userName").innerHTML = user?.username;

      console.log();
    });

    overlay.addEventListener("click", closeBtn);
    close_btn.addEventListener("click", closeBtn);
  });
}

function closeBtn() {
  image_popup.classList.remove("show");
  overlay.classList.remove("active");
}

function setSlide(data) {
  //Slide Next Images
  prvBtn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      const { urls, user } = data[current];
      large_img.src = urls?.regular;
      large_img.alt = user?.username;
    }
  });

  // Previous Image When User click prev button
  nextBtn.addEventListener("click", () => {
    if (current < data.length - 1) {
      current++;
      const { urls, user } = data[current];
      large_img.src = urls?.regular;
      large_img.alt = user?.username;
    }
  });
}

// Redirect User One Page to anther page
search_input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (search_input.value === "") return alert("Search be filed require");
    window.location.href = `../page/search.html`;
    sessionStorage.setItem("search", search_input.value);
  }
});
