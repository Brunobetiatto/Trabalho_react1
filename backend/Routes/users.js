import express from "express";
import path from "path";
import { getUsers, deleteUser, updateUser, addUser, searchUsers, getUserById } from "../Controllers/users.js";

const router = express.Router();


// Rotas
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById); 
router.put("/:id", updateUser);
router.post("/add", addUser);
router.get("/search", searchUsers);

export default router;