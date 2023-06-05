
// pengambilan semua tag yang diperlukan di main.html
const _homepage = GetTag("div", "home_part");
const _profile_name = GetTag("div", "profile_name");
const _page_type = GetTag("div", "page_type").innerHTML;

const _navlink = GetTag("ul", "navigation_link");
const _navlink_css = document.querySelector(".nav-link");


const _navlink_width = "70";
const _navlink_width_type = "vh";

// ngambil data user
GetCurrentUser(
  // callback jika sukses
  (obj) => {

    // jika data pada obj.login itu benar/true
    // sudah login
    if(obj.GetLoginState()){
      if(_page_type == 1){
        _homepage.innerHTML = "";
        _homepage.style["padding-top"] = "7vh";
  
        // masukkan data html ke _login_div
        _navlink.innerHTML = `
          <li>
            <a class="profile" href="posting.html">Pengaduan</a>
          </li>
          <li>
            <a class="profile" href="profile.html">Profil</a>
          </li>
          <li>
            <a class="sign-up" href="php_function/Logout.php">Logout</a>
          </li>
        `;
  
        _navlink.style.width = new String(_navlink_width) + _navlink_width_type;  
      }
      else if(_page_type == 2){
        _navlink.innerHTML = `
          <li>
            <a class="sign-up" href="posting.html">Pengaduan</a>
          </li>
          <li>
            <a class="sign-up" href="home.html">Lihat Aduan</a>
          </li>
          <li>
            <a class="sign-up" href="php_function/Logout.php">Logout</a>
          </li>
        `;
  
        _navlink.style.width = new String(_navlink_width) + _navlink_width_type;
  
        _profile_name.innerHTML = `
          <h1>${obj.GetUsername()}</h1>
        `;
      }
    }
    
    // jika data pada obj.user itu salah/false
    // masih belum login
    else{
      if(_page_type == 2){
        window.location.href = "login.html";
      }
    }
  },


  // callback ketika terdapat error
  // lenum adalah kode error
  (lenum) => {
    console.error(`Error ketika mengambil data user. Kode error: ${lenum}.`);
  }
);