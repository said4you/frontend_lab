// 1) Array of objects (catalog data) — REQUIRED by lab
const products = [
  { id: 1, title: "Strength Builder", price: 2990, image: "images/fitness1.jpg" },
  { id: 2, title: "Cardio", price: 2490, image: "images/fitness2.jpg" },
  { id: 3, title: "Home Workout", price: 1990, image: "images/homeworkout.jpg" },
  { id: 4, title: "Mobility & Yoga", price: 1890, image: "images/yoga.jpg" },
  { id: 5, title: "Fat Loss", price: 2790, image: "images/fitness5.jpg" },
  { id: 6, title: "Beginner Start", price: 1490, image: "images/fitness6.jpg" },
];

// Cart holds selected items (can contain duplicates)
let cart = [];

// DOM elements
const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

// 2) Render catalog from array — REQUIRED by lab
function renderProducts() {
  productsEl.innerHTML = products
    .map(
      (p) => `
      <article class="card card--media">
        <img src="${p.image}" alt="${p.title}" class="card-img" />
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.price} KZT / month</p>
          <button class="btn" data-id="${p.id}">Add to cart</button>
        </div>
      </article>
    `
    )
    .join("");
}

// 3) Event handling: add to cart — REQUIRED by lab
productsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const product = products.find((p) => p.id === id);
  if (!product) return;

  cart.push(product);
  renderCart();
});

// Remove from cart (needed because lab requires add/remove + total updates)
cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-remove-id]");
  if (!btn) return;

  const idx = Number(btn.dataset.removeId);
  cart.splice(idx, 1);
  renderCart();
});

// 4) Render cart dynamically — REQUIRED by lab
function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p style="opacity:.75;margin:0;">Cart is empty</p>`;
    cartTotalEl.textContent = "0";
    return;
  }

  cartItemsEl.innerHTML = cart
    .map(
      (item, index) => `
      <div class="cart-item">
        <div class="meta">
          <div><strong>${item.title}</strong></div>
          <div class="price">${item.price} KZT</div>
        </div>
        <button class="btn-danger" data-remove-id="${index}">Remove</button>
      </div>
    `
    )
    .join("");

  // 5) Total sum auto-calculation — REQUIRED by lab
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = String(total);
}

// Initial render
renderProducts();
renderCart();
