import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, signInUser} from "../controllers/userController.js";
import validateUser from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/user/signup", validateUser, createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateUser, updateUser);
router.delete("/user/:id", deleteUser);
router.post("/user/signin", signInUser);

export default router;