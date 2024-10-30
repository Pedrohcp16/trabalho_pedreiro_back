import mysql from 'mysql2/promise';

mysql.createConnection ({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
})

console.log('conexão criada!');