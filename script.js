function closeModal() {
  document.getElementById('form-popup').style.display = 'none';
}

function sendMessage(event) {
  event.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  if (!nama || !pesan) {
    alert("Nama dan pesan harus diisi!");
    return false;
  }

  const data = {
    nama: nama,
    pesan: pesan
  };

  fetch("https://sheetdb.io/api/v1/hkydnwssgudey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: data })
  })
  .then(res => res.json())
  .then(() => {
    alert("Pesan berhasil dikirim!");
    closeModal();
  })
  .catch(err => {
    console.error(err);
    alert("Gagal mengirim pesan.");
  });

  return false;
}
