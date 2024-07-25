import express from 'express';
import { createlisting , deletelisting} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", createlisting);
router.delete("/delete/:id", verifyToken, deletelisting);

export default router;