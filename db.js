const mysql = require('mysql');

module.exports = class Repository {
    constructor() {
        this.connection;
    }

    async start() {
        this.connection = await new Promise((res, rej) => {
            const _conn = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });

            _conn.connect(function (err) {
                if (err) {
                    rej(err);
                } else {
                    console.log("Database connected!");
                    res(_conn);
                }
            });
        });

        await this.createSchema();
        console.log('Schema created with success.');

        //await this.seedDatabase();
        //console.log('Database has been populated.');
    }

    async createSchema() {
        await this.execute(
            `
                CREATE TABLE IF NOT EXISTS people(
                    name VARCHAR(255) NOT NULL,
                    PRIMARY KEY(name)
                );
            `
        )
    }

    async seedDatabase() {
        await this.execute(
            `
                REPLACE INTO people (name) 
                VALUES 
                ('Vagner Silva'),
                ('Wesley ');
            `
        )
    }

    async findAllPeople() {
        return await this.execute('SELECT * FROM people;');
    }

    async savePerson(name) {
        return await this.execute(`REPLACE INTO people (name) VALUES (\'${name}\');`);
    }

    async execute(sql) {
        return new Promise((res, rej) => {
            this.connection.query(sql, function (err, result) {
                if (err)
                    rej(err);
                res(result);
            });
        });
    }
}



















