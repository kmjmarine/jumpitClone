require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const route = require("./api/routes");
const dataSource = require("./api/models/dataSource");
const { globalErrorHandler } = require("./api/utils/error");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(route);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => {
      console.error("Error during Data Source initialization", error);
    });

  console.log(`Listening to request on port: ${PORT}`);
});
