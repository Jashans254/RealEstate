import express from "express";
//Import the test function from the user.controller.js file:
import{test, updateUser, deleteUser} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router= express.Router();

router.get("/test",test);
router.post("/update/:id",verifyToken, updateUser);
router.delete("/delete/:id",verifyToken, deleteUser);

export default router;