
// pengambilan semua tag yang diperlukan di ls.html
const _errormsg = document.querySelector("div[name='errormsg']");
const _form = document.querySelector("form[name='login']");
const _button = _form.querySelector("input[name='onsubmit']");
const _username = _form.querySelector("input[name='username']");
const _password = _form.querySelector("input[name='password']");


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
    // eenum adalah kode error dari ErrorEnum untuk memberi tahu kode kesalahan
    (eenum) => {

      // menghilangkan attribut "hidden", sehingga tampilan error dapat dilihat
      _errormsg.removeAttribute("hidden");

      // _errormsg.innerHTML adalah isi dari <div name="errormsg" style="color:red" hidden></div> pada ls.html

      switch(eenum){
        // jika username belum dimasukkan
        case ErrorEnum.no_username:
          _errormsg.innerHTML = "Username kosong!";
          break;

        // jika password belum dimasukkan
        case ErrorEnum.no_password:
          _errormsg.innerHTML = "Password kosong!";
          break;

        // jika password yang dimasukkan salah
        case ErrorEnum.password_wrong:
          _errormsg.innerHTML = "Password salah.";
          break;
      }


      // jika error tersebut dikarenakan masalah pada backend/server/internal
      if(IsConnectionError(eenum)){
        _errormsg.innerHTML = "Masalah internal, coba lagi nanti.";
      }
    }
  );
});