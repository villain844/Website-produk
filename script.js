document.getElementById("form-pesan").addEventListener("submit", function (e) {
  e.preventDefault();

  const notifikasi = document.getElementById("notifikasi");
  notifikasi.textContent = "Mengirim pesan...";
  notifikasi.style.display = "block";

  const data = {
    nama: this.nama.value,
    pesan: this.pesan.value
  };

  fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: data })
  })
    .then(res => {
      if (res.ok) {
        notifikasi.textContent = "✅ Pesan berhasil dikirim!";
        this.reset();
        // Tutup form popup
        document.getElementById("form-popup").style.display = "none";
      } else {
        notifikasi.textContent = "❌ Gagal mengirim pesan.";
      }
      resetNotifikasi();
    })
    .catch(() => {
      notifikasi.textContent = "❗ Terjadi kesalahan jaringan.";
      resetNotifikasi();
    });

  function resetNotifikasi() {
    setTimeout(() => {
      notifikasi.style.display = "none";
    }, 3000);
  }
});
