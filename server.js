const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = 3000; // sesuaikan dengan port yang diinginkan

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createPool({ // sesuaikan dengan konfigurasi database Anda
  host: "localhost",
  user: "root",
  password: "DimasPenjualan123",
  database: "ai_chat_db",
});

(async () => { // test koneksi ke database
  try {
    await db.getConnection();
    console.log("DB connected!");
  } catch (err) {
    console.error("DB error:", err);
  }
})();

app.get("/produk/:nama", async (req, res) => { // get data
  try {
    const [rows] = await db.query("SELECT jumlah, harga FROM produk WHERE nama = ?", [req.params.nama]);
    if (!rows[0]) return res.json({ message: `${req.params.nama} gak ada` });
    res.json({ jumlah: rows[0].jumlah, harga: rows[0].harga });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/chat", async (req, res) => { // chat ai untuk interface
  const { message } = req.body;
  try {
    const [rows] = await db.query("SELECT nama, jumlah, harga FROM produk");
    const produk = rows.map(r => `${r.nama}: ${r.jumlah}, Rp${r.harga}`).join("; ");
    const prompt = `
      Jawab singkat max 10 kata, hanya stok/harga, santai.
      Data: ${produk}.
      "${message}"
    `;

    exec(`echo "${prompt}" | ollama run deepseek-r1:7b`, (err, stdout) => {
      if (err) return res.status(500).json({ response: "AI error" });
      res.json({ response: stdout.trim() || "Gak ngerti, bro." });
    });
  } catch (err) {
    res.status(500).json({ response: "DB error" });
  }
});

app.listen(PORT, () => console.log(`Server on at ${PORT}`)); // jalankan server