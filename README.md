# wonki
WONKI: wonderful keeper for your impressions

원기와 함께하는 즐거운 1일 펫프로젝트~
이름 지은사람 천재?


## SETing mysql db

users table
```
CREATE TABLE users ( 
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    `username` VARCHAR(20) NOT NULL, 
    `password` CHAR(60) NOT NULL, 
        PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) 
);
```
