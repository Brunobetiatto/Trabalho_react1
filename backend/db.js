import mysl from "mysql2";

export const db = mysl.createConnection({
    host: "localhost",
    user: "root",
    password: "41988224228", 
    database: "crud"
});