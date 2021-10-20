
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

ALTER TABLE user
ADD COLUMN avatar_url varchar(255) after email;

Update user Set avatar_url='https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/81216473_1249494571908479_4376391655364755456_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=o39UauENucsAX_RSOQi&tn=BWMfM16Xz_QypOR_&_nc_ht=scontent.fsgn2-1.fna&oh=c7f4877369dd760c74a0cee80b3023ae&oe=61940E68' Where id = 5;
Update user Set avatar_url='https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/173971208_3667585750013438_2786286715912815545_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=yZvBBWv2Lu8AX9HkocA&_nc_ht=scontent.fsgn2-4.fna&oh=3a1711c07b21575d95d81d195dfff5fe&oe=61970815' Where id = 45;