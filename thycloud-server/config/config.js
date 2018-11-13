require("dotenv").config(); // instatiate environment variables

let CONFIG = {}; // Make this global to use all over the application

CONFIG.app = process.env.APP || "dev";
CONFIG.port = process.env.PORT || "3000";

CONFIG.db_dialect = process.env.DB_DIALECT || "mysql";
CONFIG.db_host = process.env.DB_HOST || "localhost";
CONFIG.db_port = process.env.DB_PORT || "3306";
CONFIG.db_name = process.env.DB_NAME || "name";
CONFIG.db_user = process.env.DB_USER || "root";
CONFIG.db_password = process.env.DB_PASSWORD || "db-password";

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "jwt_please_change";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || "10000";

CONFIG.minio_endPoint = process.env.MINIO_ENDPOINT || "play.minio.io";
CONFIG.minio_port = process.env.MINIO_PORT || "9000";
CONFIG.minio_useSSL = process.env.MINIO_USESSL || "true";
CONFIG.minio_accessKey = process.env.MINIO_ACCESSKEY || "Q3AM3UQ867SPQQA43P2F";
CONFIG.minio_secretKey =
  process.env.MINIO_SECRETKEY || "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG";

module.exports = CONFIG;
