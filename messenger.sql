
DROP DATABASE messenger;
create database if not exists messenger;
use messenger;


create table if not exists `user` (
id int(11) primary key AUTO_INCREMENT,
full_name varchar(255),
email varchar(255),
is_active tinyint(1),
created_at timestamp default now(),
updated_at timestamp
);

create table if not exists `room` (
id int(11) primary key AUTO_INCREMENT,
owner_id int(11),
created_at timestamp default now(),
last_message text,
totalMember int,
updated_at timestamp,
foreign key (`owner_id`) references `user` (`id`)
);

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

Create trigger Trig_last_message 
ON `room_detail`
FOR Insert
AS
	Begin
		Declare @tableId int
		Select @tableId = tableId
		From inserted
		---update Table
		execute UpdateTableStatus @tableId,2 --trang thai co nguoi
	End