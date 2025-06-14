-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th6 15, 2025 lúc 03:47 AM
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
(4, 'Cty abcde', 'Company', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12345678911', NULL, NULL, NULL, NULL, 'Deactivated', 'Unverified', NULL, 1, '2025-06-11 04:37:53.400', NULL, NULL, NULL),
(5, 'Phat', 'Personal', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Deactivated', 'Unverified', NULL, 1, '2025-06-11 07:16:00.948', NULL, NULL, NULL),
(8, 'Grab', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:29:47.169', NULL, NULL, NULL),
(9, 'aaaa', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:32:26.204', NULL, NULL, NULL),
(10, 'bbbbb', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:34:21.130', NULL, NULL, NULL),
(11, 'ddddd', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:35:04.141', NULL, NULL, NULL),
(12, 'Tiger', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 04:36:48.993', NULL, NULL, NULL),
(13, 'Cisco', 'Company', 'Male', 'grab@hotmail.com', '0997654321', 'Quan Tan Phu, Go Dau', NULL, 'Ghi chu neu co', 'qs7bqya67t5oq3hlx4t97masp.xlsx', '12345678911', 'https://abc.vn', 'Nguyen Van A', NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 07:06:39.332', NULL, NULL, 3),
(14, 'Phi', 'Personal', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 07:17:09.052', NULL, NULL, NULL),
(16, 'Nhi', 'Personal', 'Female', 'typescode9801@gmail.com', '0987654321', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 07:40:58.560', NULL, NULL, NULL),
(17, 'Đỗ Lâm Thành Phát', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', '2025-06-13 07:43:27.949', 1, '2025-06-13 07:43:27.976', NULL, NULL, 4),
(18, 'QQQQQ', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', NULL, 1, '2025-06-13 07:46:42.395', NULL, NULL, NULL),
(19, 'pppppppppppp', 'Company', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', 'Deactivated', 'Unverified', '2025-06-13 07:50:57.793', 1, '2025-06-13 07:50:57.812', NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gallery`
--

CREATE TABLE `gallery` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ0b2tlbl90eXBlIjoxLCJ2ZXJpZnkiOiJWZXJpZmllZCIsImlhdCI6MTc0OTc5ODE4NiwiZXhwIjoxNzU4NDM4MTg2fQ.GWO9aE7YcHMPwpiyvEDPf3YTD0WArEpT_NRS3dfqDx8', 1, '2025-06-13 07:03:06.000', '2025-09-21 07:03:06.000');

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
  `updated_at` datetime(3) NOT NULL,
  `role` enum('SuperAdmin','Admin','Sale','Technician','None') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'None'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `fullname`, `verify`, `avatar`, `address`, `phone`, `code`, `date_of_birth`, `created_at`, `updated_at`, `role`) VALUES
(1, 'admin@ttptelecom.vn', '53bda93b15bdd54fe7a4cf0a8bf2c9bac901d9d7d3a2e866793b8c7c611a641b', 'TTP Supper Admin', 'Verified', 'apogysp70vymf9nxcu8ukxpz1.jpg', 'Go Dau, Tan Phu - HCM', '0987654321', '123123', '1998-01-31 17:00:00.000', '2025-06-10 13:25:10.699', '2025-06-12 02:38:47.775', 'SuperAdmin'),
(2, 'phat1@hotmail.com', 'e20b924e8b1d396253fe2b6d05f91cce6a66b40b3bdcc35388c90ee7681fa448', 'Thanh Phat 1', 'Verified', NULL, 'Tan Phu HCM', NULL, NULL, '1989-12-31 17:00:00.000', '2025-06-10 07:21:45.230', '2025-06-11 09:14:40.953', 'Admin'),
(3, 'phat2@gmail.com', 'e20b924e8b1d396253fe2b6d05f91cce6a66b40b3bdcc35388c90ee7681fa448', 'Thanh Phat 2', 'Verified', NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', '2025-06-10 07:22:40.965', '2025-06-10 08:58:23.391', 'None'),
(4, 'phat3@outlook.com', 'e20b924e8b1d396253fe2b6d05f91cce6a66b40b3bdcc35388c90ee7681fa448', 'Thanh Phat 3', 'Unverified', NULL, NULL, NULL, NULL, '1989-12-31 17:00:00.000', '2025-06-10 07:24:26.855', '2025-06-10 08:54:06.928', 'None');

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
('5b590b1b-b63a-4739-a2e3-76707ff74510', '1c2f040d785c3ffa766e94beaad349025b14ea72cb65e971ef6f6a13faf3ca88', '2025-06-11 03:13:39.222', '20250611031338_change_unique_field_name_schema_customer', NULL, NULL, '2025-06-11 03:13:39.189', 1),
('6305c632-7907-40c1-991f-d4748af36ee5', '3cac71a9a0e9fb55996046f1a9d27b9f6fd433de7bfa8b36b148f832a9342906', '2025-06-11 03:08:30.306', '20250611030829_add_field_cccd_schema_customer', NULL, NULL, '2025-06-11 03:08:30.284', 1),
('68a41b7c-d999-4669-b2f8-5745bcdcd622', '34fed34587c8e19d874f817246640c0c803cd2446676ce20b0871998c8483ed6', '2025-06-13 08:34:20.263', '20250613083419_add_table_gallery_schema', NULL, NULL, '2025-06-13 08:34:20.168', 1),
('79283750-b95d-4650-b127-85137e8094ba', '485d9208bb9101d13cf5845624a27c6fb7d6fc175cb03f380d3877882484ea30', '2025-06-11 02:36:42.090', '20250611023641_update_schema_customer_varchar_str', NULL, NULL, '2025-06-11 02:36:42.035', 1),
('9c0e5b6b-d27d-4de7-8ba9-51f47c9eb8e2', 'd89b66a57ec54bf00738b43d72095cfb6606716895f52b28333826f4205b4fc5', '2025-06-10 08:48:04.942', '20250610084804_add_unique_to_token', NULL, NULL, '2025-06-10 08:48:04.787', 1),
('b065e32f-311f-4625-909e-604814a5eadf', '202f0bd55edc2eeb14ab87e357b0a3ff03b93a7c026fa76159f99df04d26acef', '2025-06-11 04:04:48.867', '20250611040447_change_field_email_unique_schema_customer', NULL, NULL, '2025-06-11 04:04:48.831', 1),
('ba7991d5-7517-4948-8c57-64fd92343709', 'f15cbbbd4a8e6ebca9de69839b20b9ee27aff466f8569372b5abec61324869c1', '2025-06-11 03:38:47.630', '20250611033846_change_default_consultantor_id_is_optional_default_nullable_schema_customer', NULL, NULL, '2025-06-11 03:38:47.407', 1),
('f61589b5-412f-4f69-9fec-f222d17ea918', '1036fe3a42663e58318c89ed44f9143ae96651cf806b7d3431540e227b19586b', '2025-06-11 04:13:18.881', '20250611041317_change_field_avatar_varchar_length_255_schema_user', NULL, NULL, '2025-06-11 04:13:18.845', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

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
-- Chỉ mục cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `RefreshToken_token_key` (`token`),
  ADD KEY `RefreshToken_exp_idx` (`exp`),
  ADD KEY `RefreshToken_user_id_fkey` (`user_id`);

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
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ràng buộc đối với các bảng kết xuất
--

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
-- Ràng buộc cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `RefreshToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
