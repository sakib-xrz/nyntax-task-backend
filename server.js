const app = require("./app");
const connectDB = require("./utils/db");
require("dotenv").config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`🎯 Server listening on port: ${port}`);
  });
};

startServer();
