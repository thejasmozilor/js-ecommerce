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
    modalPrice.textContent = product.querySelector(".actual-price").textContent;
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
  if (quantity > 1) {
    quantity--;
    quantityNo.textContent = quantity;
  }
});

const addToCart = document.querySelector(".item-add-cart");

// Using cookies to store cart

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()};`;
  }
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}path=/`;
};

const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
};

// const eraseCookie = (name) => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// };

// Cookies function for cart finished

addToCart.addEventListener("click", () => {
  const productName = document.querySelector(".modal-name").textContent;
  const productPrice = document.querySelector(".modal-price").textContent;
  const productImage = document.querySelector(".modal-img").src;

  // Add item to cart
  // let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cart = JSON.parse(getCookie("cart")) || [];

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

  // localStorage.setItem("cart", JSON.stringify(cart));
  setCookie("cart", JSON.stringify(cart), 7);

  updateCartItemCount();

  // Optionally show a confirmation message or update the cart icon
  alert(`${quantity} ${productName} added to cart`);
});

const goToCart = document.querySelector(".go-to-cart");

goToCart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

const updateCartItemCount = () => {
  // const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cart = JSON.parse(getCookie("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".items-in-cart").textContent = itemCount;
};

updateCartItemCount();
