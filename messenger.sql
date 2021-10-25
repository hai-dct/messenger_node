
DROP DATABASE messenger;
create database if not exists messenger;
use messenger;

DROP table IF EXISTS `user`;
create table if not exists `user` (
id int(11) primary key AUTO_INCREMENT,
full_name varchar(255),
email varchar(255),
avatar_url varchar(255) default null,
is_active tinyint(1),
password varchar(8),
token varchar(255),
created_at timestamp default now(),
updated_at timestamp
);

DROP table IF EXISTS `room`;
create table if not exists `room` (
id int(11) primary key AUTO_INCREMENT,
owner_id int(11),
created_at timestamp default now(),
last_message text,
totalMember int,
updated_at timestamp,
foreign key (`owner_id`) references `user` (`id`)
);

DROP table IF EXISTS `room_detail`;
create table if not exists `room_detail` (
id int(11) primary key AUTO_INCREMENT,
room_id int(11),
user_id int(11),
comment text,
created_at timestamp default now(),
updated_at timestamp,
foreign key (`room_id`) references `room` (`id`),
foreign key (`user_id`) references `user` (`id`) 
);

DROP table IF EXISTS `stories`;
create table if not exists `stories` (
id int(11) primary key AUTO_INCREMENT,
user_id int(11),
image_url varchar(255),
created_at timestamp default now(),
updated_at timestamp default now(),
foreign key (`user_id`) references `user` (`id`) 
);

DROP table IF EXISTS `comment_photos`;
create table if not exists `comment_photos` (
id int(11) primary key AUTO_INCREMENT,
room_detail_id int(11),
image_url varchar(255),
created_at timestamp default now(),
updated_at timestamp default now(),
foreign key (`room_detail_id`) references `room_detail` (`id`) 
);

DROP PROCEDURE IF EXISTS createComment;
DELIMITER $$
Create procedure createComment(room_id int, user_id int, newComment text)
	Begin
		insert into room_detail(room_id, user_id, comment) 
		values (room_id, user_id, newComment);
	End; $$
DELIMITER;

DROP PROCEDURE IF EXISTS createStory;
DELIMITER $$
Create procedure createStory(user_id int, image_url varchar(255))
	Begin
		insert into stories(user_id, image_url) 
		values (user_id, image_url);
	End; $$
DELIMITER;

DROP PROCEDURE IF EXISTS UpdateLastMessage;
DELIMITER $$
Create procedure UpdateLastMessage(room_id int, newComment text)
	Begin
		Update room
		Set last_message=newComment, updated_at=CURRENT_TIMESTAMP
		Where id = room_id
	End; $$
DELIMITER ;

DROP PROCEDURE IF EXISTS searchUser;
DELIMITER $$
Create procedure searchUser(query varchar(255))
	Begin
		select * from user where full_name like CONCAT('%', query, '%')
	End; $$
DELIMITER;

DROP PROCEDURE IF EXISTS UpdateUserToken;
DELIMITER $$
Create procedure UpdateUserToken(user_id int, token varchar(255))
	Begin
		Update user Set token=token Where id = user_id
	End; $$
DELIMITER ;

DROP trigger IF EXISTS Trig_last_message;
DELIMITER $$
Create trigger Trig_last_message after Insert ON `room_detail`
for each row
call UpdateLastMessage(new.room_id, new.comment) $$
DELIMITER ;

ALTER TABLE user ADD COLUMN avatar_url varchar(255) after email;
ALTER TABLE user ADD COLUMN token varchar(255) after password;
ALTER TABLE room_detail ADD COLUMN photos varchar(255) after comment;

Update user Set avatar_url='https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg' Where id = 5;
Update user Set avatar_url='https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg' Where id = 15;
Update user Set avatar_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2yLsax2357l_Sli3jpe-kg1mdyJV9A3JjA&usqp=CAU' Where id = 25;
Update user Set avatar_url='https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=20&m=1057506940&s=612x612&w=0&h=3j5EA6YFVg3q-laNqTGtLxfCKVR3_o6gcVZZseNaWGk=' Where id = 35;
Update user Set avatar_url='https://static.addtoany.com/images/dracaena-cinnabari.jpg' Where id = 45;