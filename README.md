# Virtual Playbill - Gen3

Virtual Playbill in its current form will only track my own collection. To make the platform more flexible, and accessible to additional users, I am rewriting the data model.

## Get started

### Install dependencies

```
$ git clone git@github.com:keighty/virtual_playbill.git
$ cd virtual_playbill
$ npm install
```

### Install mySql

```
$ brew install mysql
$ mysql.server start
$ mysql -uroot

mysql> CREATE USER 'testvp'@'localhost' IDENTIFIED WITH mysql_native_password;
mysql> SET old_passwords = 0;
mysql> SET PASSWORD FOR 'testvp'@'localhost' = PASSWORD('your-new-password');
mysql> exit

// Add your new password to your environment
$ echo 'export MYSQL_TESTVP_PASSWORD="my-new-pass"' >> ~/.bashrc
```

### Setup and seed the database

```
$ npm run setup
```

### Run the app server

```
$ npm start
```

Navigate to [localhost:3000](http://localhost:3000) to test out the api.