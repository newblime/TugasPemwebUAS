
// ngambil elemen html dari main.html

// area postingan
const _post_area = GetTag("div", "posting_area");

// tempat untuk menunjukkan halaman keberapa
const _page_number = GetTag("div", "page_number");

const _dataload_status = GetTag("div", "status_load");
const _dataload_trigger = GetTag("div", "data_load");

const _filter_date = GetTag("input", "filter_date");
const _filter_button = GetTag("input", "filter_button")


// variabel sebagai limit berapa banyak postingan yang dapat diambil dalam satu halaman
let _maxget = 10;

let _sedangNgambil = false;

// variabel untuk menandakan halaman keberapa
let _currentpage = 0;

let _pageTerakhir = false;

// variabel untuk menggunakan filter tanggal
// tanggal ini memakai format mm-dd-yyyy
// bisa dikosongkan jika tidak memakai filter tanggal
let _datebefore = "";

// contoh untuk ngambil data sebelum tanggal 28-Mei-2023
//let _datebefore = "5-28-2023";

_post_area.innerHTML = "";

function tunjukkan_clear(){
  _dataload_status.innerHTML = `
    <div style="padding-bottom:100%">
  `;
}

function tunjukkan_akhirpage(){
  _dataload_status.innerHTML = `
    <h2 style="opacity: 0.3">
      Anda sudah diakhir page.
    </h2>
  `;
}

// tidak digunakan karena instan
function tunjukkan_loading(){
  
}

function clear_data(){
  _post_area.innerHTML = "";
}

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

      _pageTerakhir = page_terakhir;
      if(_pageTerakhir)
        tunjukkan_akhirpage();
      else
        tunjukkan_clear();
        
        
      // jika data_postingan berisi
      if(data_postingan.length > 0){
        // lalu area postingan diisi
        for(let i = 0; i < data_postingan.length; i++){
          let _data_post = data_postingan[i];
          let _height = 9;
          let _width = 2.5;

          // jika yang memposting mencantumkan gambar
          // jika URL kosong, maka yang memposting tidak mencantumkan gambar
          let _img_html = "";
          if(_data_post.GetImageURL() != ""){
            _img_html = `<image src="${_data_post.GetImageURL()}" name="gambar_postingan" alt="foto postingan">`;
            _height = 4.5;
            _width = 2.7;
          }
      
          // area postingan ditambahkan dengan format html seperti berikut
          _post_area.innerHTML += `
            <div class="box-posted">
              <div class="posted">
                <div class="text-post">
                  <h1>${_data_post.GetUsername()}</h1>
                  <h2>${_data_post.GetDatePosted().toLocaleString()}</h2>
                  <br>
                  <img src="asset/icon/location.png" style="width:${_width}%; height:${_height}%; opacity:0.4;">
                  <h3 style="display:inline;">${_data_post.GetLocation()}</h3>
                  <p>
                  ${_data_post.GetMessage()}
                  </p>
                </div>

                ${_img_html}
              </div>
            </div>
          `;
        }
      }

      _sedangNgambil = false;
    },

    // callback ketika terjadi kesalahan teknis
    (eenum) => {
      //_post_area.innerHTML = "Terjadi kesalahan: " + GetDefaultErrorMessage(eenum);
      _sedangNgambil = false;
    },

    // nomor halaman sekarang
    page
  );
}

window.onscroll = () => {
  // check scroll to data_load
  if((_dataload_trigger.getBoundingClientRect().y - window.outerHeight) < 0 && !_sedangNgambil && !_pageTerakhir){
    _sedangNgambil = true;
    tunjukkan_loading();
    ambil_data(_datebefore, _currentpage+1);
  }
}

_filter_button.addEventListener('click', (event) => {
  if(_datebefore != _filter_date.value){
    _datebefore = _filter_date.value;
  
    clear_data();
    ambil_data(_datebefore, 0);
  }
});


// inisialisasi postingan dengan halaman pertama (dari 0)
ambil_data(_datebefore, 0);