// Preview gambar (produk, banner, profil)
function showPreview(src) {
  const modal = document.getElementById("img-modal");
  const preview = document.getElementById("img-preview");
  modal.style.display = "flex";
  preview.src = src;
}

// Tutup modal gambar atau form
function closeModal() {
  const imgModal = document.getElementById("img-modal");
  const formPopup = document.getElementById("form-popup");
  if (imgModal) imgModal.style.display = "none";
  if (formPopup) formPopup.style.display = "none";
}

// Toggle deskripsi (lihat selengkapnya / sembunyikan)
function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector('.short-text');
  const fullText = desc.querySelector('.full-text');
  const show = fullText.style.display === 'none';
  fullText.style.display = show ? 'inline' : 'none';
  shortText.style.display = show ? 'none' : 'inline';
  button.textContent = show ? 'Sembunyikan' : 'Lihat Selengkapnya';
}

// Toggle floating menu
function toggleMenu() {
  const menu = document.getElementById("menuItems");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Kirim data ke SheetDB dari form
document.getElementById("messageForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data
  })
  .then(res => res.json())
  .then(() => {
    alert("✅ Pesan berhasil dikirim!");
    form.reset();
    closeModal();
  })
  .catch(() => alert("❌ Gagal mengirim pesan. Coba lagi."));
});
