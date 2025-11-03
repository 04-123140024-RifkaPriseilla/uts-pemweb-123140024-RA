# News Portal
Nama : Rifka Priseilla Br Silitonga (123140024)


"News Portal" dibangun menggunakan React (Vite) dan mengambil data dari NewsAPI.

Aplikasi ini memungkinkan pengguna untuk melihat artikel berita "Top Headlines" berdasarkan tiga kategori (Technology, Business, Sports) dan melakukan pencarian artikel spesifik menggunakan *keyword* serta filter rentang tanggal.

## Tampilan Aplikasi (Screenshot)

![Tampilan News Portal](screenshot/TampilanApk.png)

## Fitur Utama

* Menampilkan berita berdasarkan 3 kategori: **Technology**, **Business**, dan **Sports**.
* Form pencarian artikel berdasarkan *keyword* (minimal 3 karakter).
* Filter pencarian berdasarkan rentang tanggal ("From Date" dan "To Date").
* Daftar artikel ditampilkan dalam bentuk *card* yang berisi:
    * Thumbnail/Gambar Artikel
    * Judul Artikel
    * Sumber Berita
    * Tanggal Publikasi
* *Link* "Read more" yang mengarah ke artikel asli di halaman baru.
* Pagination sederhana untuk menavigasi halaman hasil pencarian.

## Teknologi yang Digunakan

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (`useState`, `useEffect`)
* **HTTP Client:** Axios
* **API:** [NewsAPI](https://newsapi.org/)

## Cara Instalasi dan Menjalankan Lokal

Pastikan Anda memiliki [Node.js](https://nodejs.org/) (v18 atau lebih tinggi) terinstal di komputer Anda.

1.  **Clone repository ini:**
    *(Ganti `username/nama-repo.git` dengan URL repo Anda)*
    ```bash
    git clone [https://github.com/username/nama-repo.git](https://github.com/username/nama-repo.git)
    cd nama-repo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variable:**
    Buat file baru bernama `.env` di *root* proyek. Tambahkan variabel berikut. Dapatkan API Key gratis Anda dari [NewsAPI](https://newsapi.org/).

    ```
    VITE_NEWS_API_KEY=MASUKKAN_API_KEY_ANDA_DISINI
    VITE_NEWS_API_URL=[https://newsapi.org/v2](https://newsapi.org/v2)
    ```

4.  **Jalankan aplikasi (mode development):**
    ```bash
    npm run dev
    ```

5.  Buka [http://localhost:5173](atau port lain yang muncul di terminal) di browser.

## Link Deployment

Aplikasi ini telah di-deploy menggunakan Vercel.

**Link:** [https://uts-pemweb-123140024-ra.vercel.app/]

