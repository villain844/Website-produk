// Ganti background otomatis dari API SheetDB
fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s")
  .then(res => res.json())
  .then(data => {
    if (data.length > 0 && data[0].background) {
      document.body.style.backgroundImage = `url('${data[0].background}')`;
    }
  });

// Tampilkan produk dari SheetDB
fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-container");
    container.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${item.foto}" class="product-img" onclick="showPreview('${item.foto}')">
        <div class="product-info">
          <h3>${item.nama}</h3>
          <div class="price">IDR ${item.harga}</div>
          <div class="stock">Stok: ${item.stok}</div>
          <p class="desc">
            <span class="short-text">${item.deskripsi.slice(0, 40)}...</span>
            <span class="full-text" style="display:none;">${item.deskripsi}</span>
          </p>
          <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
          <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(item.nama)}" target="_blank">Order</a>
        </div>
      `;
      container.appendChild(card);
    });
  });

// Fungsi toggle deskripsi
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector(".short-text");
  const fullText = desc.querySelector(".full-text");
  const isOpen = fullText.style.display === "inline";
  shortText.style.display = isOpen ? "inline" : "none";
  fullText.style.display = isOpen ? "none" : "inline";
  button.textContent = isOpen ? "Lihat Selengkapnya" : "Sembunyikan";
}

// Tampilkan preview gambar
function showPreview(src) {
  const modal = document.getElementById("img-modal");
  const img = document.getElementById("img-preview");
  modal.style.display = "flex";
  img.src = src;
}

// Tutup modal (gambar/pesan)
function closeModal() {
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}

// Kirim pesan ke SheetDB
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = e.target.nama.value;
  const pesan = e.target.pesan.value;
  const res = await fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [{ nama, pesan }] })
  });
  if (res.ok) {
    alert("Pesan berhasil dikirim!");
    e.target.reset();
    closeModal();
  } else {
    alert("Gagal mengirim pesan.");
  }
});
