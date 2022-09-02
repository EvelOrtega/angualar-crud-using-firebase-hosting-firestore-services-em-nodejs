const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const funcionarioRoutes = require("./routes/funcionarioRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", funcionarioRoutes.routes);

app.listen(config.port, () => {
  console.log("Serviço Rodando em = %s", config.url);
});

exports.app = functions.https.onRequest(app);
