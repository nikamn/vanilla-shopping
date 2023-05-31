// Select elements
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsEl = document.querySelector(".total-items");

// Render the products
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
    <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.imgSrc}" alt="${product.name}" />
            <div class="desc">
                <h2>${product.name}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>${product.description}</p>
            </div>
            <div class="add-to-wishlist"><img src="icons/heart.png" alt="add to wishlist" /></div>
            <div class="add-to-cart"><img src="icons/bag-plus.png" alt="add to cart" /></div>
            </div>
        </div>
    </div>
  `;
  });
}

renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];

// add to cart
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  localStorage.setItem("CART", JSON.stringify(cart));
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `<div class="cart-item">
    <div class="item-info" onclick="removeItemFromCart()">
      <img src="${item.imgSrc}" alt="${item.name}" />
      <h4>${item.name}</h4>
    </div>
    <div class="unit-price">
      <small>$</small>
    </div>
    <div class="units">
      <div class="btn minus">-</div>
      <div class="number"></div>
      <div class="btn plus">+</div>
    </div>
  </div>`;
  });
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((element) => {
    totalPrice += element.price * element.numberOfUnits;
    totalItems += element.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): ${totalPrice.toFixed(
    2
  )}`;

  totalItemsEl.innerHTML = totalItems;
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
