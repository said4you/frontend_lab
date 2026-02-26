
const saleEndsAt = new Date("2026-02-28T23:59:59");
const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateTimer() {
  const now = new Date();
  let diff = saleEndsAt - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  dEl.textContent = days;
  hEl.textContent = pad(hours);
  mEl.textContent = pad(minutes);
  sEl.textContent = pad(seconds);
}

updateTimer();
setInterval(updateTimer, 1000);


const products = [
  { id: 1, title: "Advanced Analytics", price: 1990, category: "Analytics", inStock: true, discount: 35 },
  { id: 2, title: "Nutrition Tracking", price: 2490, category: "Nutrition", inStock: true, discount: 25 },
  { id: 3, title: "Sleep Analysis", price: 1790, category: "Sleep", inStock: false, discount: 40 },
  { id: 4, title: "Smart Reminders", price: 1290, category: "Productivity", inStock: true, discount: 15 },
  { id: 5, title: "Cloud Backup", price: 990, category: "Cloud", inStock: true, discount: 20 },
  { id: 6, title: "Export Reports (PDF/CSV)", price: 1590, category: "Reports", inStock: false, discount: 30 },
];

const productsEl = document.getElementById("bfProducts");

const categoryFilter = document.getElementById("categoryFilter");
const stockFilter = document.getElementById("stockFilter");
const discountSort = document.getElementById("discountSort");

function discountedPrice(p) {
  return Math.round(p.price * (1 - p.discount / 100));
}

function render(list) {
  productsEl.innerHTML = list
    .map((p) => {
      const newPrice = discountedPrice(p);
      const stockText = p.inStock ? "In stock" : "Out of stock";

      return `
      <article class="card bf-card ${p.inStock ? "" : "bf-card--out"}">
        <div class="bf-badge">-${p.discount}%</div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <p class="bf-meta">${p.category} • ${stockText}</p>
          <p class="bf-price">
            <span class="bf-old">${p.price} KZT</span>
            <span class="bf-new">${newPrice} KZT</span>
          </p>
        </div>
      </article>`;
    })
    .join("");
}

function applyFiltersAndSort() {
  let list = [...products];

  // Filter by category
  const cat = categoryFilter.value;
  if (cat !== "all") list = list.filter((p) => p.category === cat);

  // Filter by stock
  const st = stockFilter.value;
  if (st === "in") list = list.filter((p) => p.inStock);
  if (st === "out") list = list.filter((p) => !p.inStock);

  // Sort by discount
  const ds = discountSort.value;
  if (ds === "desc") list.sort((a, b) => b.discount - a.discount);
  if (ds === "asc") list.sort((a, b) => a.discount - b.discount);

  render(list);
}

[categoryFilter, stockFilter, discountSort].forEach((el) => {
  el.addEventListener("change", applyFiltersAndSort);
});

applyFiltersAndSort();
