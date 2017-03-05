-- MySQL dump 10.13  Distrib 5.7.16, for osx10.12 (x86_64)
--
-- Host: localhost    Database: worktile
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `s_permission`
--

DROP TABLE IF EXISTS `s_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `s_permission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `mode` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s_permission`
--

LOCK TABLES `s_permission` WRITE;
/*!40000 ALTER TABLE `s_permission` DISABLE KEYS */;
INSERT INTO `s_permission` VALUES (1,'team管理员',1,31),(2,'team成员',2,15),(3,'team访客',3,7),(4,'team游客',4,5),(5,'team无效',0,0),(6,'project管理员',5,31),(7,'project成员',6,15),(8,'project访客',7,7);
/*!40000 ALTER TABLE `s_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s_role`
--

DROP TABLE IF EXISTS `s_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `s_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s_role`
--

LOCK TABLES `s_role` WRITE;
/*!40000 ALTER TABLE `s_role` DISABLE KEYS */;
INSERT INTO `s_role` VALUES (1,'team管理员'),(2,'team成员'),(3,'team访客'),(4,'team游客'),(5,'project管理员'),(6,'project成员'),(7,'project访客');
/*!40000 ALTER TABLE `s_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s_template`
--

DROP TABLE IF EXISTS `s_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `s_template` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `entries` text,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s_template`
--

LOCK TABLES `s_template` WRITE;
/*!40000 ALTER TABLE `s_template` DISABLE KEYS */;
INSERT INTO `s_template` VALUES (1,'通用','[{\"name\":\"要做\",\"pos\":65535},{\"name\":\"在做\",\"pos\":131071},{\"name\":\"待定\",\"pos\":196606}]',NULL,NULL,NULL),(2,'研发','[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"开发中\",\"pos\":131071},{\"name\":\"待测试\",\"pos\":196606},{\"name\":\"待发布\",\"pos\":262141},{\"name\":\"已发布\",\"pos\":327676}]',NULL,NULL,NULL),(3,'产品Roadmap','[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"待发布\",\"pos\":131071},{\"name\":\"已发布\",\"pos\":196606},{\"name\":\"已完成\",\"pos\":262141}]',NULL,NULL,NULL),(4,'CRM 模板','[{\"name\":\"客户资料库\",\"pos\":65535},{\"name\":\"销售机会\",\"pos\":131071},{\"name\":\"联系中\",\"pos\":196606},{\"name\":\"已联系\",\"pos\":262141},{\"name\":\"售前\",\"pos\":327676},{\"name\":\"成单\",\"pos\":393211},{\"name\":\"售后\",\"pos\":458746}]',NULL,NULL,NULL),(5,'Bug管理','[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"开发\",\"pos\":131071},{\"name\":\"测试\",\"pos\":196606},{\"name\":\"上线\",\"pos\":262141}]',NULL,NULL,NULL),(6,'招聘流程','[{\"name\":\"简历库\",\"pos\":65535},{\"name\":\"笔试\",\"pos\":131071},{\"name\":\"面试\",\"pos\":196606},{\"name\":\"试用期\",\"pos\":262141},{\"name\":\"入职\",\"pos\":327676}]',NULL,NULL,NULL),(7,'内容编辑','[{\"name\":\"策划组稿\",\"pos\":65535},{\"name\":\"选题\",\"pos\":131071},{\"name\":\"初稿\",\"pos\":196606},{\"name\":\"审稿\",\"pos\":262141},{\"name\":\"校对\",\"pos\":327676},{\"name\":\"定稿\",\"pos\":393211},{\"name\":\"发布\",\"pos\":458746}]',NULL,NULL,NULL),(8,'产品设计','[{\"name\":\"需求了解\",\"pos\":65535},{\"name\":\"头脑风暴\",\"pos\":131071},{\"name\":\"想法\\b收缩\",\"pos\":196606},{\"name\":\"原型\",\"pos\":262141},{\"name\":\"验证与测试\",\"pos\":327676}]',NULL,NULL,NULL);
/*!40000 ALTER TABLE `s_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_project`
--

DROP TABLE IF EXISTS `t_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_project` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` bigint(20) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `crew_cap` int(5) DEFAULT NULL,
  `description` text,
  `team_id` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `visibility` int(5) DEFAULT NULL,
  `pos` float DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  `is_star` int(2) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_project`
--

LOCK TABLES `t_project` WRITE;
/*!40000 ALTER TABLE `t_project` DISABLE KEYS */;
INSERT INTO `t_project` VALUES (11,4,'asdasd',NULL,'',1,'2017-02-27 22:54:38',2,NULL,NULL,NULL,NULL,0),(12,4,'bbb',NULL,'bbb',2,'2017-03-02 15:17:08',2,NULL,NULL,NULL,NULL,0),(13,4,'ccc',NULL,'ccc',2,'2017-03-02 15:23:40',2,NULL,NULL,NULL,NULL,0),(14,4,'ddd',NULL,'ddd',2,'2017-03-02 15:49:16',1,NULL,NULL,NULL,NULL,0),(15,4,'eee',NULL,'eee',2,'2017-03-02 15:50:26',2,NULL,NULL,NULL,NULL,0),(16,4,'fff',NULL,'fff',2,'2017-03-02 15:51:32',1,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `t_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task`
--

DROP TABLE IF EXISTS `t_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `description` varchar(20) DEFAULT NULL,
  `creater_id` bigint(20) NOT NULL,
  `type` int(2) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `locked` int(2) DEFAULT NULL,
  `pos` float DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task`
--

LOCK TABLES `t_task` WRITE;
/*!40000 ALTER TABLE `t_task` DISABLE KEYS */;
INSERT INTO `t_task` VALUES (28,'收件箱',NULL,4,1,'2017-02-27 22:54:38',NULL,11,NULL,NULL,65535,NULL,NULL,NULL),(29,'开发中',NULL,4,1,'2017-02-27 22:54:38',NULL,11,NULL,NULL,131071,NULL,NULL,NULL),(30,'待测试',NULL,4,1,'2017-02-27 22:54:38',NULL,11,NULL,NULL,196606,NULL,NULL,NULL),(31,'待发布',NULL,4,1,'2017-02-27 22:54:38',NULL,11,NULL,NULL,262141,NULL,NULL,NULL),(32,'已发布',NULL,4,1,'2017-02-27 22:54:38',NULL,11,NULL,NULL,327676,NULL,NULL,NULL),(37,'aaaa',NULL,4,2,'2017-02-28 14:59:06',NULL,28,NULL,0,131070,NULL,NULL,NULL),(38,'ccc',NULL,4,2,'2017-02-28 14:59:47',NULL,28,NULL,0,196605,NULL,NULL,NULL),(39,'vvv',NULL,4,2,'2017-02-28 16:10:20',NULL,28,'1970-01-01 08:00:00',0,262140,NULL,NULL,NULL),(40,'要做',NULL,4,1,'2017-03-02 15:17:08',NULL,12,NULL,NULL,65535,NULL,NULL,NULL),(41,'在做',NULL,4,1,'2017-03-02 15:17:08',NULL,12,NULL,NULL,131071,NULL,NULL,NULL),(42,'待定',NULL,4,1,'2017-03-02 15:17:08',NULL,12,NULL,NULL,196606,NULL,NULL,NULL),(43,'要做',NULL,4,1,'2017-03-02 15:23:40',NULL,13,NULL,NULL,65535,NULL,NULL,NULL),(44,'在做',NULL,4,1,'2017-03-02 15:23:40',NULL,13,NULL,NULL,131071,NULL,NULL,NULL),(45,'待定',NULL,4,1,'2017-03-02 15:23:40',NULL,13,NULL,NULL,196606,NULL,NULL,NULL),(46,'要做',NULL,4,1,'2017-03-02 15:49:16',NULL,14,NULL,NULL,65535,NULL,NULL,NULL),(47,'在做',NULL,4,1,'2017-03-02 15:49:16',NULL,14,NULL,NULL,131071,NULL,NULL,NULL),(48,'待定',NULL,4,1,'2017-03-02 15:49:16',NULL,14,NULL,NULL,196606,NULL,NULL,NULL),(49,'要做',NULL,4,1,'2017-03-02 15:50:26',NULL,15,NULL,NULL,65535,NULL,NULL,NULL),(50,'在做',NULL,4,1,'2017-03-02 15:50:26',NULL,15,NULL,NULL,131071,NULL,NULL,NULL),(51,'待定',NULL,4,1,'2017-03-02 15:50:26',NULL,15,NULL,NULL,196606,NULL,NULL,NULL),(52,'要做',NULL,4,1,'2017-03-02 15:51:32',NULL,16,NULL,NULL,65535,NULL,NULL,NULL),(53,'在做',NULL,4,1,'2017-03-02 15:51:32',NULL,16,NULL,NULL,131071,NULL,NULL,NULL),(54,'待定',NULL,4,1,'2017-03-02 15:51:32',NULL,16,NULL,NULL,196606,NULL,NULL,NULL);
/*!40000 ALTER TABLE `t_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task_assignment`
--

DROP TABLE IF EXISTS `t_task_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task_assignment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `task_id` bigint(20) NOT NULL,
  `follower_id` bigint(20) DEFAULT NULL,
  `assigner_id` bigint(20) DEFAULT NULL,
  `attach_id` bigint(20) DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task_assignment`
--

LOCK TABLES `t_task_assignment` WRITE;
/*!40000 ALTER TABLE `t_task_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_task_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task_attachment`
--

DROP TABLE IF EXISTS `t_task_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task_attachment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `task_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `description` varchar(20) DEFAULT NULL,
  `path` text,
  `create_time` datetime DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `suffix` int(4) DEFAULT NULL,
  `foler_id` bigint(20) DEFAULT NULL,
  `type` int(4) DEFAULT NULL,
  `tree_path` text,
  `is_deleted` int(2) DEFAULT '0',
  `update_time` datetime DEFAULT NULL,
  `icon` text,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task_attachment`
--

LOCK TABLES `t_task_attachment` WRITE;
/*!40000 ALTER TABLE `t_task_attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_task_attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task_check_item`
--

DROP TABLE IF EXISTS `t_task_check_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task_check_item` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` bigint(20) NOT NULL,
  `task_id` bigint(20) NOT NULL,
  `content` text,
  `achievement` int(2) DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task_check_item`
--

LOCK TABLES `t_task_check_item` WRITE;
/*!40000 ALTER TABLE `t_task_check_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_task_check_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task_comment`
--

DROP TABLE IF EXISTS `t_task_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sender_id` bigint(20) NOT NULL,
  `task_id` bigint(11) NOT NULL,
  `content` text,
  `attachment` varchar(48) DEFAULT NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task_comment`
--

LOCK TABLES `t_task_comment` WRITE;
/*!40000 ALTER TABLE `t_task_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_task_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task_log`
--

DROP TABLE IF EXISTS `t_task_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `task_id` bigint(20) NOT NULL,
  `type` int(2) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `content` text,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task_log`
--

LOCK TABLES `t_task_log` WRITE;
/*!40000 ALTER TABLE `t_task_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_task_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task_tag`
--

DROP TABLE IF EXISTS `t_task_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task_tag` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `task_id` bigint(20) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `color` int(10) DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task_tag`
--

LOCK TABLES `t_task_tag` WRITE;
/*!40000 ALTER TABLE `t_task_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_task_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_team`
--

DROP TABLE IF EXISTS `t_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_team` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `description` text,
  `creater_id` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `industry` int(2) DEFAULT NULL,
  `scale` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `logo` varchar(48) DEFAULT NULL,
  `publicity` int(2) DEFAULT NULL,
  `default_tag` varchar(20) DEFAULT NULL,
  `default_project_id` bigint(20) DEFAULT NULL,
  `default_template_id` bigint(20) DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_team`
--

LOCK TABLES `t_team` WRITE;
/*!40000 ALTER TABLE `t_team` DISABLE KEYS */;
INSERT INTO `t_team` VALUES (1,'aaa',NULL,4,'2017-02-14 23:18:56',NULL,0,'0',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(2,'aaa','',4,'2017-02-15 00:35:50',NULL,1,NULL,'','','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(3,'cccc','',4,'2017-03-03 10:47:57',NULL,3,'','','','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(6,'dddd','',4,'2017-03-03 23:52:35',NULL,2,'','','','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(7,'eeee','',4,'2017-03-04 00:19:09',NULL,2,'','','','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(8,'fffff','',4,'2017-03-04 00:19:41',NULL,3,'','','','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `t_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(48) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `head` varchar(48) DEFAULT NULL,
  `email` varchar(48) DEFAULT NULL,
  `position` varchar(20) DEFAULT NULL,
  `department` varchar(20) DEFAULT NULL,
  `signature` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `wechat` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `salt` varchar(32) DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (4,'desmond','c5dea055dfcfb15cd9c24018bf821916',NULL,NULL,NULL,NULL,NULL,'13585871125',NULL,'2017-01-08 21:07:10',NULL,'b9c9e7ef2dd9bc374a5d8d5e8f8a999e',NULL,NULL,NULL),(5,'铜仁','ee8ce9ff46efad5ea4249b3419a2beeb',NULL,NULL,NULL,NULL,NULL,'12444444444',NULL,'2017-02-27 21:33:21',NULL,'ded4bcef00d3bb156fce3bd13189802a',NULL,NULL,NULL);
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_role`
--

DROP TABLE IF EXISTS `t_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `team_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_role`
--

LOCK TABLES `t_user_role` WRITE;
/*!40000 ALTER TABLE `t_user_role` DISABLE KEYS */;
INSERT INTO `t_user_role` VALUES (1,4,1,NULL,1),(2,4,1,NULL,2),(4,4,1,8,NULL),(5,4,1,9,NULL),(6,4,5,10,NULL),(7,4,5,11,NULL),(8,4,5,12,NULL),(9,4,5,13,NULL),(10,4,5,14,NULL),(11,4,5,15,NULL),(12,4,5,16,NULL),(13,4,1,NULL,3),(14,4,1,NULL,4),(15,4,1,NULL,5),(16,4,1,NULL,6),(17,4,1,NULL,7),(18,4,NULL,NULL,7),(19,4,1,NULL,8),(20,4,NULL,NULL,8);
/*!40000 ALTER TABLE `t_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-05 19:03:25
