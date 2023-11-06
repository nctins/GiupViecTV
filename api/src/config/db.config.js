import dotenv from "dotenv";
dotenv.config();

const DBConfig = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    timezone:'+00:00',
    define: {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  },
  test: {
    username: process.env.TEST_DB_USER_NAME,
    password: process.env.TEST_DB_USER_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  },
  production: {
    username: process.env.PROD_DB_USER_NAME,
    password: process.env.PROD_DB_USER_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: "mysql",
    logging: false,
  },
};

export default DBConfig;
