
// ngambil element html dari posting.html
const _errormsg = document.querySelector("div[class='errormsg']");
const _location = document.querySelector("input[name='location_name']");
const _post_msg = document.querySelector("textarea[name='post_msg']");
const _post_img = document.querySelector("input[name='post_img']");
const _submit_button = document.querySelector("input[name='onsubmit']");
const _cancel_button = document.querySelector("input[name='oncancel']");


GetCurrentUser(
  (obj) => {
    if(!obj.GetLoginState()){
      window.location.href = 'login.html';
    }
  }
)


// buat jalanin fungsi jika tombol "onsubmit" dipencet
_submit_button.addEventListener('click', () => {
  
  // manggil fungsi SendPost untuk submit data
  SendPost(
    // lokasi yang diinput
    _location.value,

    // deskripsi postingan
    _post_msg.value,

    // gambar yang dicantumkan di postingan
    _post_img.files[0],

    // callback jika berhasil submit postingan
    () => {
      // langsung pindah kehalaman home.html
      window.location.href = "home.html";
    },

    // callback jika terdapat kegagalan saat submit postingan
    (eenum) => {

      // tampilkan elemen "errormsg"
      _errormsg.style.opacity = "0.6";

      // tambahkan message dari error tersebut
      _errormsg.innerHTML = GetDefaultErrorMessage(eenum);
    },
  );
});


_cancel_button.addEventListener('click', () => {
  window.location.href = "home.html";
});