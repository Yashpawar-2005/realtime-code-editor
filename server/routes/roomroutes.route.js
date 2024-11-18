import { Router } from "express";
import { aihelp, createroom, getrooms } from "../controllers/room.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router=Router();
router.post("/createroom",protectRoute,createroom)
router.get('/getrooms',protectRoute,getrooms)
router.post('/aihelp',aihelp)
export default router