import express from "express";
import  {protectedRoute}  from "../middleware/auth.middleware.js"; 
import { getStreamToken } from "../controllers/chat.controller.js";
const router=express.Router();
 router.get("/token",protectedRoute,getStreamToken)// protectedRoute is used so that only authenticated user can hit this end point

export default router;