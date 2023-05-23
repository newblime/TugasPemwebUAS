# Cara Coba Website

## Setup Database

1. Buka PHPMyAdmin
2. Bikin database baru
3. Klik import
4. Kemudian import dari `/database/tugaspemweb.sql

![](https://github.com/newblime/TugasPemwebUAS/image_github/database.png?raw=true)

5. Pencet "import" di paling bawah page


## Setup xampp

1. Buka config "php.ini"

![](https://github.com/newblime/TugasPemwebUAS/image_github/xampp_config.png?raw=true)

2. Kemudian copy isi [`config/php.ini`](https://github.com/newblime/TugasPemwebUAS/config/php.ini) ke "php.ini" yang barusan dibuka


## Setup website

1. Clone repository ini ke "htdocs" di xampp
2. Download [Composer](https://getcomposer.org/download/) bagian **Windows Installer**
3. Kemudian buka shell xampp

![](https://github.com/newblime/TugasPemwebUAS/image_github/xampp_shell.png?raw=true)

4. Kemudian arahkan ke folder repository pakai command `cd`
5. Install pkg composer pakai `php composer.phar install`


## Setup index.php

1. Copy paste isi [`config/index.php`](https://github.com/newblime/TugasPemwebUAS/config/index.php) ke "index.php" di folder "htdocs" di XAMPP




Jangan lupa nyalakan module **Apache**.

![](https://github.com/newblime/TugasPemwebUAS/image_github/xampp_start.png?raw=true)