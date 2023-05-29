


const _timeout_ms = 15000;


/**
 * Kelas sebagai kode status
 */
class LoginStatusEnum{
  static status_login = 0;
  static status_signup = 1;
}


/**
 * Kelas yang menyimpan kode error
 */
class BackendError{
  static no_username = 0;
  static no_password = 1;

  static username_already_exist = 2;
  static username_not_found = 3;
  static password_wrong = 4;

  static already_logout = 5;

  static not_a_file = 6;
  static not_supported_type = 7;

  static location_name_too_long = 8;
  static no_location = 9;

  static no_desc_or_image = 10;

  static empty_result = 11;

  static username_has_special_characters;

  static conection_error = 0xffff0000;

  static timeout = 0x00010000;
  static cannot_connect = 0x00020000;

  static internal_error = 0x00030000;


  #error;

  /**
   * @param {number} err 
   *  Error berdasarkan yang tercantum di kelas ini
   */
  constructor(err){
    this.#error = err;
  }

  /**
   * Untuk mendapatkan kode error
   * @returns {number}
   *  Angka kode error
   */
  GetError(){
    return this.#error;
  }
}


/**
 * Kelas yang menyimpan data-data user
 */
class UserData {
  #login;
  #username;
  #date_created;

  constructor(login, username, date_created){
    this.#login = login;
    this.#username = username;
    
    if(date_created === Date)
      this.#date_created = date_created;
    else
      this.#date_created = new Date(date_created);
  }

  /**
   * Untuk mencari tahu apakah yang sekarang sedang login
   * @returns {boolean}
   *  true jika pengguna website sudah login
   */
  GetLoginState(){
    return this.#login;
  }
  
  /**
   * Memberi tahu nama pengguna
   * @returns {String}
   *  Nama dari pengguna
   */
  GetUsername(){
    return this.#username;
  }

  /**
   * Memberi tahu kapan pengguna membuat akunnya
   * @returns {Date}
   *  Tanggal kapan pengguna membuat akunnya
   */
  GetDate(){
    return this.#date_created;
  }
}



// kelas yang menyimpan data-data postingan
class PostData{
  #post_id;
  #username;
  #date_posted;
  #message;
  #image_url;
  #location_desc;


  constructor(post_id, username, date_posted, message, image_url, location_desc){
    this.#post_id = post_id;
    this.#username = username;
    this.#date_posted = new Date(date_posted);
    this.#message = message;
    this.#image_url = image_url;
    this.#location_desc = location_desc;
  }

  
  /**
   * Untuk mengambil ID postingan
   * @returns {string}
   *  ID postingan
   */
  GetPostID(){
    return this.#post_id;
  }


  /**
   * Untuk mengambil nama pengguna yang memposting
   * @returns {string}
   *  Nama pengguna
   */
  GetUsername(){
    return this.#username;
  }

  /**
   * Untuk mengambil tanggal postingan
   * @returns {Date}
   *  Tanggal postingan 
   */
  GetDatePosted(){
    return this.#date_posted;
  }

  /**
   * Untuk mengambil deskripsi pada postingan
   * @returns {string}
   *  Deskripsi postingan
   */
  GetMessage(){
    return this.#message;
  }

  /**
   * Untuk mendapatkan URL pada gambar yang diupload oleh pengguna yang memposting
   * @returns {string}
   *  URL gambar
   */
  GetImageURL(){
    return this.#image_url;
  }

  /**
   * Untuk mendapatkan deskripsi lokasi yang diberikan oleh pengguna yang memposting
   * @returns {string}
   *  Deskripsi lokasi
   */
  GetLocation(){
    return this.#location_desc;
  }
}



/**
 * Untuk mencari tahu apakah kode error tersebut adalah kesalahan server atau tidak
 * 
 * @param {Number} eenum
 *  Kode dari BackendError
 *   
 * @returns {boolean}
 *  true jika error tersebut adalah kesalahan server 
 */
function IsConnectionError(eenum){
  return (BackendError.conection_error & eenum) > 0;
}


/**
 * Untuk mendapatkan pesan error yang sudah disediakan
 * 
 * @param {BackendError} backenderr 
 *  Kelas yang menyimpan data error ketika menjalankan fungsi backend
 * 
 * @returns {String}
 *  Pesan error yang disediakan
 */
function GetDefaultErrorMessage(backenderr){
  let eenum = backenderr.GetError();

  // jika terdapat kesalahan pada koneksi
  if(IsConnectionError(eenum))
    return "Terjadi kesalahan dengan server. Ulangi lagi nanti.";

  switch(eenum){
    // jika username belum dimasukkan
    case BackendError.no_username:
      return "Username kosong!";

    // jika password belum dimasukkan
    case BackendError.no_password:
      return "Password kosong!";

    // jika username sudah ada (saat login)
    case BackendError.username_already_exist:
      return "Username sudah diambil.";

    // jika username tidak ditemukan (saat login)
    case BackendError.username_not_found:
      return "Username tidak ditemukan.";

    // jika password yang dimasukkan salah
    case BackendError.password_wrong:
      return "Password salah.";

    // jika belum login
    case BackendError.already_logout:
      return "Anda belum login.";

    // jika file yang diupload bukan file
    case BackendError.not_a_file:
      return "File yang diupload bukan file.";

    // jika file yang diupload bukan file yang disupport
    case BackendError.not_supported_type:
      return "File yang diupload tidak sesuai tipenya.";

    // jika nama lokasi terlalu panjang
    case BackendError.location_name_too_long:
      return "Nama lokasi terlalu panjang!";
    
    // jika nama lokasi kosong
    case BackendError.no_location:
      return "Nama lokasi kosong!";

    // jika tidak terdapat deskripsi atau gambar yang dicantumkan
    case BackendError.no_desc_or_image:
      return "Berikan deskripsi atau gambar kejadian.";

    // jika hasil setelah mencari postingan kosong
    case BackendError.empty_result:
      return "Hasil kosong.";

    case BackendError.username_has_special_characters:
      return "Username terdapat karakter spesial.";
  }
}













/**
 * Fungsi untuk mengambil data user dari sisi backend
 * 
 * @param {function(UserData)} callback
 *  Callback ketika sukses mengambil data user
 * 
 * @param {function(BackendError)} errorCallback
 *  Callback ketika terjadi kesalahan pada sistem
 */
function GetCurrentUser(callback, errorCallback){
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", "php_function/get_current_user.php", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    errorCallback(new BackendError(BackendError.timeout));
  }, _timeout_ms);

  xmlhttp.onload = () => {
    clearTimeout(_timeoutHand);

    if(xmlhttp.status == 200){
      let object = JSON.parse(xmlhttp.responseText);
      let _result;

      if(object["login"] == 1)
        _result = new UserData(true, object["user"]["username"], object["user"]["date_created"]);
      else
        _result = new UserData(false);

      callback(_result);
    }
    else
      errorCallback(new BackendError(BackendError.cannot_connect));
  };

  xmlhttp.send();
}


/**
 * Fungsi untuk melakukan proses login atau signup
 * 
 * @param {String} username 
 *  Nama pengguna
 * 
 * @param {String} password 
 *  Password pengguna
 * 
 * @param {function(Number)} callback 
 *  Callback ketika fungsi sukses dijalankan serta memberikan kode status. Untuk kode status nya, lihat LoginStatusEnum untuk melihat status sukses nya
 * 
 * @param {function(BackendError)} errorCallback 
 *  Callback ketika fungsi mengalami kesalahan
 */
function LoginSignup(username, password, callback, errorCallback){
  const xmlhttp = new XMLHttpRequest();
  
  xmlhttp.open("POST", "php_function/ls_confirm.php", true);

  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    errorCallback(new BackendError(BackendError.timeout));
  }, _timeout_ms);

  xmlhttp.onload = () => {
    clearTimeout(_timeoutHand);

    if(xmlhttp.status == 200){
      let obj = JSON.parse(xmlhttp.responseText);

      switch(obj['success']){
        case 1:{
          switch(obj['status']){
            case 0:
              callback(LoginStatusEnum.status_login);
              break;

            case 1:
              callback(LoginStatusEnum.status_signup);
              break;
          }

          break;
        }

        case 0:{
          switch(obj['status']){
            case 0:
              errorCallback(new BackendError(BackendError.no_username));
              break;
            
            case 1:
              errorCallback(new BackendError(BackendError.no_password));
              break;

            case 2:
              errorCallback(new BackendError(BackendError.password_wrong));
              break;

            case 3:
              errorCallback(new BackendError(BackendError.username_has_special_characters));
              break;

            case 4:
              errorCallback(new BackendError(BackendError.internal_error));
              break
          }

          break;
        }
      }
    }
    else
      errorCallback(new BackendError(BackendError.cannot_connect));
  }

  const _formData = new FormData();
  _formData.append('username', username);
  _formData.append('password', password);

  xmlhttp.send(_formData);
}


/**
 * Fungsi untuk melakukan proses logout
 * 
 * @param {function()} callback 
 *  Callback jika logout berhasil
 * 
 * @param {function(BackendError)} errorCallback 
 *  Callback jika terdapat kesalahan teknis
 */
function Logout(callback, errorCallback){
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", "php_function/logout.php", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    errorCallback(new BackendError(BackendError.timeout));
  }, _timeout_ms);

  xmlhttp.onload = () => {
    clearTimeout(_timeoutHand);

    if(xmlhttp.status == 200){
      let obj = JSON.parse(xmlhttp.responseText);

      switch(obj['success']){
        case 0:{
          switch(obj['code']){
            case 0:
              errorCallback(new BackendError(BackendError.already_logout));
              break;

            case 1:
              errorCallback(new BackendError(BackendError.internal_error));
              break;
          }

          break;
        }

        case 1:
          callback();
          break;
      }
    }

    errorCallback(new BackendError(BackendError.internal_error));
  }

  xmlhttp.send();
}



/**
 * Fungsi untuk memposting ke website
 * 
 * @param {string} lokasi 
 *  Lokasi yang ditulis oleh pengguna
 * 
 * @param {string} deskripsi 
 *  Deskripsi yang ditulis oleh pengguna
 * 
 * @param {File} gambar 
 *  Gambar yang diberikan pengguna
 * 
 * @param {function()} callbackSukses 
 *  Callback ketika berhasil memposting
 * 
 * @param {function(BackendError)} callbackError 
 *  Callback ketika terdapat kesalahan teknis
 */
function SendPost(lokasi, deskripsi, gambar, callbackSukses, callbackError){
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", "php_function/submit_post.php", true);

  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    errorCallback(new BackendError(BackendError.timeout));
  }, _timeout_ms);


  xmlhttp.onload = () => {
    clearTimeout(_timeoutHand);

    if(xmlhttp.status == 200){
      let obj = JSON.parse(xmlhttp.responseText);

      switch(obj.success){
        case 1:
          callbackSukses();
          break;
        
        case 0:
          switch(obj.status){
            case 0:
              callbackError(new BackendError(BackendError.internal_error));
              break;

            case 1:
              callbackError(new BackendError(BackendError.already_logout));
              break;

            case 2:
              callbackError(new BackendError(BackendError.not_supported_type));
              break;

            case 3:
              callbackError(new BackendError(BackendError.location_name_too_long));
              break;

            case 4:
              callbackError(new BackendError(BackendError.no_location));
              break;

            case 5:
              callbackError(new BackendError(BackendError.no_desc_or_image));
              break;
          }

          break;
      }
    }
  }

  
  let _formData = new FormData();
  _formData.append('location_name', lokasi);
  _formData.append('post_msg', deskripsi);
  
  if(gambar != undefined)
    _formData.append('post_img', gambar);

  xmlhttp.send(_formData);
}


/**
 * Untuk mendapatkan kumpulan postingan berdasarkan tanggal ataupun halaman keberapa
 * 
 * @param {number} max_data
 *  Berapa banyak postingan yang akan diambil
 *  
 * @param {Date | string} date_before 
 *  Tanggal filter
 * 
 * @param {function(bool, number, PostData[])} callbackSukses 
 *  Callback ketika pemanggilan fungsi sukses. Parameter dari awal sampai paling akhir, boolean untuk memberitahu apakah halaman paling terakhir atau tidak, nomor halaman yang sedang dilihat, dan kumpulan data postingan.
 * 
 * @param {fucntion(BackendError)} callbackError 
 *  Callback ketika terdapat kesalahan pada server
 * 
 * @param {number} page 
 *  Penunjuk halaman keberapa
 */
function GetPost(max_data, date_before, callbackSukses, callbackError, page = 0){
  const xmlhttp = new XMLHttpRequest();
  
  xmlhttp.open("POST", "php_function/get_post.php", true);
  
  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    callbackError(new BackendError(BackendError.timeout));
  }, _timeout_ms);
  

  xmlhttp.onload = () => {
    clearInterval(_timeoutHand);

    if(xmlhttp.status == 200){
      let obj = JSON.parse(xmlhttp.responseText);
      
      switch(obj.success){
        case 1:{
          let _result = [];

          for(let i = 0; i < obj.result.data.length; i++){
            let _data = obj.result.data[i];

            _result[i] = new PostData(
              _data.post_id,
              _data.username, 
              _data.date_posted,
              decodeURIComponent(_data.message), 
              _data.image_filename,
              decodeURIComponent(_data.location_name)
            );
          }
          
          callbackSukses(obj.result.is_last_page == 1? true: false, obj.result.page_number, _result);
          break;
        }
          
          case 0:{
            switch(obj.errcode){
              case 0:
                callbackError(new BackendError(BackendError.internal_error));
                break;
                
              case 1:
                callbackError(new BackendError(BackendError.empty_result));
                break;
              }
              
              break;
            }
      }
    }
    else
      callbackError(new BackendError(BackendError.conection_error));
  }

  if((typeof date_before) == "string" && date_before != "")
    date_before = new Date(date_before);

  if(date_before instanceof Date)
    date_before = `${date_before.getUTCMonth()+1}-${date_before.getUTCDate()+1}-${date_before.getUTCFullYear()} ${String(date_before.getUTCHours()).padStart(2, "0")}:${String(date_before.getUTCMinutes()).padStart(2, "0")}:${String(date_before.getUTCSeconds()).padStart(2, "0")}`;
  
  let _formData = new FormData();
  _formData.append('max_data', max_data);
  _formData.append('date_before', date_before);
  _formData.append('offset', page * max_data);
  
  xmlhttp.send(_formData);
}


/**
 * Untuk mengambil bagian dari tag HTML
 * 
 * @param {string} tag_name 
 *  Nama dari tag tersebut (bisa "div", "button", dsb.)
 * 
 * @param {string} name 
 *  Atribut "name" dari tag tersebut
 * 
 * @param {Element | undefined} part
 *  Mencari bagian dari element tertentu
 * 
 * @returns {Element}
 *  Element/Tag yang dicari
 */
function GetTag(tag_name, name, part = undefined){
  if(part == undefined)
    part = document;

  return part.querySelector(`${tag_name}[name='${name}']`);
}