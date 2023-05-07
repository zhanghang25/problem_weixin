-- --------------------------------------------------------
-- 主机:                           sh-cynosdbmysql-grp-8ssu79i6.sql.tencentcdb.com
-- 服务器版本:                        5.7.18-cynos-log - 20200531
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 springboot_demo 的数据库结构
DROP DATABASE IF EXISTS `springboot_demo`;
CREATE DATABASE IF NOT EXISTS `springboot_demo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `springboot_demo`;

-- 导出  表 springboot_demo.answers 结构
DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `student_id` int(11) NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `stu_answer_content` varchar(255) NOT NULL,
  `answer_content` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `get_score` int(11) DEFAULT '0',
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.answers 的数据：~0 rows (大约)
DELETE FROM `answers`;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` (`id`, `question_id`, `test_id`, `student_id`, `start_time`, `end_time`, `stu_answer_content`, `answer_content`, `score`, `status`, `get_score`, `time`) VALUES
	(1, 16, 2, 1, NULL, NULL, 'B', 'D', 103, 0, 0, NULL),
	(6, 14, 74669, 1, NULL, NULL, 'A', 'D', 101, 0, 0, NULL),
	(7, 15, 74669, 1, NULL, NULL, 'B', 'D', 102, 0, 0, NULL),
	(8, 16, 74669, 1, NULL, NULL, 'C', 'D', 103, 0, 0, NULL),
	(9, 17, 74669, 1, NULL, NULL, 'D', 'D', 103, 1, 103, NULL);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;

-- 导出  表 springboot_demo.classes 结构
DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` varchar(50) NOT NULL DEFAULT '',
  `class_name` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.classes 的数据：~2 rows (大约)
DELETE FROM `classes`;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` (`id`, `class_id`, `class_name`, `teacher_id`) VALUES
	(1, '1', '计算机姚班', 1),
	(2, '32', '钱学森力学班', 1),
	(3, '0058', '数理基础班', 1),
	(5, '123', '测试', 3);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;

-- 导出  表 springboot_demo.keywords 结构
DROP TABLE IF EXISTS `keywords`;
CREATE TABLE IF NOT EXISTS `keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keywords` varchar(233) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.keywords 的数据：~0 rows (大约)
DELETE FROM `keywords`;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` (`id`, `keywords`) VALUES
	(1, '计算机历史'),
	(2, '1');
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;

-- 导出  表 springboot_demo.papers 结构
DROP TABLE IF EXISTS `papers`;
CREATE TABLE IF NOT EXISTS `papers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` varchar(50) NOT NULL DEFAULT '',
  `test_name` varchar(255) NOT NULL,
  `question_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.papers 的数据：~7 rows (大约)
DELETE FROM `papers`;
/*!40000 ALTER TABLE `papers` DISABLE KEYS */;
INSERT INTO `papers` (`id`, `test_id`, `test_name`, `question_id`, `score`, `teacher_id`, `class_id`, `status_id`, `time`) VALUES
	(1, '1', '试卷11', 1, 10, 1, 2, 2, 120),
	(2, '1', '试卷11', 1, 10, 1, 2, 2, 120),
	(3, '2', '试卷2', 1, 10, 1, 2, 1, 60),
	(16, '074669', '钱学森力学班', 14, 101, 1, 2, 1, 60),
	(17, '074669', '钱学森力学班', 15, 102, 1, 2, 1, 60),
	(18, '074669', '钱学森力学班', 16, 103, 1, 2, 1, 60),
	(19, '074669', '钱学森力学班', 17, 103, 1, 2, 1, 60),
	(67, '812233', '测试', 65, 10, 3, 5, 2, 60);
/*!40000 ALTER TABLE `papers` ENABLE KEYS */;

-- 导出  表 springboot_demo.questions 结构
DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_describe` text NOT NULL,
  `type` varchar(255) NOT NULL COMMENT '1 选择题  2 填空题',
  `answer_content` varchar(255) NOT NULL,
  `other_answer` varchar(255) NOT NULL,
  `disorder` varchar(50) NOT NULL DEFAULT '' COMMENT '1 答案可以乱序  2 答案不可乱序',
  `keywords` text NOT NULL,
  `source` varchar(50) NOT NULL DEFAULT '' COMMENT '1 自主出题 2 题库中出题',
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.questions 的数据：~5 rows (大约)
DELETE FROM `questions`;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` (`id`, `question_describe`, `type`, `answer_content`, `other_answer`, `disorder`, `keywords`, `source`, `score`) VALUES
	(1, '测试题目', '1', 'A', '啦啦，瞅瞅，喔喔，佳佳', '1', '1', '1', NULL),
	(14, '第一台计算机是1946年美国研制的,该机英文缩写名为(  ).	', '1', 'D', 'MARK-II,EDSAC,EDVAC,ENIAC', '1', '1', '1', 101),
	(15, '第二台计算机是1946年美国研制的,该机英文缩写名为(  ).	', '1', 'D', 'MARK-II,EDSAC,EDVAC,ENIAC', '1', '1', '1', 102),
	(16, '第三台计算机是1946年美国研制的,该机英文缩写名为(  ).	', '1', 'D', 'MARK-II,EDSAC,EDVAC,ENIAC', '1', '1', '1', 103),
	(17, '第四台计算机是1946年美国研制的,该机英文缩写名为(  ).	', '1', 'D', 'MARK-II,EDSAC,EDVAC,ENIAC', '1', '1', '1', 103),
	(65, '123', '1', 'D', 'a,b,c,d', '1', '1', '1', 10),
	(66, '测试填空题_____,谁是魔法师！', '2', '柯南', '无', '1', '1', '1', 100);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

-- 导出  表 springboot_demo.studentClass 结构
DROP TABLE IF EXISTS `studentClass`;
CREATE TABLE IF NOT EXISTS `studentClass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.studentClass 的数据：~9 rows (大约)
DELETE FROM `studentClass`;
/*!40000 ALTER TABLE `studentClass` DISABLE KEYS */;
INSERT INTO `studentClass` (`id`, `student_id`, `class_id`) VALUES
	(1, 2, 1),
	(3, 2, 2),
	(4, 4, 1),
	(5, 4, 2),
	(6, 4, 3),
	(7, 4, 5),
	(8, 3, 1),
	(9, 1, 3),
	(10, 1, 2),
	(11, 1, 1);
/*!40000 ALTER TABLE `studentClass` ENABLE KEYS */;

-- 导出  表 springboot_demo.students 结构
DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `open_id` varchar(255) NOT NULL,
  `student_tel` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.students 的数据：~0 rows (大约)
DELETE FROM `students`;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (`id`, `student_id`, `student_name`, `open_id`, `student_tel`) VALUES
	(1, 110262, '同学甲', 'o_8Tg5PTGAYAtha39izrlQqeUQHE', '15933332222'),
	(2, 95212, '学生佳佳', 'o_8Tg5HtANIIa2Le4zXKEMF6ZJfc', '15933332222'),
	(3, 111112, 'hi.sir', 'o_8Tg5PTGAYAtha39izrlQqeUQHE-2', '15933332222'),
	(4, 2019118088, '周通', 'o_8Tg5P661WR5tER9-XnJzzr0YG8', '15933332222');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

-- 导出  表 springboot_demo.teachers 结构
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `teacher_name` varchar(255) NOT NULL,
  `open_id` varchar(255) NOT NULL,
  `teacher_tel` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 正在导出表  springboot_demo.teachers 的数据：~4 rows (大约)
DELETE FROM `teachers`;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` (`id`, `teacher_id`, `teacher_name`, `open_id`, `teacher_tel`) VALUES
	(1, 1002, '教师乙', 'o_8Tg5HtANIIa2Le4zXKEMF6ZJfc-1', '15933332222'),
	(2, 112233, '112221', 'o_8Tg5PTGAYAtha39izrlQqeUQHE-1', '15933332222'),
	(3, 123, '123', 'o_8Tg5J2fI_dgT_PHb17REt1AFng', '15933332222'),
	(4, 2019118088, '周通', 'o_8Tg5P661WR5tER9-XnJzzr0YG8', '15933332222');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
