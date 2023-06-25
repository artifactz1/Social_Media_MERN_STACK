import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan"
import {register} from "./controllers/auth.js"

// Properly set the paths when we configure directories later on(path/fileURLToPath) 
import path from "path";

// route folder where we have the paths and routes for every type of feature 
// in this case auth.js feature
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";

import {fileURLToPath} from "url";
import { verify } from "crypto";
import { verifyToken } from "./middleware/auth.js";


/* 
    ==========================================================================
    CONFIGURATIONS 
    ========================================================================== 
*/

/* includes all the middleware configurations aswell as package configurations
 basically that runs in between different request, basically functions that run into different things */

/* grab the file url

specifically when you use the moddules we made in index.js
only when you use these types of modules

*/ 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// allow us to us dotenv files 
dotenv.config();

// invoke express application 
const app = express();

// All these settings are online / website and you can see what these configurations can do 
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// invoke cross-origin resource policy
app.use(cors());

// sets the directory of where we keep our assets, 
// in this case it will be the images that we store 
// - going to be storing this locally
// - but for real life production you would want to store it in an actual storage file directory 
//   or cloud storage like s3
//   gonna keep it simple

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* 
    ==========================================================================
    FILE STORAGE 
    ==========================================================================
*/

// All of this is on the github repo and copied from multer
// this is how you can save your files
// anytime someone uploads a file on to the website its going to be saved into
// destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// help us save the image
// anytime we need to upload a file 
// use the UPLOAD variable
const upload = multer({storage});

/* 
    ==========================================================================
    ROUTES WITH FILES 
    ========================================================================== 
*/

/*
    =========================================================================
        route : /auth/register 
            - that is the route we are going to hit 
	========================================================================
        middleware : upload.single("picture")
            - going to upload our picture locally into the public/assests folder
            - inbetween route and register 
	=========================================================================
        register 
            - the function is called a CONTROLLER 
            - the logic that we'll make of saving our user into the data base and 
            all the functionallity to register
            - we are going to have to 
                - import [ register ] from "./controllers/auth.js"
	=========================================================================
        In 'Server' directory
        - mkdir 
            - controllers
                - touch auth.js
        - we do this because this is how you typically organize code 
            - use subfolders
	=========================================================================
*/

app.post("/auth/register", upload.single("picture"), register)

/*
    Note : 
        upload.single("picture")
        - when we send from the front end the "picture" image 
            - "picture"
                - will grab the picture property
                - this is the property that we are setting 
                - so if you set picture and that's where the image is actually located 
                  in the http call, then that line will grab it and upload it into the local 
*/

app.post("/posts", verifyToken, upload.single("picture"),)


/*
    ==========================================================================
    ROUTES 
    ==========================================================================
*/

// This will set up routes and keep our files organized 
app.use("/auth", authRoutes);

app.use("/users", userRoutes);
app.use("/post", postRoutes);

/* 
    ==========================================================================
    MONGOOSE SETUP 
    ==========================================================================
*/

// 6001 is just in case it doesn't connect to original port (3001)
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));