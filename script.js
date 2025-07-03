window.onload = () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 3000);
};

function toggleDesc(button) {
  const desc = button.previousElementSibling;
  const shortText = desc.querySelector(".short-text");
  const fullText = desc.querySelector(".full-text");
  const show = fullText.style.display === "none";
  fullText.style.display = show ? "inline" : "none";
  shortText.style.display = show ? "none" : "inline";
  button.textContent = show ? "Sembunyikan" : "Lihat Selengkapnya";
}

function closeModal() {
  document.getElementById("form-popup").style.display = "none";
}

function sendMessage(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  fetch("https://sheetdb.io/api/v1/5ni7a9sbf13p3", {
    method: "POST",
    body: formData,
  })
    .then(res => {
      if (res.ok) {
        showToast();
        form.reset();
        closeModal();
      } else {
        alert("Gagal mengirim pesan");
      }
    })
    .catch(() => alert("Terjadi kesalahan jaringan"));
  return false;
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
