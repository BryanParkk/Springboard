import pkg from "pg";
const { Pool } = pkg;

console.log("[DB] Initializing pool...");

const pool = new Pool({
  user: "bryanpark",
  host: "localhost",
  database: "flexfit",
  password: "",
  port: 5432,
});

console.log("[DB] Pool created");

export default {
  query: (text, params) => {
    console.log("[DB] Query:", text);
    return pool.query(text, params);
  },
};
