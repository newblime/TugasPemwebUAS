
// pengambilan semua tag yang diperlukan di main.html
const _login_div = document.querySelector("div[name='login_status']");


// ngambil data user
GetCurrentUser(
  // callback jika sukses
  (obj) => {

    // jika data pada obj.login itu benar/true
    // sudah login
    if(obj.login == true){

      // masukkan data html ke _login_div
      _login_div.innerHTML = `
        <!-- style untuk username --->
        <style>
          .username{
            color: blue;
            font-weight: bold;
          }
        </style>

        Halo, selamat datang,<br>
        <div class="username">

          <!-- Masukkan username pakai obj.user.GetUsername() --->
          ${obj.user.GetUsername()}
        </div>
        
        <!-- Tombol untuk logout --->
        <button name="logout">Logout?</button>
      `;


      // ngambil tombol logout dari tag `<button name="logout">Logout?</button>` diatas
      const _buttonLogout = _login_div.querySelector("button[name='logout']");

      // tambah listener jika tombol ditekan
      _buttonLogout.addEventListener(
        'click', 

        // callback jika tombol ditekan
        () => {

          // panggil fungsi Logout() jika tombol ditekan
          Logout(
            // callback jika logout berhasil
            () => {

            },

            // callback jika logout tidak berhasil
            (eenum) => {

            }
          );

          
          // lakukan refresh browser
          window.location.reload();
        }
      );
    }
    
    // jika data pada obj.user itu salah/false
    // masih belum login
    else{

      // masukkan data html ke _login_div
      _login_div.innerHTML = `
        Anda belum login.<br>
        
        <!-- arahkan ke ls.html --->
        <form action="/ls.html" method="get">
          <input type="submit" value="Login here">
        </form>
      `;
    }
  },


  // callback ketika terdapat error
  // lenum adalah kode error
  (lenum) => {
    console.error(`Error ketika mengambil data user. Kode error: ${lenum}.`);
  }
);