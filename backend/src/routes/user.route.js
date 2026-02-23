import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequests,
} from "../controllers/user.controller.js";
const router = express.Router();
//apply auth middleware to all routes
router.use(protectedRoute);
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id", acceptFriendRequest); // put is used because we are updating here
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-request", getOutgoingFriendRequests);

export function userRoutes(req, res) {}
