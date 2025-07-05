const API = "https://sheetdb.io/api/v1/vmf2cfpzd8dpr";

fetch(API)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${item.foto}" class="product-img" onclick="showPreview('${item.foto}')">
        <div class="product-info">
          <h3>${item.nama}</h3>
          <div class="price">${item.harga}</div>
          <div class="stock">Stok: ${item.stok}</div>
          <p class="desc">
            <span class="short-text">${item.deskripsi?.substring(0, 30) || ''}...</span>
            <span class="full-text" style="display:none;">${item.deskripsi || ''}</span>
          </p>
          <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
          <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(item.nama)}" target="_blank">Order</a>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('product-list').innerHTML = "<p style='text-align:center;color:red;'>Gagal memuat produk.</p>";
    console.error(err);
  });

function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector('.short-text');
  const fullText = desc.querySelector('.full-text');
  const show = fullText.style.display === 'none';
  fullText.style.display = show ? 'inline' : 'none';
  shortText.style.display = show ? 'none' : 'inline';
  button.textContent = show ? 'Sembunyikan' : 'Lihat Selengkapnya';
}

function showPreview(src) {
  const modal = document.getElementById('img-modal');
  const preview = document.getElementById('img-preview');
  modal.style.display = 'flex';
  preview.src = src;
}

function closeModal() {
  document.getElementById('img-modal').style.display = 'none';
  const form = document.getElementById('form-popup');
  if (form) form.style.display = 'none';
}
