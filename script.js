// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
  }, 3000);
});

// Preview gambar
function showPreview(src) {
  const modal = document.getElementById("img-modal");
  const img = document.getElementById("img-preview");
  modal.style.display = "flex";
  img.src = src;
}

// Tutup modal
function closeModal() {
  document.getElementById("img-modal").style.display = "none";
  document.getElementById("form-popup").style.display = "none";
}

// Toggle form kirim pesan
function toggleMessageForm() {
  document.getElementById("form-popup").style.display = "flex";
}

// Deskripsi produk
function toggleDesc(btn) {
  const parent = btn.parentElement;
  const short = parent.querySelector('.short-text');
  const full = parent.querySelector('.full-text');
  const isHidden = full.style.display === 'none';
  short.style.display = isHidden ? 'none' : 'inline';
  full.style.display = isHidden ? 'inline' : 'none';
  btn.textContent = isHidden ? 'Sembunyikan' : 'Lihat Selengkapnya';
}

// Ambil background dari API
fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s")
  .then(res => res.json())
  .then(data => {
    if (data.length > 0) {
      document.body.style.backgroundImage = `url('${data[0].background}')`;
    }
  });

// Ambil produk dari API
fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("productContainer");
    data.forEach(prod => {
      const el = document.createElement("div");
      el.className = "product-card";
      el.innerHTML = `
        <img src="${prod.foto}" class="product-img" onclick="showPreview('${prod.foto}')">
        <div class="product-info">
          <h3>${prod.nama}</h3>
          <div class="price">IDR ${prod.harga}</div>
          <div class="stock">Stok: ${prod.stok}</div>
          <p class="desc">
            <span class="short-text">${prod.deskripsi.substring(0, 40)}...</span>
            <span class="full-text" style="display:none;">${prod.deskripsi}</span>
          </p>
          <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
          <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(prod.nama)}" target="_blank">Order</a>
        </div>
      `;
      container.appendChild(el);
    });
  });

// Kirim pesan ke SheetDB
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const pesan = document.getElementById("pesan").value;

  fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [{ nama, pesan }] })
  }).then(res => {
    if (res.ok) {
      alert("Pesan berhasil dikirim!");
      closeModal();
    } else {
      alert("Gagal mengirim pesan.");
    }
  });
});
