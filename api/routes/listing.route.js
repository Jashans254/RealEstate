import express from 'express';
import { createlisting , deletelisting, updatelisting} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", createlisting);
router.delete("/delete/:id", verifyToken, deletelisting);
router.post("/update/:id", verifyToken, updatelisting);

export default router;