
// pengambilan semua tag yang diperlukan di ls.html
const _errormsg = GetTag("div", "errormsg");
const _button = GetTag("input", "onsubmit");
const _username = GetTag("input", "username");
const _password = GetTag("input", "password");


// ketika pada tombol <input type="button" name="onsubmit" value="Login"> di ls.html ditekan
_button.addEventListener('click', () => {

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
      document.location.href = "main.html";
    },
  
    
    // callback jika ada kesalahan
    // eenum adalah kode error dari BackendError untuk memberi tahu kode kesalahan
    (eenum) => {

      // menghilangkan attribut "hidden", sehingga tampilan error dapat dilihat
      _errormsg.removeAttribute("hidden");

      // _errormsg.innerHTML adalah isi dari <div name="errormsg" style="color:red" hidden></div> pada ls.html
      // GetDefaultErrorMessage() adalah fungsi untuk mengambil error message
      _errormsg.innerHTML = GetDefaultErrorMessage(eenum);
    }
  );
});