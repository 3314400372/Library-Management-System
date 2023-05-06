/*
 Navicat Premium Data Transfer

 Source Server         : my
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : book

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 06/05/2023 13:33:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `bookname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '书名',
  `author` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '作者',
  `introduce` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '介绍',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `inventory` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '库存',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '三国演义', '罗贯中', '《三国演义》（又名《三国志演义》《三国志通俗演义》）是元末明初小说家罗贯中根据陈寿《三国志》和裴松之注解以及民间三国故事传说经过艺术加工创作而成的长篇章回体历史演义小说，与《西游记》《水浒传》《红楼梦》并称为中国古典四大名著。', 29.90, '96');
INSERT INTO `book` VALUES (2, '水浒传', '施耐庵', '《水浒传》是元末明初施耐庵（现存刊本署名大多有施耐庵、罗贯中两人中的一人，或两人皆有）编著的章回体长篇小说。\r\n全书通过描写梁山好汉反抗欺压、水泊梁山壮大和受宋朝招安，以及受招安后为宋朝征战，最终消亡的宏大故事，艺术地反映了中国历史上宋江起义从发生、发展直至失败的全过程，深刻揭示了起义的社会根源，满腔热情地歌颂了起义英雄的反抗斗争和他们的社会理想，也具体揭示了起义失败的内在历史原因。 [28]\r\n《水浒传》是中国古典四大名著之一，问世后，在社会上产生了巨大的影响，成为后世中国小说创作的典范。《水浒传》是中国历史上最早用白话文写成的章回小说之一，流传极广，脍炙人口；同时也是汉语言文学中具备史诗特征的作品之一，对中国乃至东亚的叙事文学都有深远的影响。', 39.90, '99');
INSERT INTO `book` VALUES (3, '红楼梦', '曹雪芹', '《红楼梦》，原名《石头记》，中国古代章回体长篇小说，中国古典四大名著之一。其通行本共120回，一般认为前80回是清代作家曹雪芹所著，后40回作者为无名氏，由高鹗，程伟元整理。小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一些闺阁佳人的人生百态，展现了真正的人性美和悲剧美，是一部从各个角度展现女性美以及中国古代社会百态的史诗性著作。', 17.90, '77');
INSERT INTO `book` VALUES (4, '西游记', '吴承恩', '《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。 [39] [41] 今见最早的《西游记》版本是明代万历二十年金陵世德堂《新刻出像官板大字西游记》，未署作者姓名。 [63] 鲁迅、董作宾等人根据《淮安府志》“吴承恩《西游记》”的记载予以最终论定“吴承恩原著”。 [63]\r\n该小说主要讲述了孙悟空出世，跟随菩提祖师学艺及大闹天宫后，遇见了唐僧、猪八戒、沙僧和白龙马，西行取经，一路上历经艰险，降妖除魔，经历了九九八十一难，终于到达西天见到如来佛祖，最终五圣成真的故事。该小说以“玄奘取经”这一历史事件为蓝本，经作者的艺术加工，深刻地描绘出明代百姓的社会生活状况。\r\n《西游记》是中国神魔小说的经典之作，达到了古代长篇浪漫主义小说的巅峰，与《三国演义》《水浒传》《红楼梦》并称为中国古典四大名著。《西游记》自问世以来在民间广为流传，各式各样的版本层出不穷。明代刊本有六种，清代刊本、抄本也有七种，典籍所记已佚版本十三种。鸦片战争以后，大量中国古典文学作品被译为西文，《西游记》渐渐传入欧美，被译为英、法、德、意、西、手语、世（世界语）、斯（斯瓦希里语）、俄、捷、罗、波、日、朝、越等语言。 [1]\r\n', 49.90, '116');
INSERT INTO `book` VALUES (5, '活着', '余华', '《活着》讲述了在大时代背景下，随着内战、三反五反、大跃进、“文化大革命”等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。小说以普通、平实的故事情节讲述了在急剧变革的时代中福贵的不幸遭遇和坎坷命运，在冷静的笔触中展现了生命的意义和存在的价值，揭示了命运的无奈，与生活的不可捉摸。 [1]\r\n1994年，改编自该小说的同名剧情片《活着》上映，由张艺谋指导，葛优、巩俐等主演 [19] 1998年7月，《活着》获得意大利“格林扎纳·卡佛”文学奖', 19.90, '198');
INSERT INTO `book` VALUES (6, '兄弟', '余华', '兄弟》是作家余华创作的长篇小说，共分上、下两部，首次出版于2005年8月。\r\n该小说讲述了小镇重组家庭中的两兄弟李光头和宋钢在二十世纪六七十年代和改革开放初期所经历的种种磨难。作者以荒诞手法再现历史，是为表现对六七十年代强权的批判，以及对改革开放初期民众精神生活匮乏的担忧和些许的人性关怀。', 27.90, '98');
INSERT INTO `book` VALUES (7, '《JavaScript 高级程序设计》', 'Nicholas C. Zakas', '经典的 JavaScript 教材，适合进阶学习。', 129.00, '100');
INSERT INTO `book` VALUES (8, '倾城之恋', '张爱玲', '张爱玲文学代表作之一，风靡全球读者。', 25.00, '80');
INSERT INTO `book` VALUES (9, '围城', '钱钟书', '钱钟书先生代表作，是中国现代文学经典之一。', 28.00, '70');
INSERT INTO `book` VALUES (10, '追风筝的人', '卡勒德·胡赛尼', '畅销书，描绘了一个关于父子情、友情、自由自在、自由负责、救赎等主题的故事。', 18.80, '79');
INSERT INTO `book` VALUES (11, '三体', '刘慈欣', '中国科幻小说传奇，广受好评。', 19.99, '90');
INSERT INTO `book` VALUES (12, '平凡的世界', '路遥', '中国现代文学经典之一，思想深刻。', 26.00, '49');
INSERT INTO `book` VALUES (13, '小王子', '圣埃克苏佩里', '法国儿童文学经典之作，表达真善美的多重意义。', 18.00, '69');
INSERT INTO `book` VALUES (14, '百年孤独', '加西亚·马尔克斯', '拉丁美洲文学经典之作，描绘了一百年的家族历史。', 23.50, '58');
INSERT INTO `book` VALUES (15, '罪与罚', '陀思妥耶夫斯基', '俄国文学小说代表，是人性探索方面的经典之作。', 21.00, '39');
INSERT INTO `book` VALUES (16, '偷影子的人', '马克·李维', '该书被誉为“童话世界启蒙者”的新生代瑞典华人作家所著散文集，温馨动人。', 23.00, '55');
INSERT INTO `book` VALUES (17, '二十四节气的饮食', '曾仕强', '讲述中国传统二十四节气的饮食习惯 book 中，推荐给喜欢饮食和中华文化的朋友。', 18.88, '90');
INSERT INTO `book` VALUES (18, '解忧杂货店', '东野圭吾', '日本作家东野圭吾代表作之一，它讲述了困扰普通人的心理疾病和烦恼。', 15.99, '69');
INSERT INTO `book` VALUES (19, '白鹿原', '陈忠实', '中国当代文学小说经典之作，讲述了一个山西乡村家族三代人的命运历程。', 22.80, '59');
INSERT INTO `book` VALUES (20, '天龙八部', '金庸', '武侠小说经典名著之一，揭示出东方武学文化智慧的深度和奥妙。 ', 21.00, '120');
INSERT INTO `book` VALUES (21, '鬼吹灯系列', '天下霸唱', '以异域探险、惊险刺激见长，玄幻与科幻小说相结合，被称为“中国诡异电影之父”。', 19.99, '80');
INSERT INTO `book` VALUES (22, '情人', '王小波', '王小波文学经典之一，讲述了一段关于清末知识分子的情感故事。', 19.90, '49');
INSERT INTO `book` VALUES (23, '芒果街上的小屋', '桑迪·托克维尔', '美国青少年文学作品，探讨成长、家庭、人际关系和种族等话题，引人入胜。', 24.00, '88');
INSERT INTO `book` VALUES (24, '1984', '乔治·奥威尔', '英国小说家奥威尔代表作之一，反映了极权主义的危害以及价值观和道德观被扭曲的后果。', 26.80, '58');
INSERT INTO `book` VALUES (25, '白夜行', '东野圭吾', '日本著名推理小说家东野圭吾代表作之一，复杂精巧的情节令人满意。', 16.80, '70');
INSERT INTO `book` VALUES (26, '了不起的盖茨比', '菲茨杰拉德', '美国文学经典之一，讲述了一段关于爱、财富、荣耀和人性真相的故事。', 18.50, '78');
INSERT INTO `book` VALUES (27, '哈利·波特与魔法石', 'J.K. 罗琳', '哈利·波特系列的第一部，畅销全球，影响了整个世代的读者。', 22.50, '98');
INSERT INTO `book` VALUES (28, '飘', '玛格丽特·米切尔', '美国南方庄园文学代表作之一，描绘南北战争期间南方妇女思想、生活状态和情感变化。', 23.80, '58');
INSERT INTO `book` VALUES (29, '百年孤独', '加西亚·马尔克斯', '现代文学经典作品，以马奇亚多家族七代人100年的历史为主线，讲述了在一个荒凉神秘的小村庄中发生的故事。', 29.99, '78');
INSERT INTO `book` VALUES (31, '荆棘鸟', '柯南·道尔', '侦探小说之经典作品，由名侦探福尔摩斯、华生博士，以及美艳善变的女盗莫里亚蒂组合而成。', 19.99, '57');
INSERT INTO `book` VALUES (32, '草房子', '曹文轩', '儿童文学经典之一，描写了农村小孩的天真与憧憬。', 15.99, '100');
INSERT INTO `book` VALUES (33, '阳关', '钱钟书', '中国现代文学经典，以北方农村为背景，描写了三代人的爱情、友情和命运的变迁。', 26.80, '70');
INSERT INTO `book` VALUES (34, '无人生还', '阿加莎·克里斯蒂', '英国女作家阿加莎·克里斯蒂代表作之一，经典侦探小说。', 18.88, '50');
INSERT INTO `book` VALUES (35, '打工族日记', '秦文君', '时下社会最具代表性、最极端的年轻人，他们是改革开放以来社会变革的产物，它讲述了在都市打拼的青年群体日常生活点滴。', 20.00, '60');
INSERT INTO `book` VALUES (36, '麦田里的守望者', 'J.D.塞林格', '美国现代文学代表作，描写了青少年对社会失望、对生活迷惘的混乱心理，引起了世界读者的广泛共鸣。', 22.50, '80');
INSERT INTO `book` VALUES (37, '雪山飞狐', '金庸', '武侠小说经典名著之一，通过主人公韦小宝的经历展现了中国民间传说和丰富多彩的江湖世界。', 21.00, '58');
INSERT INTO `book` VALUES (38, '万历十五年', '黄仁宇', '中国史学家黄仁宇的代表作之一，描述了明朝万历年间中国社会的种种变迁。', 26.80, '49');
INSERT INTO `book` VALUES (39, '神雕侠侣', '金庸', '武侠小说经典名著之一，主要讲述了楚留香和李莫愁之间的爱情故事。', 22.99, '69');
INSERT INTO `book` VALUES (40, '孩子你慢慢来', '龙应台', '讲述了女性成长的艰辛历程，描绘了台湾传统家庭及其与现代社会的矛盾冲突。', 18.88, '59');
INSERT INTO `book` VALUES (41, '布局', '迟福林', '一本系统、全面地阐述“布局”这个概念，以及相关知识的书籍。', 25.00, '80');
INSERT INTO `book` VALUES (42, '大主宰', '天蚕土豆', '《大主宰》是天蚕土豆在2013年创作的第四部长篇小说，首发于起点中文网，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。\n2016年11月大主宰荣登2016中国泛娱乐指数盛典中国IP价值榜-网络文学榜top10。2017年7月12日，《2017猫片 胡润原创文学IP价值榜》发布，《大主宰》位列41位。', 39.00, '20');

-- ----------------------------
-- Table structure for borrowing
-- ----------------------------
DROP TABLE IF EXISTS `borrowing`;
CREATE TABLE `borrowing`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `bookname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '书名',
  `time` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '借阅时间',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '借阅用户',
  `urgerepayment` int(0) NULL DEFAULT 1 COMMENT '是否催还(0,1)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of borrowing
-- ----------------------------
INSERT INTO `borrowing` VALUES (2, '活着', '2023-05-05 11:11:42', 'zkk', 0);
INSERT INTO `borrowing` VALUES (11, '活着', '2023-05-05 10:26:45', 'zk', 0);
INSERT INTO `borrowing` VALUES (15, '三国演义', '2023-05-05 16:38:40', 'lds', 1);
INSERT INTO `borrowing` VALUES (23, '了不起的盖茨比', '2023-05-05 23:22:44', 'lzy', 1);
INSERT INTO `borrowing` VALUES (24, '哈利·波特与魔法石', '2023-05-05 23:22:46', 'lzy', 1);
INSERT INTO `borrowing` VALUES (29, '追风筝的人', '2023-05-06 11:28:25', 'lxx', 1);
INSERT INTO `borrowing` VALUES (30, '活着', '2023-05-06 11:28:27', 'lxx', 1);
INSERT INTO `borrowing` VALUES (31, '兄弟', '2023-05-06 11:28:29', 'lxx', 1);
INSERT INTO `borrowing` VALUES (32, '解忧杂货店', '2023-05-06 11:28:33', 'lxx', 1);
INSERT INTO `borrowing` VALUES (33, '小王子', '2023-05-06 11:28:35', 'lxx', 1);
INSERT INTO `borrowing` VALUES (35, '平凡的世界', '2023-05-06 11:28:38', 'lxx', 1);
INSERT INTO `borrowing` VALUES (36, '白鹿原', '2023-05-06 11:28:40', 'lxx', 1);
INSERT INTO `borrowing` VALUES (37, '了不起的盖茨比', '2023-05-06 11:28:43', 'lxx', 1);
INSERT INTO `borrowing` VALUES (39, '1984', '2023-05-06 11:28:47', 'lxx', 1);
INSERT INTO `borrowing` VALUES (40, '百年孤独', '2023-05-06 11:28:49', 'lxx', 1);
INSERT INTO `borrowing` VALUES (42, '1984', '2023-05-06 11:36:13', 'zk', 1);
INSERT INTO `borrowing` VALUES (46, '万历十五年', '2023-05-06 11:56:52', 'lcc', 0);
INSERT INTO `borrowing` VALUES (47, '哈利·波特与魔法石', '2023-05-06 11:56:11', 'lcc', 1);
INSERT INTO `borrowing` VALUES (50, '三国演义', '2023-05-06 12:28:26', 'zk', 0);

-- ----------------------------
-- Table structure for borrowinghistory
-- ----------------------------
DROP TABLE IF EXISTS `borrowinghistory`;
CREATE TABLE `borrowinghistory`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `bookname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '书名',
  `time` datetime(0) NOT NULL COMMENT '借阅时间',
  `returntime` datetime(0) NOT NULL COMMENT '归还时间',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of borrowinghistory
-- ----------------------------
INSERT INTO `borrowinghistory` VALUES (1, '平凡的世界', '2023-04-05 17:26:02', '2023-04-20 15:26:12', 'zk');
INSERT INTO `borrowinghistory` VALUES (2, '你好', '2023-04-12 15:27:40', '2023-04-20 15:27:44', 'zkk');
INSERT INTO `borrowinghistory` VALUES (3, '三国演义', '2023-04-16 05:27:40', '2023-04-12 15:27:40', 'zk');
INSERT INTO `borrowinghistory` VALUES (4, '红楼梦', '2023-04-12 11:07:40', '2023-05-02 15:08:03', 'lds');
INSERT INTO `borrowinghistory` VALUES (5, '三国演义', '2023-05-05 11:11:09', '2023-05-05 18:29:28', 'zk');
INSERT INTO `borrowinghistory` VALUES (6, '百年孤独', '2023-05-05 23:22:42', '2023-05-05 23:32:52', 'lzy');
INSERT INTO `borrowinghistory` VALUES (7, '飘', '2023-05-05 23:22:47', '2023-05-05 23:32:55', 'lzy');
INSERT INTO `borrowinghistory` VALUES (8, '情人', '2023-05-05 23:22:52', '2023-05-05 23:33:00', 'lzy');
INSERT INTO `borrowinghistory` VALUES (9, '芒果街上的小屋', '2023-05-05 23:23:13', '2023-05-05 23:33:02', 'lzy');
INSERT INTO `borrowinghistory` VALUES (10, '西游记', '2023-05-05 23:22:38', '2023-05-05 23:33:15', 'lzy');
INSERT INTO `borrowinghistory` VALUES (11, '三国演义', '2023-05-05 23:23:09', '2023-05-05 23:34:49', 'zk');
INSERT INTO `borrowinghistory` VALUES (12, '荆棘鸟', '2023-05-06 00:13:27', '2023-05-06 00:13:39', 'lzy');
INSERT INTO `borrowinghistory` VALUES (13, '西游记', '2023-05-05 18:14:33', '2023-05-06 11:13:51', 'zk');
INSERT INTO `borrowinghistory` VALUES (14, '孩子你慢慢来', '2023-05-05 23:33:42', '2023-05-06 11:14:43', 'zk');
INSERT INTO `borrowinghistory` VALUES (15, '荆棘鸟', '2023-05-06 11:28:50', '2023-05-06 11:33:40', 'lxx');
INSERT INTO `borrowinghistory` VALUES (16, '芒果街上的小屋', '2023-05-06 11:28:45', '2023-05-06 11:34:03', 'lxx');
INSERT INTO `borrowinghistory` VALUES (17, '罪与罚', '2023-05-06 11:28:37', '2023-05-06 11:34:10', 'lxx');
INSERT INTO `borrowinghistory` VALUES (18, '雪山飞狐', '2023-05-05 23:21:44', '2023-05-06 11:36:21', 'zk');
INSERT INTO `borrowinghistory` VALUES (19, '神雕侠侣', '2023-05-06 11:56:04', '2023-05-06 11:56:18', 'lcc');
INSERT INTO `borrowinghistory` VALUES (20, '飘', '2023-05-06 11:56:13', '2023-05-06 11:56:21', 'lcc');
INSERT INTO `borrowinghistory` VALUES (21, '雪山飞狐', '2023-05-06 11:56:06', '2023-05-06 11:56:22', 'lcc');
INSERT INTO `borrowinghistory` VALUES (22, '西游记', '2023-05-06 11:56:01', '2023-05-06 11:56:27', 'lcc');
INSERT INTO `borrowinghistory` VALUES (23, '荆棘鸟', '2023-05-06 11:56:50', '2023-05-06 11:57:05', 'lcc');
INSERT INTO `borrowinghistory` VALUES (24, '西游记', '2023-05-05 11:22:15', '2023-05-06 12:28:04', 'zk');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role` int(0) NOT NULL DEFAULT 1 COMMENT '1为管理员，2为普通用户',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (8, 'zkkk', '$2a$10$say6PCai4JQlFiNQUQQ1C.vLMz4b24.pbjI9Bbw8ZOIO74dM33O8O', 1);
INSERT INTO `user` VALUES (9, 'admin1', '$2a$10$a2U3B6x8T8q3NBQIfIC6hOb637CE4s5A3ndXdV780Fq4c8JuEebdK', 1);
INSERT INTO `user` VALUES (10, 'zk', '$2a$10$jcUvX8T.0TIDodUkVGSjs.u5XFJmEECnnYu5GXMt8XqU.jELyoPMi', 1);
INSERT INTO `user` VALUES (11, 'lihua', '$2a$10$l6cOA64ApZ0Io98aszraSujtJ85jtyxvl.Geg226JE8KkvpEzwwWO', 2);
INSERT INTO `user` VALUES (12, 'lcc', '$2a$10$y2BKaRNlFOIMz/2jLsAQveEWu9yEPjNgYv25mcM7WdN2E/dboefLO', 2);
INSERT INTO `user` VALUES (13, 'lcy', '$2a$10$gcllzU/m/sZzBvsLyH7aXezC8CQBGYT4l6/UXNVO.UVfKRxRIkdRW', 2);
INSERT INTO `user` VALUES (14, 'lxx', '$2a$10$HsYUn/QbsKuLf589PzSfYeOnJYcGbOp.X3Yc024jY.PMha7jZgn/u', 2);
INSERT INTO `user` VALUES (15, 'zkk', '$2a$10$K4Xh8/s8xeViIUbNmS9afe5Ex8maLYTLgYyAzN5UTxYm1RaAX5b/W', 1);
INSERT INTO `user` VALUES (16, 'wmx', '$2a$10$e4QSA180V0XWZBaYsRjq5OK2iNIInXY.Byj9o1fN7dzPMgDW49OK2', 1);
INSERT INTO `user` VALUES (19, 'lzy', '$2a$10$fja5FVsQTU2uE6wIfmb8NeC08jTPPDs0QxPSiKk1u.GDvkQtmHHpm', 2);
INSERT INTO `user` VALUES (20, 'lds', '$2a$10$pcxncbTSO5yguPbaz/Y7YO5IlsQQsDXS/QvtAFGhiH5Svc76.LaMi', 2);

SET FOREIGN_KEY_CHECKS = 1;
