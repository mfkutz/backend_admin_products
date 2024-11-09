import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

//Connection to db
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.cyan("Conexion exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("hubo un error al conectar a la BD"));
  }
}

connectDB();

//Instancia de express
const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // console.log(origin);
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      // console.log("Denegar...");
      callback(new Error("CORS Error"));
    }
  },
};

server.use(cors(corsOptions));

//leer datos de formularios (middleware)
server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

//morgan
server.use(morgan("dev"));

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Route
server.use("/api/products", router);
server.use("/api", (req, res) => {
  res.json({ msg: "Something message here" });
});
server.use((req, res) => {
  res.json("URL NO Entontrada");
});

export default server;
