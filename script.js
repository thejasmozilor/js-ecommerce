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

const modal = document.querySelector(".modal");
const modalName = document.querySelector(".modal-name");
const modalImage = document.querySelector(".modal-img");
const modalPrice = document.querySelector(".modal-price");

const products = document.querySelectorAll(".static-product, .section-item");

let currentProduct = null;
let quantity = 1;

products.forEach((product) => {
  product.addEventListener("click", () => {
    modalName.textContent = product.querySelector(".pro-name").textContent;
    modalPrice.textContent = product.querySelector(".pro-price").textContent;
    modalImage.src = product.querySelector(".pro-img").src;

    if (currentProduct === product) {
      quantityNo.textContent = quantity;
    } else {
      quantity = 1;
      quantityNo.textContent = quantity;
    }

    currentProduct = product;

    modal.style.display = "block";
  });
});

const closeBtn = document.querySelector(".modal-close");

closeBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const quantityNo = document.querySelector(".quantity-no");

plus.addEventListener("click", () => {
  quantity++;
  quantityNo.textContent = quantity;
});

minus.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityNo.textContent = quantity;
  }
});

const addToCart = document.querySelector(".item-add-cart");

addToCart.addEventListener("click", () => {
  const productName = document.querySelector(".modal-name").textContent;
  const productPrice = document.querySelector(".modal-price").textContent;
  const productImage = document.querySelector(".modal-img").src;

  // Add item to cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex(
    (item) => item.name === productName
  );

  if (existingProductIndex > -1) {
    // Update quantity if product already in cart
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Add new product to cart
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Optionally show a confirmation message or update the cart icon
  alert(`${quantity} ${productName} added to cart`);
});

const goToCart = document.querySelector(".go-to-cart");

goToCart.addEventListener("click", () => {
  window.location.href = "cart.html";
});
