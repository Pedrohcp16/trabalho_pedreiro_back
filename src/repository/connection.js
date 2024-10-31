import mysql from 'mysql2/promise';

let con = await mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'user123',
    database: 'pedreiro'
})

console.log('conexão criada!');

export default con;