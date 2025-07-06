// Konfigurasi API
const API_PRODUK = "https://sheetdb.io/api/v1/vmf2cfpzd8dpr";
const API_PESAN = "https://sheetdb.io/api/v1/hkydnwssgudey";

// Tampilkan produk dari API
document.addEventListener("DOMContentLoaded", () => {
  fetch(API_PRODUK)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("product-list");
      container.innerHTML = "";
      if (!data.length) {
        container.innerHTML = "<p style='text-align:center;'>Belum ada produk.</p>";
        return;
      }

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
              <span class="short-text">${p.deskripsi.slice(0, 30)}...</span>
              <span class="full-text" style="display:none;">${p.deskripsi}</span>
            </p>
            <button class="read-more" onclick="toggleDesc(this)">Lihat Selengkapnya</button>
            <a class="order-btn" href="https://wa.me/6285134380708?text=BG+MAU+ORDER+${encodeURIComponent(p.nama)}" target="_blank">Order</a>
          </div>`;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Gagal mengambil produk:", err);
    });
});

// Kirim pesan dengan ID otomatis
document.getElementById("pesanForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = e.target.nama.value.trim();
  const pesan = e.target.pesan.value.trim();

  if (!nama || !pesan) {
    showToast("Isi semua kolom!", "#ffaa00");
    return;
  }

  try {
    // Ambil semua data pesan untuk menentukan ID terakhir
    const resGet = await fetch(API_PESAN);
    const data = await resGet.json();
    const idBaru = (data.length + 1).toString();

    // Kirim pesan
    const res = await fetch(API_PESAN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{ id: idBaru, nama, pesan }]
      })
    });

    if (res.ok) {
      showToast("Pesan berhasil dikirim!");
      e.target.reset();
      closeModal();
    } else {
      showToast("Gagal mengirim pesan", "#ff5555");
    }
  } catch (err) {
    console.error("Gagal kirim pesan:", err);
    showToast("Kesalahan jaringan", "#ff4444");
  }
});

// Toggle deskripsi "lihat selengkapnya"
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector(".short-text");
  const fullText = desc.querySelector(".full-text");
  const show = fullText.style.display === "none";
  fullText.style.display = show ? "inline" : "none";
  shortText.style.display = show ? "none" : "inline";
  button.textContent = show ? "Sembunyikan" : "Lihat Selengkapnya";
}

// Modal preview gambar
function showPreview(src) {
  const modal = document.getElementById("img-modal");
  const preview = document.getElementById("img-preview");
  modal.style.display = "flex";
  preview.src = src;
}

// Tutup modal gambar & pesan
function closeModal() {
  const imgModal = document.getElementById("img-modal");
  const formPopup = document.getElementById("form-popup");
  if (imgModal) imgModal.style.display = "none";
  if (formPopup) formPopup.style.display = "none";
}

// Notifikasi toast
function showToast(message, color = "#00c6ff") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "-50px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = color;
  toast.style.color = "#fff";
  toast.style.padding = "14px 24px";
  toast.style.borderRadius = "12px";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  toast.style.fontWeight = "bold";
  toast.style.zIndex = 9999;
  toast.style.opacity = 0;
  toast.style.transition = "all 0.4s ease";
  document.body.appendChild(toast);
  setTimeout(() => toast.style.top = "30px", 100);
  setTimeout(() => toast.style.opacity = 1, 100);
  setTimeout(() => {
    toast.style.top = "-50px";
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
