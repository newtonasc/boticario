require('dotenv').config();

async function connect() {
    // Verifica se já existe uma conexão existente
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    // Cria a conexão com o servidor    
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(`${process.env.DATABASE_STRING}`);
    console.log('Connected on MySQL');
    global.connection = connection;
    return connection;
} /// Poderia ser utilizado um ORM (sequelize por exemplo), Mas para realizar o teste vou utilizar a conexão básica.

async function login(user) {
    const conn = await connect();
    const sql = 'SELECT * FROM resellers WHERE res_cpf=? AND res_passwd=MD5(?);';
    const values = [user.cpf.replace(/\D/g, ''), user.passwd];
    const [rows] = await conn.query(sql, values);
    return rows;
}

async function insertReseller(reseller) {
    const conn = await connect();
    const sql = 'INSERT INTO resellers(res_name, res_email, res_cpf, res_passwd, res_address, res_cep, res_uf, res_phone, res_birth) VALUES (?,?,?,MD5(?),?,?,?,?,?);';
    const values = [
        reseller.name,
        reseller.email,
        reseller.cpf,
        reseller.passwd,
        reseller.address,
        reseller.cep,
        reseller.uf,
        reseller.phone,
        reseller.birth
    ];
    return await conn.query(sql, values);
}

async function insertPurshase(purshase) {
    const conn = await connect();
    const sql = 'INSERT INTO purshases(pur_cpf, pur_code, pur_value, pur_sta_id) VALUES (?,?,?,?);';
    const values = [
        purshase.cpf,
        purshase.code,
        purshase.value,
        purshase.status
    ];
    return await conn.query(sql, values);
}

async function getPurshases() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT res_id, res_name, purshases.*, sta_status FROM purshases INNER JOIN resellers ON res_cpf = pur_cpf INNER JOIN status ON sta_id = pur_sta_id;');
    return rows;
}

module.exports = {
    login,
    insertReseller,
    insertPurshase,
    getPurshases
}