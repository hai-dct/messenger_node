
DROP DATABASE messenger;
create database if not exists messenger;
use messenger;

DROP table IF EXISTS `user`;
create table if not exists `user` (
id int(11) primary key AUTO_INCREMENT,
full_name varchar(255),
email varchar(255),
is_active tinyint(1),
password varchar(8),
avatar_url varchar(255) default null,
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

DROP PROCEDURE IF EXISTS createComment;
DELIMITER $$
Create procedure createComment(room_id int, user_id int, newComment text)
	Begin
		insert into room_detail(room_id, user_id, comment) 
		values (room_id, user_id, newComment);
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

DROP trigger IF EXISTS Trig_last_message;
DELIMITER $$
Create trigger Trig_last_message after Insert ON `room_detail`
for each row
call UpdateLastMessage(new.room_id, new.comment) $$
DELIMITER ;