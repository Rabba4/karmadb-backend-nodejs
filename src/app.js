import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";
import indexRoutes from "./routes/index.routes.js";

import { PORT } from "./config.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api", usuariosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "ruta no encontrada",
  });
});

export default app;
