-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th6 21, 2025 lúc 10:16 AM
-- Phiên bản máy phục vụ: 8.4.3
-- Phiên bản PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ttp_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `activity`
--

CREATE TABLE `activity` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creator_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `status` enum('New','InProgress','Completed','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'New',
  `time_start` datetime(3) DEFAULT NULL,
  `time_end` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `assign_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `activity`
--

INSERT INTO `activity` (`id`, `name`, `phone`, `address`, `contact_name`, `creator_id`, `customer_id`, `status`, `time_start`, `time_end`, `created_at`, `updated_at`, `content`, `assign_at`) VALUES
(1, 'Tư vấn khách hàng VNPT', '0987654321', '297 Go Dau HCM', 'Phat dev', 1, 4, 'New', '2025-06-20 07:30:36.257', '2025-06-20 07:30:36.257', '2025-06-20 07:32:04.779', NULL, NULL, NULL),
(2, 'Tư vấn khách hàng FPT', '0987654311', 'Go Dau HCM', 'Phat dev', 1, 4, 'New', '2025-06-20 07:30:36.257', '2025-06-20 07:30:36.257', '2025-06-20 07:32:23.392', NULL, NULL, NULL),
(3, 'Tư vấn khách hàng Daikin', '0987654311', 'Go Dau HCM', 'Phat dev', 1, 4, 'New', '2025-06-20 07:30:36.257', '2025-06-20 07:30:36.257', '2025-06-20 07:32:36.083', NULL, NULL, NULL),
(4, 'Tư vấn dịch vụ camera', '0987654333', 'Go Dau HCM', 'Phat dev', 1, 4, 'New', '2025-06-20 07:30:36.257', '2025-06-20 07:30:36.257', '2025-06-20 07:32:53.469', NULL, NULL, NULL),
(5, 'Tư vấn dịch vụ mạng vina', '0987654330', 'Go Dau HCM', 'Phat dev', 1, 5, 'New', '2025-06-20 07:30:36.257', '2025-06-20 07:30:36.257', '2025-06-20 07:33:21.382', '2025-06-20 07:46:12.160', NULL, NULL),
(6, 'Tư vấn dịch vụ mạng Viettel', '0997654330', 'HCM', 'Phat dev', 1, 5, 'New', '2025-06-20 07:30:36.257', '2025-06-20 07:30:36.257', '2025-06-20 08:48:33.353', NULL, NULL, NULL),
(7, 'Activity release', '0987654321', 'Go Dau, Tan Phu - HCM', 'Nguyen Van A', 1, 9, 'Completed', NULL, NULL, '2025-06-21 07:41:34.787', '2025-06-21 10:15:25.029', 'test noi dung', NULL),
(8, 'asdasdadsaa', '0987654322', 'Go Dau, Tan Phu - HCM', 'asds', 1, 5, 'New', '2025-06-21 03:10:10.940', '2025-06-22 08:47:25.000', '2025-06-21 08:48:17.157', NULL, NULL, '2025-06-21 08:48:17.119'),
(9, 'oooooooo', '1234567890', 'Go Dau, Tan Phu - HCM', 'asdsdadsa', 1, 4, 'InProgress', '2025-06-21 02:09:09.999', '2025-06-22 02:10:09.000', '2025-06-21 08:50:12.005', NULL, NULL, '2025-06-21 08:50:11.969'),
(10, 'aaaa', '0987654312', 'asdadsadasd', 'asdsadsadasd', 1, 8, 'New', '2025-06-21 09:02:28.183', '2025-06-28 09:02:28.000', '2025-06-21 09:03:02.717', NULL, NULL, '2025-06-21 09:03:02.630');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Personal','Company') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Company',
  `gender` enum('Male','Female') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_personal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `attachment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surrogate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` datetime(3) DEFAULT NULL,
  `status` enum('Active','Deactivated') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Deactivated',
  `verify` enum('Unverified','Verified') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Unverified',
  `assign_at` datetime(3) DEFAULT NULL,
  `creator_id` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL,
  `cccd` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `consultantor_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`id`, `name`, `type`, `gender`, `email`, `phone`, `address_company`, `address_personal`, `note`, `attachment`, `tax_code`, `website`, `surrogate`, `contact_name`, `date_of_birth`, `status`, `verify`, `assign_at`, `creator_id`, `created_at`, `updated_at`, `cccd`, `consultantor_id`) VALUES
(4, 'Cty abcde', 'Company', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12345678911', NULL, NULL, NULL, NULL, 'Deactivated', 'Unverified', '2025-06-21 08:06:59.569', 1, '2025-06-11 04:37:53.400', '2025-06-21 08:06:59.633', '111111111111', 2),
(5, 'Phat dev', 'Personal', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Deactivated', 'Verified', NULL, 1, '2025-06-11 07:16:00.948', '2025-06-16 07:42:33.067', NULL, 2),
(8, 'Grab', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:29:47.169', '2025-06-17 08:44:16.788', NULL, NULL),
(9, 'aaaa', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:32:26.204', NULL, NULL, NULL),
(10, 'bbbbb', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:34:21.130', NULL, NULL, NULL),
(11, 'ddddd', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:35:04.141', NULL, NULL, NULL),
(12, 'Tiger', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:36:48.993', NULL, NULL, NULL),
(13, 'Cisco', 'Company', 'Male', 'grab@hotmail.com', '0997654321', 'Quan Tan Phu, Go Dau', NULL, 'Ghi chu neu co', 'qs7bqya67t5oq3hlx4t97masp.xlsx', '12345678911', 'https://abc.vn', 'Nguyen Van A', NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 07:06:39.332', NULL, NULL, 3),
(14, 'Phi', 'Personal', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Verified', NULL, 1, '2025-06-13 07:17:09.052', '2025-06-16 08:04:10.733', '111111111111', NULL),
(16, 'Nhi', 'Personal', 'Female', 'typescode9801@gmail.com', '0987654321', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Deactivated', 'Verified', NULL, 1, '2025-06-13 07:40:58.560', '2025-06-15 10:54:37.383', NULL, NULL),
(17, 'Đỗ Lâm Thành Phát', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', '2025-06-13 07:43:27.949', 1, '2025-06-13 07:43:27.976', NULL, NULL, 4),
(18, 'QQQQQ', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 07:46:42.395', NULL, NULL, NULL),
(19, 'pppppppppppp', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', '2025-06-13 07:50:57.793', 1, '2025-06-13 07:50:57.812', NULL, NULL, 2),
(20, 'sadsadsadsadsad', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-15 05:06:57.610', NULL, NULL, NULL),
(21, 'asdsadsadsad', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-15 05:11:55.397', NULL, NULL, NULL),
(22, 'sssss', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-15 05:14:05.827', NULL, NULL, NULL),
(23, 'asdsadsadsadsa aaaa', 'Personal', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-15 05:21:22.448', NULL, NULL, NULL),
(24, 'asasasasas222', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-15 07:30:12.747', NULL, NULL, NULL),
(25, 'test khach hang', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', '2025-06-15 09:49:25.458', 1, '2025-06-15 09:08:03.048', '2025-06-15 09:49:25.465', '080098013879', 4),
(26, 'aaaaaaaa', 'Company', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Deactivated', 'Verified', '2025-06-17 08:42:07.088', 1, '2025-06-17 08:42:07.097', '2025-06-17 08:43:01.378', '111111111111', 5),
(27, 'Phat', 'Personal', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Deactivated', 'Unverified', NULL, 1, '2025-06-17 09:18:03.174', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gallery`
--

CREATE TABLE `gallery` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `gallery`
--

INSERT INTO `gallery` (`id`, `customer_id`, `filename`, `created_at`) VALUES
(8, 24, 'ql85ua5ypn6musvaxw14pgyiq.docx', '2025-06-15 07:30:12.757'),
(9, 24, 'd5nf0xzcnuf5dqw4l6zcqu941.xlsx', '2025-06-15 07:30:12.757'),
(10, 25, 'za33l5ucra8pwqgiwsob5gasc.pdf', '2025-06-15 09:49:25.471'),
(11, 5, 'ryvla4ik2f2yesgd06v7yjwyj.pdf', '2025-06-15 10:16:10.424'),
(12, 26, 'grt5vdl3co5cvewo3d6z1z051.xlsx', '2025-06-17 08:42:07.103'),
(13, 26, 'aanp9sz57udi7tpwvdccicmph.docx', '2025-06-17 08:42:07.103');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `performance`
--

CREATE TABLE `performance` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('New','Approved','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'New',
  `creator_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `assign_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL,
  `commission_cost` double NOT NULL DEFAULT '0',
  `customer_care_cost` double NOT NULL DEFAULT '0',
  `customer_cost` double NOT NULL DEFAULT '0',
  `diplomatic_cost` double NOT NULL DEFAULT '0',
  `operating_cost` double NOT NULL DEFAULT '0',
  `reserve_cost` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `performance`
--

INSERT INTO `performance` (`id`, `name`, `status`, `creator_id`, `customer_id`, `note`, `assign_at`, `created_at`, `updated_at`, `commission_cost`, `customer_care_cost`, `customer_cost`, `diplomatic_cost`, `operating_cost`, `reserve_cost`) VALUES
(1, 'Test hieu qua cong viec', 'New', 4, 14, NULL, '2025-06-17 09:37:49.802', '2025-06-17 09:39:25.990', '2025-06-21 08:07:24.583', 0.1, 0.1, 0.1, 0.1, 0.1, 0.1),
(2, 'asdsadasdsadasdsadadas', 'New', 1, 8, NULL, '2025-06-18 03:51:39.181', '2025-06-18 03:51:39.244', NULL, 0, 0, 0, 0, 0, 0),
(3, 'aaweeeee', 'Approved', 1, 4, NULL, '2025-06-18 03:52:33.023', '2025-06-18 03:52:33.057', NULL, 0, 0, 0, 0, 0, 0),
(4, 'ttyyyuuiiiiiii', 'New', 1, 13, NULL, '2025-06-18 03:52:54.057', '2025-06-18 03:52:54.089', NULL, 0, 0, 0, 0, 0, 0),
(5, 'ggggggggg', 'New', 1, 12, NULL, '2025-06-18 03:53:10.289', '2025-06-18 03:53:10.321', NULL, 0, 0, 0, 0, 0, 0),
(6, 'yyyyyyyyyyyy', 'New', 1, 4, NULL, '2025-06-18 03:53:29.897', '2025-06-18 03:53:29.926', '2025-06-19 04:29:49.517', 0, 0, 0, 0, 0.4, 0),
(7, 'pppppppppppppppppppppppppppppppppp', 'New', 1, 14, NULL, '2025-06-18 03:53:54.826', '2025-06-18 03:53:54.856', NULL, 0, 0, 0, 0, 0, 0),
(8, 'qqqqqqqqqqqqqqqqqqqqqqqqq', 'New', 1, 5, NULL, '2025-06-18 03:54:09.819', '2025-06-18 03:54:09.848', NULL, 0, 0, 0, 0, 0, 0),
(9, 'trtrtrtrtrtrtrtrtrtr', 'New', 1, 8, NULL, '2025-06-18 03:54:33.897', '2025-06-18 03:54:33.926', NULL, 0, 0, 0, 0, 0, 0),
(10, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'New', 1, 8, NULL, '2025-06-18 03:54:55.651', '2025-06-18 03:54:55.684', NULL, 0, 0, 0, 0, 0, 0),
(11, 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', 'New', 1, 4, NULL, '2025-06-18 03:55:07.243', '2025-06-18 03:55:07.274', NULL, 0, 0, 0, 0, 0, 0),
(12, 'aasdasdsadasdasdasdasdsada', 'Approved', 1, 4, NULL, '2025-06-18 08:45:08.879', '2025-06-18 08:45:08.899', NULL, 0, 0, 0, 0, 0, 0),
(13, 'test hieu qua', 'New', 1, 14, NULL, '2025-06-19 04:30:29.765', '2025-06-19 04:30:29.786', NULL, 0, 0, 0, 0, 0, 0),
(14, 'Tets hieu qua', 'New', 1, 4, NULL, '2025-06-21 07:24:35.369', '2025-06-21 07:24:35.423', NULL, 0, 0, 0, 0, 0, 0),
(15, 'tttttttttttttttttttt', 'Cancelled', 1, 4, NULL, '2025-06-21 07:25:47.483', '2025-06-21 07:25:47.534', NULL, 0, 0, 0, 0, 0, 0),
(16, 'abcde', 'New', 1, 4, NULL, '2025-06-21 07:26:48.822', '2025-06-21 07:26:48.873', NULL, 0, 0, 0, 0, 0, 0),
(17, 'abcr', 'New', 1, 4, NULL, '2025-06-21 07:31:26.467', '2025-06-21 07:31:26.519', NULL, 0, 0, 0, 0, 0, 0),
(18, 'aaaaaaa', 'New', 1, 4, NULL, '2025-06-21 07:32:17.477', '2025-06-21 07:32:17.529', NULL, 0, 0, 0, 0, 0, 0),
(19, 'Test hieu qua cong viec 222', 'New', 1, 8, NULL, '2025-06-21 07:34:38.416', '2025-06-21 07:34:38.467', NULL, 0, 0, 0, 0, 0, 0),
(20, 'test hq', 'New', 1, 9, NULL, '2025-06-21 07:39:07.894', '2025-06-21 07:39:07.947', NULL, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `id` int NOT NULL,
  `token` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `iat` datetime(3) NOT NULL,
  `exp` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `refreshtoken`
--

INSERT INTO `refreshtoken` (`id`, `token`, `user_id`, `iat`, `exp`) VALUES
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoxLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc1MDE0ODg0MywiZXhwIjoxNzU4Nzg4ODQzfQ.4SMqR4M3sFYuAKnlpc5G3RbQsfF22J5b6uue2-U0jLs', 1, '2025-06-17 08:27:23.000', '2025-09-25 08:27:23.000'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoxLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc1MDE1MDA1NCwiZXhwIjoxNzU4NzkwMDU0fQ.ZZhaugwvYwev3WjhJMxJiAkvoppyFiacnsfDbXe9UgA', 1, '2025-06-17 08:47:34.000', '2025-09-25 08:47:34.000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `revenue`
--

CREATE TABLE `revenue` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `unit_caculate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('OneTime','EveryMonth') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OneTime',
  `performance_id` int NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `direction` enum('In','Out') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'In',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `revenue`
--

INSERT INTO `revenue` (`id`, `name`, `description`, `unit_caculate`, `type`, `performance_id`, `price`, `quantity`, `direction`, `created_at`, `updated_at`) VALUES
(1, 'Chi phi lap dat cap', 'abacbbcab', 'abcbcc', 'OneTime', 1, 1000000.00, 300, 'In', '2025-06-17 09:54:26.373', '2025-06-20 04:02:03.485'),
(2, 'Chi phi keo cap', 'abacbbcab', 'abc', 'OneTime', 1, 2000000.00, 30, 'In', '2025-06-18 06:19:07.534', '2025-06-20 03:52:45.469'),
(5, 'Chi phi keo mang', 'abacbbcab', 'abcbcc', 'EveryMonth', 1, 1200000.00, 30, 'Out', '2025-06-18 06:21:10.336', NULL),
(7, 'Chi setup server', 'abacbbcab', 'abcbcc', 'EveryMonth', 1, 2800000.00, 10, 'Out', '2025-06-18 06:24:39.270', NULL),
(8, 'Chi setup server aaaa', 'abacbbcab', 'abcbcc', 'EveryMonth', 1, 2800000.00, 10, 'Out', '2025-06-19 10:10:33.789', NULL),
(9, 'Chi phi lap dat may lanh', 'abc', 'ádasdasda', 'OneTime', 1, 200000.00, 1, 'In', '2025-06-20 02:42:47.963', NULL),
(10, 'Di day am tuong', 'abcdef', 'aaaaaa', 'EveryMonth', 1, 400000.00, 2, 'Out', '2025-06-20 02:44:19.113', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verify` enum('Unverified','Verified','Banned') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Unverified',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL,
  `role` enum('SuperAdmin','Admin','Sale','Technician','None') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'None'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `fullname`, `verify`, `avatar`, `address`, `phone`, `code`, `date_of_birth`, `created_at`, `updated_at`, `role`) VALUES
(1, 'admin@ttptelecom.vn', '53bda93b15bdd54fe7a4cf0a8bf2c9bac901d9d7d3a2e866793b8c7c611a641b', 'TTP Supper Admin', 'Verified', 'apogysp70vymf9nxcu8ukxpz1.jpg', 'Go Dau, Tan Phu - HCM', '0987654321', '123123', '1998-01-31 17:00:00.000', '2025-06-10 13:25:10.699', '2025-06-12 02:38:47.775', 'SuperAdmin'),
(2, 'phat1@hotmail.com', '767bad5d9e1e2eff8cea147ec01d72671b4e647aa614eb2775fa4f1c2ad96290', 'Thanh Phat 1', 'Verified', NULL, 'Tan Phu HCM', NULL, '111111', '1989-12-31 17:00:00.000', '2025-06-10 07:21:45.230', '2025-06-15 08:03:20.808', 'Admin'),
(3, 'phat2@gmail.com', 'e20b924e8b1d396253fe2b6d05f91cce6a66b40b3bdcc35388c90ee7681fa448', 'Thanh Phat 2', 'Verified', NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', '2025-06-10 07:22:40.965', '2025-06-10 08:58:23.391', 'None'),
(4, 'phat3@outlook.com', 'e20b924e8b1d396253fe2b6d05f91cce6a66b40b3bdcc35388c90ee7681fa448', 'Thanh Phat 3', 'Unverified', NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', '2025-06-10 07:24:26.855', '2025-06-10 08:54:06.928', 'None'),
(5, 'test_user@gamil.com', 'e20b924e8b1d396253fe2b6d05f91cce6a66b40b3bdcc35388c90ee7681fa448', 'User 123', 'Verified', NULL, 'Go Vap', NULL, NULL, '1998-01-29 17:00:00.000', '2025-06-16 06:36:43.509', '2025-06-16 07:05:22.651', 'None');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('11d05f8f-7416-4ac7-a4cd-855c58873753', '8cf42df876298b11df0b15680dbd95294ccbbfcba47da6156e7186649584bb8c', '2025-06-10 08:23:26.103', '20250610082325_setup_table_refresh_token', NULL, NULL, '2025-06-10 08:23:25.973', 1),
('153c1d94-1bd0-4d70-87f0-f1900489b2e6', 'a92c8c5b1eb8e7455e20934908d77936def62ffc9ecc37872efe06851a1c3c06', '2025-06-11 02:22:52.924', '20250611022252_init_schema_customer', NULL, NULL, '2025-06-11 02:22:52.840', 1),
('17b53f3f-54e5-4bdb-ab21-fbc1b8ecb736', 'fd568f7dda4c9ca1ea7789754f59012a74fe8ef78aee8341fb90484b5541f71f', '2025-06-10 06:21:20.679', '20250610062120_init', NULL, NULL, '2025-06-10 06:21:20.502', 1),
('1b6b6faa-96cf-40a3-9a23-6f5063bce1a5', '1e161f4e1f6bc2fc4439513eefcf53180b006eccc15e6fce8baa0e5daac74ab0', '2025-06-11 03:34:00.554', '20250611033359_add_consultantor_id_to_schema_customer_relative_user_forward_user_id', NULL, NULL, '2025-06-11 03:34:00.427', 1),
('4eb20afe-8daa-48bb-9d05-91c543932ef9', 'abdca4c3336d951f53b04f48a391f762e8afa601b3a4f6ac594a61c34f372dca', '2025-06-15 07:40:36.727', '20250615074035_remove_update_at_gallery_schema', NULL, NULL, '2025-06-15 07:40:36.698', 1),
('5b590b1b-b63a-4739-a2e3-76707ff74510', '1c2f040d785c3ffa766e94beaad349025b14ea72cb65e971ef6f6a13faf3ca88', '2025-06-11 03:13:39.222', '20250611031338_change_unique_field_name_schema_customer', NULL, NULL, '2025-06-11 03:13:39.189', 1),
('6305c632-7907-40c1-991f-d4748af36ee5', '3cac71a9a0e9fb55996046f1a9d27b9f6fd433de7bfa8b36b148f832a9342906', '2025-06-11 03:08:30.306', '20250611030829_add_field_cccd_schema_customer', NULL, NULL, '2025-06-11 03:08:30.284', 1),
('68a41b7c-d999-4669-b2f8-5745bcdcd622', '34fed34587c8e19d874f817246640c0c803cd2446676ce20b0871998c8483ed6', '2025-06-13 08:34:20.263', '20250613083419_add_table_gallery_schema', NULL, NULL, '2025-06-13 08:34:20.168', 1),
('79283750-b95d-4650-b127-85137e8094ba', '485d9208bb9101d13cf5845624a27c6fb7d6fc175cb03f380d3877882484ea30', '2025-06-11 02:36:42.090', '20250611023641_update_schema_customer_varchar_str', NULL, NULL, '2025-06-11 02:36:42.035', 1),
('794bc829-e43d-4a95-b4f8-7df434aa5805', 'a98f6e7a1d3c2ad16b844cc74d2fc9181dde8e980b5f6dddc0838939191ad69b', '2025-06-21 10:12:40.298', '20250621101238_update_schema_activity', NULL, NULL, '2025-06-21 10:12:40.217', 1),
('827746d0-285b-45cd-bd0d-73149bfac428', '13ebb361f3caf742110a5608abaad1f193e76db53336fd819054df1037295c6e', '2025-06-17 06:43:28.499', '20250617064326_update_unit_caculate', NULL, NULL, '2025-06-17 06:43:28.477', 1),
('8c83296f-07a6-4af1-a6aa-0842bd6b0934', '512c159bcefddff3b99d3bd8a3ff614d0ed2b5373b03c88e855b197b8575c01d', '2025-06-20 04:45:46.521', '20250620044545_update_schema_activity', NULL, NULL, '2025-06-20 04:45:46.497', 1),
('8d79ee12-f26e-47d9-a38e-28047fa7a432', 'a4a290e1d602acddc5e9c2996786b5d31ae1aaa30c497f567557ee689f2eb7fc', '2025-06-16 10:13:37.167', '20250616101335_create_revenue_schema', NULL, NULL, '2025-06-16 10:13:37.018', 1),
('9c0e5b6b-d27d-4de7-8ba9-51f47c9eb8e2', 'd89b66a57ec54bf00738b43d72095cfb6606716895f52b28333826f4205b4fc5', '2025-06-10 08:48:04.942', '20250610084804_add_unique_to_token', NULL, NULL, '2025-06-10 08:48:04.787', 1),
('b065e32f-311f-4625-909e-604814a5eadf', '202f0bd55edc2eeb14ab87e357b0a3ff03b93a7c026fa76159f99df04d26acef', '2025-06-11 04:04:48.867', '20250611040447_change_field_email_unique_schema_customer', NULL, NULL, '2025-06-11 04:04:48.831', 1),
('ba7991d5-7517-4948-8c57-64fd92343709', 'f15cbbbd4a8e6ebca9de69839b20b9ee27aff466f8569372b5abec61324869c1', '2025-06-11 03:38:47.630', '20250611033846_change_default_consultantor_id_is_optional_default_nullable_schema_customer', NULL, NULL, '2025-06-11 03:38:47.407', 1),
('bddcfbb3-09f5-45a8-a7c1-e1f81a617ca3', '2f6f203860ef2c19496c148934f5635e28c3df9dbb2833b5f84576ee4aa253a5', '2025-06-16 06:44:18.086', '20250616064416_update_field_updated_at_user_schema', NULL, NULL, '2025-06-16 06:44:17.950', 1),
('d043284e-793b-420b-9468-a135a29f0ea6', '456107113ccbf1889c2050827b26052800b19d3285ec81cb43670fdaa61e64d5', '2025-06-16 09:07:03.729', '20250616090702_create_performance_schema', NULL, NULL, '2025-06-16 09:07:03.564', 1),
('e16b1e0b-80f7-4c4f-a21f-eaf1eab78f80', 'c97cd113215540264e74b58878fbc22af4cc690f913c0cc013a68f23ec741e76', '2025-06-18 06:24:08.060', '20250618062406_change_name_revenue', NULL, NULL, '2025-06-18 06:24:08.041', 1),
('f4b35809-cb11-48fd-b786-9b5412a65182', '06491e60e89bd2478f08e5e9ec1dc3914be26ee028e6e2591485e1d538dc1780', '2025-06-20 04:39:16.716', '20250620043915_add_schema_activity', NULL, NULL, '2025-06-20 04:39:16.579', 1),
('f61589b5-412f-4f69-9fec-f222d17ea918', '1036fe3a42663e58318c89ed44f9143ae96651cf806b7d3431540e227b19586b', '2025-06-11 04:13:18.881', '20250611041317_change_field_avatar_varchar_length_255_schema_user', NULL, NULL, '2025-06-11 04:13:18.845', 1),
('f62f8cbb-b0c2-4f0c-b82e-bb0991faa112', '978cdd1087fce28e58a357ca51d7c0fc0015bdcfc00f42406b0bb8ad1ebdf0a8', '2025-06-20 07:56:35.966', '20250620075633_update_schema_activity_and_add_field_assign_at', NULL, NULL, '2025-06-20 07:56:35.939', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Activity_customer_id_fkey` (`customer_id`),
  ADD KEY `Activity_creator_id_fkey` (`creator_id`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Customer_name_key` (`name`),
  ADD UNIQUE KEY `Customer_email_key` (`email`),
  ADD KEY `Customer_creator_id_fkey` (`creator_id`),
  ADD KEY `Customer_consultantor_id_fkey` (`consultantor_id`);

--
-- Chỉ mục cho bảng `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Gallery_filename_key` (`filename`),
  ADD KEY `Gallery_customer_id_fkey` (`customer_id`);

--
-- Chỉ mục cho bảng `performance`
--
ALTER TABLE `performance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Performance_name_key` (`name`),
  ADD KEY `Performance_creator_id_fkey` (`creator_id`),
  ADD KEY `Performance_customer_id_fkey` (`customer_id`);

--
-- Chỉ mục cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `RefreshToken_token_key` (`token`),
  ADD KEY `RefreshToken_exp_idx` (`exp`),
  ADD KEY `RefreshToken_user_id_fkey` (`user_id`);

--
-- Chỉ mục cho bảng `revenue`
--
ALTER TABLE `revenue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Revenue_performance_id_fkey` (`performance_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD KEY `User_email_password_idx` (`email`,`password`);

--
-- Chỉ mục cho bảng `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `performance`
--
ALTER TABLE `performance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `revenue`
--
ALTER TABLE `revenue`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `Activity_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Activity_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `Customer_consultantor_id_fkey` FOREIGN KEY (`consultantor_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Customer_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `Gallery_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `performance`
--
ALTER TABLE `performance`
  ADD CONSTRAINT `Performance_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Performance_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `RefreshToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `revenue`
--
ALTER TABLE `revenue`
  ADD CONSTRAINT `Revenue_performance_id_fkey` FOREIGN KEY (`performance_id`) REFERENCES `performance` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
