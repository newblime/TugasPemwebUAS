
// pengambilan semua tag yang diperlukan di login.html
const _errormsg = document.querySelector("div[class='errormsg']");
const _username = GetTag("input", "username");
const _password = GetTag("input", "password");
const _submit_button = GetTag("input", "onsubmit");
const _cancel_button = GetTag("input", "oncancel")


// ketika pada tombol <input type="button" name="onsubmit" value="Login"> di login.html ditekan
_submit_button.addEventListener('click', () => {

  // manggil fungsi backend untuk login atau signup
  LoginSignup(
    // username yang dimasukkan
    _username.value,

    // password yang dimasukkan
    _password.value,
    
    // callback jika berhasil, untuk cari tahu lebih lanjut: https://id.javascript.info/callbacks
    // lenum adalah nomor kode pada LoginStatusEnum untuk mencari tahu apakah sukses karena login atau signup.
    (lenum) => {
      switch(lenum){
        // jika sukses karena login
        case LoginStatusEnum.Login:
          break;

        // jika sukses karena signup
        case LoginStatusEnum.Signup:
          break;
      }

      // langsung pindah ke main.html
      document.location.href = "home.html";
    },
  
    
    // callback jika ada kesalahan
    // eenum adalah kode error dari BackendError untuk memberi tahu kode kesalahan
    (eenum) => {

      // tampilkan elemen "errormsg"
      _errormsg.style.opacity = "0.6";

      // _errormsg.innerHTML adalah isi dari <div name="errormsg" style="color:red" hidden></div> pada BackendError
      // GetDefaultErrorMessage() adalah fungsi untuk mengambil error message
      _errormsg.innerHTML = GetDefaultErrorMessage(eenum);
    }
  );
});

_cancel_button.addEventListener('click', () => {
  window.location.href = "home.html";
});