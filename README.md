# Chatbot AI untuk Analisis Database

## Teknologi yang Digunakan
- **Backend**: Node.js, Express, MySQL, dan Ollama AI
- **Frontend**: Antarmuka dengan Tailwind CSS

## Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (v14 ke atas)
- [MySQL](https://www.mysql.com/) (lokal)
- [Ollama](https://ollama.ai/) dengan model **deepseek-r1** atau lainnya

## Instalasi


1. **Masukan Ke folder Public/index.html:**
   ```sh
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI CHAT</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen p-5 flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold text-white mb-4">AI CHAT</h1>
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg">
        <div id="chatBox" class="h-96 overflow-y-auto p-6 bg-gray-800">
            <div class="mb-3 p-4 bg-blue-200 rounded-xl text-gray-800 max-w-[75%]">Halo! Tanya aja tentang Produk</div>
        </div>
        <div class="flex p-5 border-t">
            <input id="chatInput" class="flex-1 p-3 border-2 border-gray-300 rounded-full mr-3 focus:border-blue-500 outline-none" type="text" placeholder="Type your message...">
            <button onclick="sendMessage()" class="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">Kirim</button>
        </div>
    </div>

    <script>
        async function sendMessage() {
            const input = document.getElementById('chatInput');
            const chatBox = document.getElementById('chatBox');
            const message = input.value.trim();
            if (!message) return;

            chatBox.innerHTML += `<div class="mb-3 p-4 bg-blue-500 text-white rounded-xl max-w-[75%] ml-auto text-right">${message}</div>`;

            try {
                const response = await fetch('http://localhost:3000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message })
                });
                const data = await response.json();
                chatBox.innerHTML += `<div class="mb-3 p-4 bg-blue-200 rounded-xl text-gray-800 max-w-[75%]">${data.response || "Gak ngerti, bro."}</div>`;
            } catch (error) {
                chatBox.innerHTML += `<div class="mb-3 p-4 bg-red-200 rounded-xl text-gray-800 max-w-[75%]">Error: ${error.message}</div>`;
            }

            input.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        document.getElementById('chatInput').addEventListener("keypress", (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    </script>
</body>
</html>
   ```

2. **Instal dependensi:**
   ```sh
   npm install express mysql2 cors
   ```

3. **Instal Ollama dan jalankan model AI:**
   ```sh
   curl -fsSL https://ollama.com/install.sh | sh
   ollama run deepseek-r1:7b
   ```

## Menjalankan Aplikasi

Setelah instalasi selesai, jalankan server dengan perintah berikut:
```sh
node server.js
```

# Salama INTERAKSI BUN...

---
