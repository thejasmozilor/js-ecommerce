const cartProducts = document.querySelector(".cart-products");
const cartProduct = document.querySelector(".cart-product-container");

// Retrieve cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);

// Initialize total price
let total = 0;
let subtotal = 0;
let eachItemtotal = 0;

const renderCart = () => {
  cartProducts.innerHTML = "";
  cart.forEach((item) => {
    const newCartProduct = cartProduct.cloneNode(true);
    // console.log(item.price);

    newCartProduct.style.display = "block";

    newCartProduct.querySelector(".cart-product-img").src = item.image;
    newCartProduct.querySelector(".cart-product-name").textContent = item.name;
    newCartProduct.querySelector(".cart-product-price").textContent =
      item.price;
    newCartProduct.querySelector(".quantity-no").textContent = item.quantity;
    eachItemtotal = parseFloat(item.quantity) * parseFloat(item.price);
    newCartProduct.querySelector(".cart-product-subtotal").textContent =
      eachItemtotal;
    subtotal += eachItemtotal;
    cartProducts.append(newCartProduct);
  });
};

renderCart();

cartProducts.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-product-remove")) {
    const productName = event.target
      .closest(".cart-product")
      .querySelector(".cart-product-name").textContent;

    const itemIndex = cart.findIndex((item) => item.name === productName);

    if (itemIndex > -1) {
      alert(`${cart[itemIndex].name} has been removed from cart`);
      cart.splice(itemIndex, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
    }
    renderCart();
    cartTotal();
    updateCartItemCount();
  }

  console.log(event);
  if (event.target.classList.contains("minus")) {
    quantity = parseInt(event.target.nextElementSibling.textContent);
    if (quantity > 0) {
      quantity--;
      event.target.nextElementSibling.textContent = quantity;

      const productName = event.target
        .closest(".cart-product")
        .querySelector(".cart-product-name").textContent;

      const itemIndex = cart.findIndex((item) => item.name === productName);

      if (itemIndex > -1) {
        if (quantity === 0) {
          alert(`${cart[itemIndex].name} has been removed from cart`);
          cart.splice(itemIndex, 1);
        } else {
          cart[itemIndex].quantity = quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      renderCart();
      cartTotal();
      updateCartItemCount();
    }
  } else if (event.target.classList.contains("plus")) {
    quantity = parseInt(event.target.previousElementSibling.textContent);
    quantity++;
    event.target.previousElementSibling.textContent = quantity;

    const productName = event.target
      .closest(".cart-product")
      .querySelector(".cart-product-name").textContent;

    console.log("productname", productName);

    const itemIndex = cart.findIndex((item) => item.name === productName);
    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    cartTotal();
    updateCartItemCount();
  }
});

const cartTotal = () => {
  subtotal = 0;
  items = cartProducts.querySelectorAll(".cart-product-container");
  items.forEach((item) => {
    item.querySelector(".cart-product-subtotal").textContent = parseFloat(
      item.querySelector(".cart-product-price").textContent *
        item.querySelector(".quantity-no").textContent
    ).toFixed(2);

    subtotal += parseFloat(
      item.querySelector(".cart-product-subtotal").textContent
    );
  });

  document.querySelector(".sub-total").textContent = subtotal.toFixed(2);

  const tax = parseFloat((subtotal / 100) * 8).toFixed(2);

  document.querySelector(".tax").textContent = tax;
  discount = parseFloat(document.querySelector(".discount").textContent);

  const totalAmount = (
    parseFloat(subtotal) +
    parseFloat(tax) -
    discount
  ).toFixed(2);
  document.querySelector(".total-amount").textContent = totalAmount;
};

cartTotal();

const updateCartItemCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".items-in-cart").textContent = itemCount;
};

updateCartItemCount();

const returnToShop = document.querySelector(".return");

returnToShop.addEventListener("click", () => {
  window.location.href = "index.html";
});
