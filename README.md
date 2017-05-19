# wonki
WONKI: wonderful keeper of your inspirations

원기와 함께하는 즐거운 1일 펫프로젝트~
이름 지은사람 천재?


## Getting started

**create users table**
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

**add config files**

config/config.js

```
module.exports = {
  secret: "yoursecretkey"
}
```


config/database.js
```
module.exports = {
    'connection': {
        'host': 'localhost',
        'user': 'user(root)',
        'password': 'p@ssword'
    },
	'database': 'databaseName(wonki)',
    'users_table': 'users'
};
```
