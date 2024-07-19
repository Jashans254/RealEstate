import express from "express";
//Import the test function from the user.controller.js file:
import{test} from "../controllers/user.controller.js";

const router= express.Router();

router.get("/test",test);

export default router;