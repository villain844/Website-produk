// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
  }, 3000);
});

// Load background dari SheetDB
fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s")
  .then(res => res.json())
  .then(data => {
    const aktif = data.find(bg => bg.status && bg.status.toLowerCase() === "aktif");
    if (aktif && aktif.background) {
      document.body.style.backgroundImage = `url('${aktif.background}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundPosition = "center";
    }
  })
  .catch(err => console.error("Gagal ambil background aktif:", err));

// Produk dari SheetDB
fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-list");
    data.forEach(prod => {
      container.innerHTML += `
        <div class="product-card">
          <img src="${prod.foto}" class="product-img" onclick="showPreview('${prod.foto}')">
          <div class="product-info">
            <h3>${prod.nama}</h3>
            <div class="price">IDR ${prod.harga}</div>
            <div class="stock">Stok: ${prod.stok}</div>
            <p class="desc">
              <span class="short-text">${prod.deskripsi.substring(0, 35)}...</span>
              <span class="full-text" style="display:none;">${prod.deskripsi}</span>
            </p>
            <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
            <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(prod.nama)}">Order</a>
          </div>
        </div>`;
    });
  });

// Toggle deskripsi
function toggleDesc(btn) {
  const desc = btn.parentElement.querySelector(".desc");
  const shortText = desc.querySelector(".short-text");
  const fullText = desc.querySelector(".full-text");
  const showing = fullText.style.display === "inline";
  fullText.style.display = showing ? "none" : "inline";
  shortText.style.display = showing ? "inline" : "none";
  btn.textContent = showing ? "Lihat Selengkapnya" : "Sembunyikan";
}

// Preview gambar
function showPreview(src) {
  const modal = document.getElementById("img-modal");
  const preview = document.getElementById("img-preview");
  preview.src = src;
  modal.style.display = "flex";
}

// Close modal
function closeModal() {
  document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
}


document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify([{ nama, pesan }])
  })
    .then(() => {
      alert("Pesan berhasil dikirim!");
      closeModal();
    })
    .catch(() => alert("Gagal mengirim pesan."));
});

function bukaForm() {
  document.getElementById("popupForm").style.display = "block";
}
function tutupForm() {
  document.getElementById("popupForm").style.display = "none";
}
