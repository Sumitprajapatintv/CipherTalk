import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";

import { getAllUserForSideBar } from "../controller/user.controller.js";

const router = express.Router();

router.get("/list", protectRoutes, getAllUserForSideBar);

export default router;
