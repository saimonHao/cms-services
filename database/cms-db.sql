/*
 Navicat Premium Data Transfer

 Source Server         : local_db
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 192.168.11.236:3306
 Source Schema         : cms-db

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 19/07/2022 15:52:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `permissions` text COLLATE utf8mb4_croatian_ci,
  `create_time` timestamp NULL DEFAULT NULL,
  `users` text COLLATE utf8mb4_croatian_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(45) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `roles` text COLLATE utf8mb4_croatian_ci,
  `permissions` text COLLATE utf8mb4_croatian_ci,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `created_by` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci;

SET FOREIGN_KEY_CHECKS = 1;
