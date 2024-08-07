const rightButton = document.querySelector(".rightarrow");
const leftButton = document.querySelector(".leftarrow");
const carousel = document.querySelector(".carousel");

leftButton.addEventListener("click", () => {
  carousel.style.scrollBehavior = "smooth";
  carousel.scrollLeft -= 225;
});

rightButton.addEventListener("click", () => {
  carousel.style.scrollBehavior = "smooth";

  carousel.scrollLeft += 225;
});

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.querySelector(".modal-close");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
