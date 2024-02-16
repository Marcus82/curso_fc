const express = require('express') 
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')

const connection = mysql.createConnection(config)
connection.connect();

const tableName = 'people';

// Verifica se a tabela já existe antes de tentar criar
connection.query(`SHOW TABLES LIKE '${tableName}'`, (err, result) => {
    if (err) throw err;
  
    // Verifica se a tabela existe
    if (result.length === 0) {
      
        // A tabela não existe, vamos criá-la
        const createTableQuery = `CREATE TABLE ${tableName}(id int not null auto_increment, name varchar(255), primary key(id))`;
  
        connection.query(createTableQuery, (err, result) => {
            if (err) throw err;
                console.log('Tabela criada com sucesso!');
        });
    } else {
        console.log('A tabela já existe.');
    }

});

// Insere registro na tabela
const insertQuery = `INSERT INTO ${tableName}(name) values ('Soares')`

connection.query(insertQuery, (err, result) => {
    if (err) throw err;
    
    console.log(`Registro inserido com sucesso. ID do novo registro: ${result.insertId}`);
  
});


// Consulta registros da tabela
let resultsQuery = [];
const selectQuery = `SELECT * FROM ${tableName}`;

connection.query(selectQuery, (err, results) => {
    if (err) throw err;

    resultsQuery = results;
    // Exibindo os resultados
    console.log('Registros na tabela "people":');
    results.forEach((row) => {
        console.log(`ID: ${row.id}, Name: ${row.name}`);
    });

});


// Fecha a conexão
connection.end();


app.get('/', (req,res) => {

    let htmlResponse = '<h1>Full Cycle</h1>';

    htmlResponse += '<h2>Lista de Nomes:</h2>';
    htmlResponse += '<ul>';

    resultsQuery.forEach(person => {
        htmlResponse += `<li>ID: ${person.id}, Name: ${person.name}</li>`;
    });

    htmlResponse += '</ul>';

    res.send(htmlResponse)
    
})

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)
})