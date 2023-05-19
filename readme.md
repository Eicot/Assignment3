<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
<summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-introduction">Project Introduction</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#data-source">Data Source</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#data-preparation-and-loading">Data Preparation and Loading</a></li>
        <li><a href="#setting-up-front-end">Setting Up Front-End</a></li>
        <li><a href="#setting-up-back-end">Setting Up Back-End</a></li>
      </ul>
    </li>
    <li>
      <a href="#crud-for-front-end-and-back-end">CRUD for Front-End and Back-End</a>
      <ul>
        <li><a href="#front-end-crud-setup">Front-End CRUD Setup</a></li>
        <li><a href="#back-end-crud-setup">Back-End CRUD Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-setup">Project Setup</a></li>
  </ol>
</details>




To start mysql, in the terminal, type in `mysql -u root`

# Create a new database user
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


## Dependencies
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
