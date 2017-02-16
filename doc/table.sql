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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s_permission`
--

LOCK TABLES `s_permission` WRITE;
/*!40000 ALTER TABLE `s_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `s_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s_role`
--

DROP TABLE IF EXISTS `s_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `s_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s_role`
--

LOCK TABLES `s_role` WRITE;
/*!40000 ALTER TABLE `s_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `s_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_project`
--

DROP TABLE IF EXISTS `t_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `limit` int(5) DEFAULT NULL,
  `description` text,
  `team_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_project`
--

LOCK TABLES `t_project` WRITE;
/*!40000 ALTER TABLE `t_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task`
--

DROP TABLE IF EXISTS `t_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `description` varchar(20) DEFAULT NULL,
  `creater_id` int(11) NOT NULL,
  `type` int(2) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `parent_id` int(11) NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_task`
--

LOCK TABLES `t_task` WRITE;
/*!40000 ALTER TABLE `t_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_task_assignment`
--

DROP TABLE IF EXISTS `t_task_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_task_assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `follower_id` int(11) DEFAULT NULL,
  `assigner_id` int(11) DEFAULT NULL,
  `attach_id` int(11) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(20) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `suffix` varchar(20) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `content` text,
  `attachment` varchar(48) DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `description` text,
  `creater_id` int(11) DEFAULT NULL,
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
  `default_project_id` int(11) DEFAULT NULL,
  `default_template_id` int(11) DEFAULT NULL,
  `pending1` varchar(20) DEFAULT NULL,
  `pending2` varchar(20) DEFAULT NULL,
  `pending3` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_team`
--

LOCK TABLES `t_team` WRITE;
/*!40000 ALTER TABLE `t_team` DISABLE KEYS */;
INSERT INTO `t_team` VALUES (1,'aaa',NULL,4,'2017-02-14 23:18:56',NULL,0,'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'aaa','',4,'2017-02-15 00:35:50',NULL,1,NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `t_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (4,'desmond','c5dea055dfcfb15cd9c24018bf821916',NULL,NULL,NULL,NULL,NULL,'13585871125',NULL,'2017-01-08 21:07:10',NULL,'b9c9e7ef2dd9bc374a5d8d5e8f8a999e',NULL,NULL,NULL);
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_role`
--

DROP TABLE IF EXISTS `t_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_role`
--

LOCK TABLES `t_user_role` WRITE;
/*!40000 ALTER TABLE `t_user_role` DISABLE KEYS */;
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

-- Dump completed on 2017-02-16  9:26:57
