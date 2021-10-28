
insert into user(full_name, email, is_active, password) values ('hai.nguyen', 'hai@gmail.com', 1, '1234'),
('an.nguyen', 'an@gmail.com', 1, '1234'), ('anh.nguyen', 'anh@gmail.com', 1, '1234'),
('hanh.nguyen', 'hanh@gmail.com', 1, '1234'), ('thinh.nguyen', 'thinh@gmail.com', 1, '1234');

insert into room(owner_id) values (5), (15), (15), (5), (5);

insert into group_user_room(room_id, user_id, is_owner) values (5, 5, true), 
(5, 15, false), (15, 15, true), (15, 25), (25, 15, true), (25, 25), (35, 5, true), (35, 35), (45, 5, true), (45, 45);

insert into room_detail(room_id, user_id, comment) values (5, 5, 'Hello every one'), 
(5, 15, 'Hello world!'), (15, 25, 'Good morning!'), (25, 35, 'Xin chao'), (35, 45, 'Share and subscribe');


insert into comment_photos(room_detail_id, image_url) values (5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'), 
(5, 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'),
(15, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'), 
(15, 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'), 
(55, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'), 
(55, 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg')