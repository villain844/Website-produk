// ==== BACKGROUND OTOMATIS DARI API ====
fetch("https://sheetdb.io/api/v1/wdiag49r7wv0s")
  .then(res => res.json())
  .then(data => {
    if (data.length > 0 && data[0].background) {
      document.body.style.backgroundImage = `url('${data[0].background}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundPosition = "center";
    }
  })
  .catch(err => console.error("Gagal ambil background:", err));

// ==== PREVIEW GAMBAR ====
function showPreview(imgSrc) {
  const modal = document.getElementById("img-modal");
  const modalImg = document.getElementById("img-preview");
  modal.style.display = "flex";
  modalImg.src = imgSrc;
}

function closeModal() {
  document.getElementById("img-modal").style.display = "none";
  const form = document.getElementById("form-popup");
  if (form) form.style.display = "none";
}

// ==== BACA SELENGKAPNYA DESKRIPSI PRODUK ====
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector(".short-text");
  const fullText = desc.querySelector(".full-text");
  const show = fullText.style.display === "none";

  fullText.style.display = show ? "inline" : "none";
  shortText.style.display = show ? "none" : "inline";
  button.textContent = show ? "Sembunyikan" : "Lihat Selengkapnya";
}

// ==== TOMBOL BUKA FORM PESAN ====
function openMessageForm() {
  const form = document.getElementById("form-popup");
  form.style.display = "flex";
}

// ==== TOMBOL BATAL FORM PESAN ====
function cancelForm() {
  document.getElementById("form-popup").style.display = "none";
}

// ==== KIRIM PESAN KE SHEETDB ====
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-pesan");
  const notif = document.getElementById("notif");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = form.querySelector("[name='nama']").value.trim();
      const pesan = form.querySelector("[name='pesan']").value.trim();

      if (!nama || !pesan) return alert("Lengkapi semua isian!");

      const data = {
        nama: nama,
        pesan: pesan
      };

      fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data })
      })
        .then(res => res.json())
        .then(() => {
          notif.innerText = "✅ Pesan berhasil dikirim!";
          notif.style.display = "block";
          form.reset();
          setTimeout(() => {
            notif.style.display = "none";
            cancelForm();
          }, 3000);
        })
        .catch(err => {
          notif.innerText = "❌ Gagal mengirim pesan.";
          notif.style.display = "block";
          setTimeout(() => notif.style.display = "none", 3000);
        });
    });
  }
});
