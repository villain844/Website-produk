// BACKGROUND dinamis dari SheetDB
fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s")
  .then(res => res.json())
  .then(data => {
    if (data.length > 0) {
      document.body.style.background = `url('${data[0].background}') no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
    }
  });

// PRODUK dinamis dari SheetDB
fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-container");
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${item.foto}" class="product-img" onclick="showPreview('${item.foto}')">
        <div class="product-info">
          <h3>${item.nama}</h3>
          <div class="price">IDR ${item.harga}</div>
          <div class="stock">Stok: ${item.stok}</div>
          <p class="desc">
            <span class="short-text">${item.deskripsi.substring(0, 40)}...</span>
            <span class="full-text" style="display:none;">${item.deskripsi}</span>
          </p>
          <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
          <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(item.nama)}" target="_blank">Order</a>
        </div>
      `;
      container.appendChild(div);
    });
  });

// Tampilkan modal gambar
function showPreview(src) {
  document.getElementById("img-modal").style.display = "flex";
  document.getElementById("img-preview").src = src;
}

// Tutup modal
function closeModal() {
  document.getElementById("img-modal").style.display = "none";
  document.getElementById("form-popup").style.display = "none";
}

// Toggle deskripsi panjang
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector('.short-text');
  const fullText = desc.querySelector('.full-text');
  const show = fullText.style.display === 'none';
  shortText.style.display = show ? 'none' : 'inline';
  fullText.style.display = show ? 'inline' : 'none';
  button.textContent = show ? 'Sembunyikan' : 'Lihat Selengkapnya';
}
