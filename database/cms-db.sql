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

 Date: 06/07/2022 17:25:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(45) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `created_by` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'user_1', 'user@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2022-07-04 13:58:18', '2022-07-04 13:58:18', '管理员');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
