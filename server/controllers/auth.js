
// Allows us to encrypt our password 
import brcrypt from "bcrypt";

// Give us a way to send a user a webtoken 
// that they can use for AUTHORIZATION 
import jwt from "jsonwebtoken"

// Need to create this model if you haven't 
/*
    - mkdir in server 
        - models 
            - User.js
*/
import User from "../models/User.js";

/* REGISTER USER */

/* Creating a regsiter function 
    - => {} 
        - is a call back function 
    - async 
        - because we are going to be calling mongoose db
    - req 
        - provide us with the request body we get from the front end
    - res
        - response is what we are going to be sending back to the front end

 */
export const register = async (req, res) => {

    try {
        const {
            firstName, 
            lastName, 
            email, 
            password, 
            picturePath, 
            friends, 
            location,
            occupation 
        } = req.body;

        /*  
            Generates a random salt by bcrypt 
                - basically encryption 
                - use the salt to encrypt password 
        */

        const salt = await brcrypt.genSalt();
        const passwordHash = await brcrypt.hash(password, salt);

        const Newuser = new User({
            firstName, 
            lastName, 
            email, 
            password : passwordHash, 
            picturePath, 
            friends, 
            location,
            occupatio,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })

        const savedUser = await newUser.save();
        // status code 201 : means something has been created 
        // then we create a json with savedUser which was created above
        // for the front-end to have 
        //  - this is important to have the data correct 
        res.status(201).json(savedUser);
    } 
    catch (err){
        // this what happens when something goes wrong
        // we'll send the frontend a status code of 500 
        // with an error message of whatever the mongoDB data base returns 
        res.status(500).json({error: err.message});

    }
} 