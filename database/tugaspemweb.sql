-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 02:06 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugaspemweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cookies`
--

CREATE TABLE `cookies` (
  `login_id` varchar(72) NOT NULL,
  `username` varchar(32) NOT NULL,
  `expire_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `username` varchar(24) NOT NULL,
  `password` varchar(72) DEFAULT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`username`, `password`, `date_created`) VALUES
('jono123', '$2y$13$iV37gKRDytvf.OpGtNPZNuL6wwGbUFNegbL5tSlLgmpB9TMpLlfTy', '2023-05-29'),
('Sulitiawati098', '$2y$13$H7Aekberr9SzB0Dq4RGKOeUr4tiybzU5lcKvRQFlYbhZDyD21nCsi', '2023-05-29');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` char(72) NOT NULL,
  `username` char(24) NOT NULL,
  `date_posted` datetime NOT NULL,
  `message_filename` varchar(80) NOT NULL,
  `image_filename` varchar(80) DEFAULT NULL,
  `location_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `username`, `date_posted`, `message_filename`, `image_filename`, `location_name`) VALUES
('$2y$13$A2kgXSLXj9xXOsgh/gEFv.zWrwdYBV5MNarU1P439h/9czGDo5bRO', 'Sulitiawati098', '2023-05-03 04:23:14', 'Sulitiawati0982023-05-29_13-36-14.txt', 'Sulitiawati0982023-05-29_13-36-14.jpeg', 'Jalan%20Pahlawan%2C%20Samarinda'),
('$2y$13$Yoi0zPRBxBQDke8iTdyfSeEh6HdJdZ/UslVF2Qesb.BC4c1zENAXe', 'jono123', '2023-05-25 01:32:35', 'jono1232023-05-29_13-32-35.txt', 'jono1232023-05-29_13-32-35.jpeg', 'Jalan%20DI%20Panjaitan%2C%20Kecamatan%20Sungai%20Pinang%2C%20Samarinda'),
('$2y$13$yvGqjMS/8/xzQv2WwUWDWO6naWN4VE9XMSPe5/hKQfYrRwoq2IPXS', 'Sulitiawati098', '2023-05-02 05:40:07', 'Sulitiawati0982023-05-29_13-37-06.txt', '', 'SMAN%204%20Samarinda');

--
-- Triggers `posts`
--
DELIMITER $$
CREATE TRIGGER `UpdatePostInfo_decrement` AFTER DELETE ON `posts` FOR EACH ROW BEGIN

	update post_data
    set post_data.post_count = post_data.post_count - 1,
    post_data.oldest_date = (SELECT posts.date_posted from posts ORDER BY posts.date_posted ASC LIMIT 1);
    
    end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdatePostInfo_increment` AFTER INSERT ON `posts` FOR EACH ROW BEGIN

	update post_data
    set post_data.post_count = post_data.post_count+1;
    
    end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `post_data`
--

CREATE TABLE `post_data` (
  `post_count` bigint(20) NOT NULL,
  `oldest_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_data`
--

INSERT INTO `post_data` (`post_count`, `oldest_date`) VALUES
(3, '2023-05-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cookies`
--
ALTER TABLE `cookies`
  ADD PRIMARY KEY (`login_id`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD UNIQUE KEY `message_filename` (`message_filename`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `CekCookies` ON SCHEDULE EVERY 3 DAY STARTS '2023-05-29 21:04:16' ON COMPLETION NOT PRESERVE ENABLE DO delete from cookies where cookies.expire_date >= CURRENT_TIMESTAMP$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
