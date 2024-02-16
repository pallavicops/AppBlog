import express  from "express";
import { getAllUasrs, login, signup } from '../controllers/user-controller';

const router = express.Router();

router.get("/",getAllUasrs);
router.post("/signup",signup);
router.post("/login",login);

export default router;