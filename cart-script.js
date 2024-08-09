const cartProducts = document.querySelector(".cart-products");
const cartProduct = document.querySelector(".cart-product-container");

// Retrieve cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);

// Initialize total price
let total = 0;
let subtotal = 0;
let eachItemtotal = 0;

cart.forEach((item) => {
  const newCartProduct = cartProduct.cloneNode(true);
  console.log(item.price);

  newCartProduct.style.display = "block";

  newCartProduct.querySelector(".cart-product-img").src = item.image;
  newCartProduct.querySelector(".cart-product-name").textContent = item.name;
  newCartProduct.querySelector(".cart-product-price").textContent = item.price;
  newCartProduct.querySelector(".quantity-no").textContent = item.quantity;
  eachItemtotal = parseFloat(item.quantity) * parseFloat(item.price);
  newCartProduct.querySelector(".cart-product-subtotal").textContent =
    eachItemtotal;
  subtotal += eachItemtotal;
  cartProducts.append(newCartProduct);
});

cartProducts.addEventListener("click", (event) => {
  console.log(event);
  if (event.target.classList.contains("minus")) {
    console.log("jhbkuj");
    quantity = parseInt(event.target.nextElementSibling.textContent);
    if (quantity > 0) {
      quantity--;
      console.log(quantity);
      event.target.nextElementSibling.textContent = quantity;
      const itemIndex = cart.findIndex((item) => item.name === productName);
      if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      cartTotal();
      updateCartItemCount();
    }
  } else if (event.target.classList.contains("plus")) {
    console.log("jhbkuj");
    quantity = parseInt(event.target.previousElementSibling.textContent);
    quantity++;
    console.log(quantity);
    event.target.previousElementSibling.textContent = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    cartTotal();
    updateCartItemCount();
  }
});

// const minus = document.querySelector(".minus");
// const plus = document.querySelector(".plus");
// const quantityNo = document.querySelector(".quantity-no");

// plus.addEventListener("click", () => {
//   quantity++;
//   quantityNo.textContent = quantity;
// });

// minus.addEventListener("click", () => {
//   if (quantity > 0) {
//     quantity--;
//     quantityNo.textContent = quantity;
//   }
// });

const cartTotal = () => {
  subtotal = 0;
  console.log("hoihoi");
  items = cartProducts.querySelectorAll(".cart-product-container");
  items.forEach((item) => {
    console.log(item.querySelector(".cart-product-price").textContent);

    item.querySelector(".cart-product-subtotal").textContent = parseFloat(
      item.querySelector(".cart-product-price").textContent *
        item.querySelector(".quantity-no").textContent
    ).toFixed(2);

    console.log(
      "subtotal",
      item.querySelector(".cart-product-subtotal").textContent
    );

    subtotal += parseFloat(
      item.querySelector(".cart-product-subtotal").textContent
    );
    console.log(subtotal);
  });

  document.querySelector(".sub-total").textContent = subtotal;

  const tax = parseFloat((subtotal / 100) * 8).toFixed(2);

  document.querySelector(".tax").textContent = tax;
  discount = parseFloat(document.querySelector(".discount").textContent);

  const totalAmount = parseFloat(subtotal) + parseFloat(tax) - discount;
  document.querySelector(".total-amount").textContent = totalAmount;
};

cartTotal();

const updateCartItemCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".items-in-cart").textContent = itemCount;
};

updateCartItemCount();
