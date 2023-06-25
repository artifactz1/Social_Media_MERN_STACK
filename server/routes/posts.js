import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */ 

/*
    grab the user feed when we are on the homepage 
    - the homepage is going to get everypost in the data base
      and give you every single one 
    - most companies use AI now to pick specific posts
    - this is just sending all the feeds
    - we are keeing it simple 
*/
router.get("/", verifyToken, getFeedPosts);

// this is only grab all of the user's post that he/she posted
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */

// will update the like on the post 
router.patch("/:id/like", verifyToken, likePost);

export default router; 
