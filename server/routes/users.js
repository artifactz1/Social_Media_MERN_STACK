import express from "express"

/* 
    controllers which we haven't created yet
    - these are just like any other Object oriented programming 
      concepts
*/
import {
    getUser,
    getUserFriends, 
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/*
    Creating the read routes 
    - represents routes where we grab information 
    - not actually saving anything to the database
        - not updating or changing anything from the data base
    - CRUD
        - create 
        - read 
        - update 
        - delete 
    - not really going to follow CRUD one to one 
        - we want to keep the functionality limited 
        - so we can have a limited application 
    - mainly only gonna go through the main routes
*/

/* READ */

// This is how we do querey string from the front end 
// the :id command will call the data base to find the id 
router.get("/:id", verifyToken, getUser);

// Will get the user and grabs it friends 
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */

/* patch is the update command 
    need the current user who is logged in and 
    the friendId of who we want to add or remove 
*/

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;