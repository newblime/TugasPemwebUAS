
// ngambil elemen html dari main.html

// area postingan
const _post_area = GetTag("div", "list_postingan");

// tempat untuk menunjukkan halaman keberapa
const _page_number = GetTag("div", "page_number");

// tombol untuk navigasi postingan
const _latest_button = GetTag("button", "latest_button");
const _previous_button = GetTag("button", "previous_button");
const _next_button = GetTag("button", "next_button");


// variabel sebagai limit berapa banyak postingan yang dapat diambil dalam satu halaman
let _maxget = 10;

// variabel untuk menandakan halaman keberapa
let _currentpage = 0;

// variabel untuk menggunakan filter tanggal
// tanggal ini memakai format mm-dd-yyyy
// bisa dikosongkan jika tidak memakai filter tanggal
let _datebefore = "";

// contoh untuk ngambil data sebelum tanggal 28-Mei-2023
//let _datebefore = "5-28-2023";



// fungsi untuk mengambil data postingan
// dibuat fungsi agar tinggal panggil fungsi jika memakai tombol seperti diakhir file codingan ini
function ambil_data(tanggal_sebelum, page){

  // memanggil fungsi untuk mengambil data postingan
  GetPost(
    // berapa banyak postingan yang diambil dalam satu halaman
    _maxget,

    // postingan sebelum tanggal tertentu
    tanggal_sebelum, 

    // callback ketika sukses mengambil data
    // page_terakhir (boolean) menunjukkan apakah halaman sekarang adalah halaman terakhir
    // nomor_page (number) menunjukkan halaman keberapa
    // data_postingan (PostData[]) kumpulan/array berisi data postingan
    (page_terakhir, nomor_page, data_postingan) => {
      // _currentpage hanya di-set disini
      _currentpage = nomor_page;

      // jika paling depan
      // tombol untuk halaman kesebelum, di-nonaktifkan
      if(nomor_page <= 0){
        _latest_button.setAttribute("disabled", "");
        _previous_button.setAttribute("disabled", "");
      }
      // jika tidak paling depan
      // tombol untuk halaman kesebelum, di-aktifkan
      else{
        _latest_button.removeAttribute("disabled");
        _previous_button.removeAttribute("disabled");
      }

      // jika paling belakang
      // tombol untuk halaman kesetelah, di-nonaktifkan
      if(page_terakhir){
        _next_button.setAttribute("disabled", "");
      }
      // jika bukan paling belakang
      // tombol untuk halaman kesetelah, di-aktifkan
      else{
        _next_button.removeAttribute("disabled");
      }


      // jika data_postingan berisi
      if(data_postingan.length > 0){
        // tunjukkan halaman keberapa
        _page_number.innerHTML = `Page ke-${_currentpage}`;

        // area postingan dihapus dulu
        _post_area.innerHTML = "";

        // lalu area postingan diisi
        for(let i = 0; i < data_postingan.length; i++){
          let _data_post = data_postingan[i];

          // jika yang memposting mencantumkan gambar
          // jika URL kosong, maka yang memposting tidak mencantumkan gambar
          let _img_html = "";
          if(_data_post.GetImageURL() != "")
            _img_html = `<image src="${_data_post.GetImageURL()}" style="max-width: 100px; max-height: 100px;">`;
      
          // area postingan ditambahkan dengan format html seperti berikut
          _post_area.innerHTML += `
            <div style="font-weight: bold; display: inline;">@${_data_post.GetUsername()}</div><div> Pada saat ${_data_post.GetDatePosted().toLocaleString()}</div>
            <div>Di lokasi: ${_data_post.GetLocation()}</div>
            <br>
            <div>${_data_post.GetMessage()}</div>
            ${_img_html}
            <br>
            <br>
            <br>
          `;
        }
      }
    },

    // callback ketika terjadi kesalahan teknis
    (eenum) => {
      _post_area.innerHTML = "Terjadi kesalahan: " + GetDefaultErrorMessage(eenum);
    },

    // nomor halaman sekarang
    page
  );
}


// jika tombol selanjutnya ditekan
_next_button.addEventListener('click', () => {
  // page diisi satu halaman setelah _currentpage (halaman selanjutnya)
  ambil_data(_datebefore, _currentpage + 1);
});

// jika tombol sebelumnya ditekan
_previous_button.addEventListener('click', () => {
  // page diisi satu halaman sebelum _currentpage (halaman sebelumnya)
  ambil_data(_datebefore, _currentpage - 1);
});

// jika tombol paling awal ditekan
_latest_button.addEventListener('click', () => {
  // page diisi halaman pertama (paling awal)
  ambil_data(_datebefore, 0);
});



// inisialisasi postingan dengan halaman pertama (dari 0)
ambil_data(_datebefore, 0);