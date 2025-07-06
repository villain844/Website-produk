// Load produk
fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("produk-container");
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.foto}" class="product-img" onclick="showPreview('${p.foto}')">
        <div class="product-info">
          <h3>${p.nama}</h3>
          <div class="price">${p.harga}</div>
          <div class="stock">Stok: ${p.stok}</div>
          <p class="desc">
            <span class="short-text">${p.deskripsi.slice(0, 40)}...</span>
            <span class="full-text" style="display:none;">${p.deskripsi}</span>
          </p>
          <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
          <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(p.nama)}" target="_blank">Order</a>
        </div>`;
      container.appendChild(card);
    });
  });

// Load background dinamis
fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s")
  .then(res => res.json())
  .then(data => {
    const latest = data[data.length - 1];
    document.body.style.backgroundImage = `url('${latest.background}')`;
    document.getElementById("dynamic-banner").src = latest.background;
  });

// Form kirim pesan
document.getElementById("pesan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = this.nama.value.trim();
  const pesan = this.pesan.value.trim();
  const notif = document.getElementById("notif");

  fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [{ nama, pesan }] })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(() => {
      notif.textContent = "✅ Pesan berhasil dikirim!";
      notif.style.color = "lightgreen";
      this.reset();
    })
    .catch(() => {
      notif.textContent = "❌ Gagal mengirim pesan.";
      notif.style.color = "red";
    });
});

// Gambar preview
function showPreview(src) {
  document.getElementById("img-preview").src = src;
  document.getElementById("img-modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("img-modal").style.display = "none";
}

// Toggle deskripsi
function toggleDesc(btn) {
  const desc = btn.previousElementSibling;
  const shortText = desc.querySelector(".short-text");
  const fullText = desc.querySelector(".full-text");
  const show = fullText.style.display === "none";
  fullText.style.display = show ? "inline" : "none";
  shortText.style.display = show ? "none" : "inline";
  btn.textContent = show ? "Sembunyikan" : "Lihat Selengkapnya";
}
