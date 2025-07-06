// === Modal Gambar Preview ===
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

// === Toggle Deskripsi ===
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector('.short-text');
  const fullText = desc.querySelector('.full-text');
  const show = fullText.style.display === 'none';
  fullText.style.display = show ? 'inline' : 'none';
  shortText.style.display = show ? 'none' : 'inline';
  button.textContent = show ? 'Sembunyikan' : 'Lihat Selengkapnya';
}

// === Kirim Pesan (Formspree + Notifikasi Android Style) ===
document.getElementById('pesanForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    nama: form.nama.value,
    pesan: form.pesan.value
  };

  try {
    await fetch('https://formspree.io/f/xnnvrqqv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    showToast('Pesan berhasil dikirim!');
    form.reset();
    closeModal();
  } catch {
    showToast('Gagal mengirim pesan.');
  }
});

// === Notifikasi Android Style ===
function showToast(text) {
  const toast = document.createElement('div');
  toast.textContent = text;
  toast.style.position = 'fixed';
  toast.style.top = '10px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#00ffff';
  toast.style.color = '#000';
  toast.style.padding = '10px 16px';
  toast.style.borderRadius = '8px';
  toast.style.fontWeight = 'bold';
  toast.style.zIndex = '9999';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// === Ambil Produk Otomatis dari SheetDB ===
async function loadProducts() {
  const container = document.getElementById('product-list');
  try {
    const res = await fetch('https://sheetdb.io/api/v1/vmf2cfpzd8dpr');
    const data = await res.json();

    container.innerHTML = '';

    data.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product-card';

      item.innerHTML = `
        <img src="${product.foto}" class="product-img" onclick="showPreview(this.src)" />
        <div class="product-info">
          <h3>${product.nama}</h3>
          <div class="price">IDR ${product.harga}</div>
          <div class="stock">Stok: ${product.stok}</div>
          <p class="desc">
            <span class="short-text">${product.deskripsi.slice(0, 40)}...</span>
            <span class="full-text" style="display:none;">${product.deskripsi}</span>
          </p>
          <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
          <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(product.nama)}" target="_blank">Order</a>
        </div>
      `;

      container.appendChild(item);
    });

  } catch (err) {
    container.innerHTML = '<p style="text-align:center;">Gagal memuat produk.</p>';
  }
}

// === Ambil Background dari SheetDB (API Background) ===
async function applyBackground() {
  try {
    const res = await fetch('https://sheetdb.io/api/v1/wdiag49r7wv0s');
    const data = await res.json();
    const background = data[0]?.background;
    if (background) {
      document.body.style.backgroundImage = `url('${background}')`;
    }
  } catch {
    console.warn('Gagal memuat background.');
  }
}

// === Mulai Semua ===
loadProducts();
applyBackground();
