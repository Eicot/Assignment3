<!-- Project Setup -->
## Project setup

To start mysql, in the terminal, type in `mysql -u root`

### Create a new database user
In the MySQL CLI:
```
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
```

```
grant all privileges on *.* to 'foo'@'%';
```

```
FLUSH PRIVILEGES;
```

```
create database shop;
```

```
npm run migrate -- up;
```

```
npm run migrate start;
```


### Installing Dependencies
* `express`
* `hbs`
* `wax-on`
* `dotenv`
* `knex`
* `bookshelf`
* `forms`
* `express-session`
* `session-file-store`
* `connect-flash`
* `csurf`
* `cloudinary`
* `dotenv`
* `stripe`
* `jsonwebtoken`
