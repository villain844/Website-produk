// Ambil background dari API SheetDB
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

// Tampilkan modal gambar besar
function showPreview(src) {
  const modal = document.getElementById("img-modal");
  const preview = document.getElementById("img-preview");
  modal.style.display = "flex";
  preview.src = src;
}

// Tutup modal gambar atau form
function closeModal() {
  document.getElementById("img-modal").style.display = "none";
  const form = document.getElementById("form-popup");
  if (form) form.style.display = "none";
}

// Toggle deskripsi “Lihat Selengkapnya”
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector('.short-text');
  const fullText = desc.querySelector('.full-text');
  const show = fullText.style.display === 'none';
  fullText.style.display = show ? 'inline' : 'none';
  shortText.style.display = show ? 'none' : 'inline';
  button.textContent = show ? 'Sembunyikan' : 'Lihat Selengkapnya';
}

// Kirim pesan ke SheetDB
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const toast = document.createElement("div");

  toast.className = "toast";
  document.body.appendChild(toast);

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        id: Date.now().toString(),
        nama: formData.get("name"),
        pesan: formData.get("message")
      };

      fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data })
      })
        .then(res => res.json())
        .then(() => {
          form.reset();
          closeModal();
          showToast("✅ Pesan berhasil dikirim!");
        })
        .catch(() => {
          showToast("❌ Gagal mengirim pesan.");
        });
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.style.top = "20px";
    toast.style.opacity = 1;

    setTimeout(() => {
      toast.style.top = "-60px";
      toast.style.opacity = 0;
    }, 3000);
  }
});
