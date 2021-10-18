
insert into user(full_name, email, is_active) values ('hai.nguyen', 'hai@gmail.com', 1),
('an.nguyen', 'an@gmail.com', 1), ('anh.nguyen', 'anh@gmail.com', 1),
('hanh.nguyen', 'hanh@gmail.com', 1), ('thinh.nguyen', 'thinh@gmail.com', 1);



insert into room(owner_id) values (1), (2), (2), (1), (1);

insert into room_detail(room_id, user_id, comment) values (1, 1, 'Hello every one'), 
(1, 2, 'Hello world!'), (2, 3, 'Good morning!'), (3, 4, 'Xin chao'), (4, 5, 'Share and subscribe');