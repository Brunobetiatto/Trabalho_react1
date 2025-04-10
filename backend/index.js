import express from "express";
import cors from "cors";
import userRouters from "./Routes/users.js";

const index = express();

index.use(express.json());
index.use(
  cors({
    origin: "http://localhost:3000", // Permite o frontend acessar o backend
  })
);

index.use("/", userRouters);

index.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
