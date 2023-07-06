const Pool = require("pg").Pool;
const ENV = require("../config");

const database = new Pool({ 
  user: ENV.USER,
  host: ENV.HOST,
  port: ENV.PORT,
  database: ENV.DATABASE,
  password: ENV.PASSWORD
});


module.exports = {
  async query(text, params) {
    return await database.query(text, params);
  },
  async queryTransaction(query_list) {
  
    const client = await database.connect();
    try {
      await client.query("BEGIN");
      let response = [];
      for (const query of query_list) {
          const { rows } = await client.query(query.queryText, query.params);
          response = response.concat(rows);
        }
        await client.query("COMMIT");
        return response;
      } catch (e) {
          await client.query("ROLLBACK");
      throw e;
    } finally {
        client.release();
      }
    },
  };
  
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(ENV.DATABASE, ENV.USER, ENV.PASSWORD, {
//   host: ENV.HOST,
//   dialect: ENV.USER
// })

// const testDbConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
// };

// module.exports = testDbConnection

