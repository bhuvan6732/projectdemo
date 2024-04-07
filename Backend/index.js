const { Sequelize } = require("sequelize");

const db = require("./models/index").sequelize;

const dotenv = require("dotenv");

const app = require("./server");

dotenv.config();

// const db = new Sequelize(
//   process.env.MYSQL_DATABASE_NAME,
//   process.env.MYSQL_USERNAME,
//   process.env.MYSQL_PASSWORD,
//   {
//     dialect: "mysql",
//     host: "localhost",
//   }
// );

const PORT = process.env.PORT || 3000;

async function main() {
  // try {
  //   await db.authenticate();
  //   console.log(
  //     "\n************************\nCONNECTED TO DATABASE\n************************\n"
  //   );
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT} \n************************\n`);
  });
  // } catch (error) {
  //   console.log(
  //     "\n************************\nERROR CONNECTING TO DATABASE \n************************\n",
  //     error
  //   );
  // }
}

main().catch(console.error());
