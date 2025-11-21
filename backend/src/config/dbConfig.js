export const dbConfig = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "P@assw0rd123",
  server: process.env.DB_SERVER || "db",
  database: process.env.DB_NAME || "DicriDB",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
