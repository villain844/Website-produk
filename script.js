// Ambil data produk dari SheetDB
fetch("https://sheetdb.io/api/v1/vmf2cfpzd8dpr")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("produk-container");
    data.forEach((item) => {
      const produk = document.createElement("div");
      produk.className = "product-card";
      produk.innerHTML = `
        <img src="${item.foto}" class="product-img" onclick="showPreview('${item.foto}')" />
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
      container.appendChild(produk);
    });
  })
  .catch(error => {
    console.error("Gagal memuat produk:", error);
  });


// Fungsi toggle deskripsi
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector('.short-text');
  const fullText = desc.querySelector('.full-text');
  const show = fullText.style.display === 'none';
  fullText.style.display = show ? 'inline' : 'none';
  shortText.style.display = show ? 'none' : 'inline';
  button.textContent = show ? 'Sembunyikan' : 'Lihat Selengkapnya';
}

// Fungsi tampilkan gambar besar
function showPreview(src) {
  const modal = document.getElementById('img-modal');
  const preview = document.getElementById('img-preview');
  modal.style.display = 'flex';
  preview.src = src;
}

// Tutup modal gambar atau form
function closeModal() {
  document.getElementById('img-modal').style.display = 'none';
  const form = document.getElementById('form-popup');
  if (form) form.style.display = 'none';
}

// Kirim notifikasi sukses setelah form dikirim
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", () => {
      setTimeout(() => {
        alert("Pesan berhasil dikirim!");
      }, 1000);
    });
  }
});

// Kirim pesan ke SheetDB API
const formEl = document.getElementById("kirim-form");
if (formEl) {
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = this.nama.value.trim();
    const pesan = this.pesan.value.trim();

    if (!nama || !pesan) return;

    fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            nama: nama,
            pesan: pesan,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Pesan berhasil dikirim!");
        this.reset();
        closeModal();
      })
      .catch(() => {
        alert("Gagal mengirim pesan. Silakan coba lagi.");
      });
  });
}
