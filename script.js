const products = [
  {
    id: 1,
    title: "Advanced Analytics",
    price: 1990,
    image: "images/gradient.png",
  },
  {
    id: 2,
    title: "Nutrition Tracking",
    price: 2490,
    image: "images/gradient.png",
  },
  {
    id: 3,
    title: "Sleep Analysis",
    price: 1790,
    image: "images/gradient.png",
  },
  {
    id: 4,
    title: "Smart Reminders",
    price: 1290,
    image: "images/gradient.png",
  },
  {
    id: 5,
    title: "Cloud Backup",
    price: 990,
    image: "images/gradient.png",
  },
  {
    id: 6,
    title: "Export Reports (PDF/CSV)",
    price: 1590,
    image: "images/gradient.png",
  },
];



let cart = [];


const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

function renderProducts() {
  productsEl.innerHTML = products
    .map(
      (p) => `
      <article class="card card--media">
        <img src="${p.image}" alt="${p.title}" class="card-img" />
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.price} KZT</p>
          <button class="btn" data-id="${p.id}">Add feature</button>
        </div>
      </article>
    `
    )
    .join("");
}


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
