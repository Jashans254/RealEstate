import express from "express";
//Import the test function from the user.controller.js file:
import{test, updateUser, deleteUser, getUserlisting, getUser} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router= express.Router();

router.get("/test",test);
router.post("/update/:id",verifyToken, updateUser);
router.delete("/delete/:id",verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserlisting);
router.get('/:id', verifyToken,getUser );

export default router;