// import pkg from "pg";
// const { Pool } = pkg;

// console.log("[DB] Initializing pool...");

// const pool = new Pool({
//   user: "bryanpark",
//   host: "localhost",
//   database: "flexfit",
//   password: "",
//   port: 5432,
// });

// console.log("[DB] Pool created");

// export default {
//   query: (text, params) => {
//     console.log("[DB] Query:", text);
//     return pool.query(text, params);
//   },
// };

// server/db/index.js
import pkg from "pg";
const { Pool } = pkg;

const isProd = process.env.NODE_ENV === "production";

// 1) 연결 구성
// - 프로덕션(Render): DATABASE_URL 필수 + SSL
// - 로컬: 개별 env(또는 기본값) 사용
let pool;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Render Postgres는 SSL 필요
    ssl: { rejectUnauthorized: false },
    max: Number(process.env.PGPOOL_MAX || 10),
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT || 30000),
    connectionTimeoutMillis: Number(process.env.PG_CONN_TIMEOUT || 10000),
  });
} else {
  pool = new Pool({
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "flexfit",
    max: Number(process.env.PGPOOL_MAX || 10),
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT || 30000),
    connectionTimeoutMillis: Number(process.env.PG_CONN_TIMEOUT || 10000),
  });
}

if (!isProd) {
  console.log(
    "[DB] Pool created. target:",
    process.env.DATABASE_URL
      ? "DATABASE_URL"
      : `${process.env.PGUSER || "postgres"}@${
          process.env.PGHOST || "localhost"
        }/${process.env.PGDATABASE || "flexfit"}`
  );
}

// 2) 쿼리 도우미 (DEBUG_DB=1 일 때만 로그)
export default {
  query: async (text, params) => {
    const debug = process.env.DEBUG_DB === "1" && !isProd;
    const start = debug ? process.hrtime.bigint() : null;
    try {
      const res = await pool.query(text, params);
      if (debug) {
        const ms = Number((process.hrtime.bigint() - start) / 1000000n);
        console.log(`[DB] ${ms}ms | ${text.split("\n")[0]}`);
      }
      return res;
    } catch (err) {
      if (!isProd) {
        console.error("[DB] Query error:", err?.code, err?.message);
        console.error("[DB] SQL:", text);
        if (params) console.error("[DB] Params:", params);
      }
      throw err;
    }
  },
};

// 3) 안전한 종료
process.on("SIGINT", async () => {
  try {
    await pool.end();
  } finally {
    process.exit(0);
  }
});
process.on("SIGTERM", async () => {
  try {
    await pool.end();
  } finally {
    process.exit(0);
  }
});
