
insert into user(full_name, email, is_active, password) values ('hai.nguyen', 'hai@gmail.com', 1, '1234'),
('an.nguyen', 'an@gmail.com', 1, '1234'), ('anh.nguyen', 'anh@gmail.com', 1, '1234'),
('hanh.nguyen', 'hanh@gmail.com', 1, '1234'), ('thinh.nguyen', 'thinh@gmail.com', 1, '1234');



insert into room(owner_id) values (5), (15), (15), (5), (5);

insert into room_detail(room_id, user_id, comment) values (105, 5, 'Hello every one'), 
(105, 15, 'Hello world!'), (125, 25, 'Good morning!'), (125, 35, 'Xin chao'), (135, 45, 'Share and subscribe');