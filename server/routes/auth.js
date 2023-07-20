import express from "express";
import { login } from "../controllers/auth.js";

/*
    - Allow express to identify that these routes will all be configured 
    - Also us to have it in seperate files to keep us organized 
*/
const routes = express.Router();

// Instead of doing app.use we are doing router.post instead
routes.post("/login", login);

export default routes;
