
window.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    preloader.style.display = "none";
    mainContent.style.display = "block";
  }, 3000);
});

function toggleDesc(btn) {
  const desc = btn.previousElementSibling;
  const shortText = desc.querySelector(".short-text");
  const fullText = desc.querySelector(".full-text");
  const isHidden = fullText.style.display === "none";
  shortText.style.display = isHidden ? "none" : "inline";
  fullText.style.display = isHidden ? "inline" : "none";
  btn.textContent = isHidden ? "Sembunyikan" : "Lihat Selengkapnya";
}

function showPreview(src) {
  document.getElementById("img-modal").style.display = "flex";
  document.getElementById("img-preview").src = src;
}

function closeModal() {
  document.getElementById("img-modal").style.display = "none";
  const form = document.getElementById("form-popup");
  if (form) form.style.display = "none";
}
