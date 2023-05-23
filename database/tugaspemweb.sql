-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2023 at 12:55 PM
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

--
-- Dumping data for table `cookies`
--

INSERT INTO `cookies` (`login_id`, `username`, `expire_date`) VALUES
('$2y$13$1biJtzH2QC4tU.u04C1xFOuxppFEuTx326EfPZQlS8apHyMwUQnC6', 'adika', '2023-05-24 00:00:00'),
('$2y$13$AnNxmijvLE6zXRAtYxbmX.LBnRUOj9gNmga/NfslBkeMXzkym94ii', 'hello world', '2023-05-24 00:00:00'),
('$2y$13$jILGImQ2bTwXlmuwjJfhDuTPkXG7pIRHGyhXcUITyuQi9g.YbmGCK', 'hello world', '2023-05-24 00:00:00'),
('$2y$13$sO9bdbea9Km2U/i0CKqRVeWrphJHoIPqwKZvmfW9l1OudDV8FaXse', 'hello world', '2023-05-24 00:00:00'),
('$2y$13$X4T43Rq.MAoAdoUku8GD0OpQ3E.yY1L/d/wVXwn4YsuIVqoDDWKFC', 'hello world', '2023-05-24 00:00:00'),
('$2y$13$XN5iLoLYUIpqTT2YqOmvXOnMlnwHVDna/twxenYCteXoycqx/k.K.', 'hello world', '2023-05-24 00:00:00'),
('$2y$13$y.1Ip7GY1U29wUvQUXxLyOSfaKoTB.2LndAgBfteetBIjsTohDvKe', 'hello world', '2023-05-24 00:00:00');

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
('adika', '$2y$13$4NzlpwCnvsFGKbe8DOfu1.sAcuAfgoN18jvSbU9ZCLV7KBCFzbEOG', '2023-05-23'),
('asdf', '$2y$13$5HqGjobI2RNPz5C.XH1oNeRrRzghlCOQz6ne1421TXkBJpSmPnXxu', '2023-05-22'),
('asdfasdf', '$2y$13$TR7Dqy81ilrEoBxsifU0buY8d3Y2BuJJ79lObW7sosFL5Uwsd7E4a', '2023-05-23'),
('hello world', '$2y$13$Tl.bmX0HOFJz8x46rUHnt.MKb/JDg/HNSkQDNxe/dfv4T3Vt915c6', '2023-05-22');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` char(10) NOT NULL,
  `username` char(24) NOT NULL,
  `date_posted` date NOT NULL,
  `message_filename` varchar(32) NOT NULL,
  `image_filename` varchar(128) NOT NULL,
  `location_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `message_filename` (`message_filename`),
  ADD UNIQUE KEY `image_filename` (`image_filename`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
