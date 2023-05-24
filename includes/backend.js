


const _timeout_ms = 15000;


class LoginStatusEnum{
  static status_login = 0;
  static status_signup = 1;
}


class ErrorEnum{
  static no_username = 0;
  static no_password = 1;

  static username_already_exist = 2;
  static username_not_found = 3;
  static password_wrong = 4;

  static already_logout = 5;

  static conection_error = 0xffff0000;

  static timeout = 0x00010000;
  static cannot_connect = 0x00020000;

  static internal_error = 0x00030000;
}

class User {
  #username;
  #date_created;

  constructor(username, date_created){
    this.#username = username;
    
    if(date_created === Date)
      this.#date_created = date_created;
    else
      this.#date_created = new Date(date_created);
  }
  
  GetUsername(){
    return this.#username;
  }

  GetDate(){
    return this.#date_created;
  }
}














const _content_type = 'application/x-www-form-urlencoded';


function GetCurrentUser(callback, errorCallback){
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", "php_function/get_current_user.php", true);
  xmlhttp.setRequestHeader('Content-type', _content_type);

  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    errorCallback(ErrorEnum.timeout);
  }, _timeout_ms);

  xmlhttp.onload = () => {
    clearTimeout(_timeoutHand);

    if(xmlhttp.status == 200){
      let object = JSON.parse(xmlhttp.responseText);
      
      if(object["login"] == 1){
        object["login"] = true;
        object["user"] = new User(object["user"]["username"], object["user"]["date_created"]);
      }
      else
        object["login"] = false;

      callback(object);
    }
    else
      errorCallback(ErrorEnum.cannot_connect);
  };
  
  xmlhttp.send();
}


// login atau signup
function LoginSignup(username, password, callback, errorCallback){
  const xmlhttp = new XMLHttpRequest();
  let params = "username=" + encodeURI(username) + "&password=" + encodeURI(password) + "";
  
  xmlhttp.open("POST", "php_function/ls_confirm.php", true);
  xmlhttp.setRequestHeader('Content-type', _content_type);

  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    errorCallback(ErrorEnum.timeout);
  }, _timeout_ms);

  xmlhttp.onload = () => {
    clearTimeout(_timeoutHand);

    if(xmlhttp.status == 200){
      let obj = JSON.parse(xmlhttp.responseText);

      switch(obj['success']){
        case 0:{
          switch(obj['status']){
            case 0:
              errorCallback(ErrorEnum.no_username);
              break;
            
            case 1:
              errorCallback(ErrorEnum.no_password);
              break;

            case 2:
              errorCallback(ErrorEnum.password_wrong);
              break;

            case 3:
              errorCallback(ErrorEnum.username_not_found);
              break;

            case 4:
              errorCallback(ErrorEnum.internal_error);
              break
          }

          break;
        }

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
      }
    }
    else
      errorCallback(ErrorEnum.cannot_connect);
  }

  xmlhttp.send(params);
}


function Logout(callback, errorCallback){
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", "php_function/logout.php", true);
  xmlhttp.setRequestHeader('Content-type', _content_type);

  let _timeoutHand = setTimeout(() => {
    xmlhttp.abort();
    errorCallback(ErrorEnum.timeout);
  }, _timeout_ms);

  xmlhttp.onload = () => {
    clearTimeout(_timeoutHand);

    if(xmlhttp.status == 200){
      let obj = JSON.parse(xmlhttp.responseText);

      switch(obj['success']){
        case 0:{
          switch(obj['code']){
            case 0:
              errorCallback(ErrorEnum.already_logout);
              break;

            case 1:
              errorCallback(ErrorEnum.internal_error);
              break;
          }

          break;
        }

        case 1:
          callback();
          break;
      }
    }
  }

  xmlhttp.send();
}


function IsConnectionError(eenum){
  return (ErrorEnum.conection_error & eenum) > 0;
}