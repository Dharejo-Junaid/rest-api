const express = require("express");
const app = express();
const { connectMongo } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const PORT = 5000;

// middlewares;
app.use("/api/users", [
  express.json(),
  express.urlencoded({ extended: false }),
  logReqRes("./log.txt"),
]);

// routers;
app.use("/api/users", userRouter);

// connect with DB & start server;
connectMongo("mongodb://localhost:27017/nodejs")
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server is listening at PORT = ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("DB connection fail");
  });
