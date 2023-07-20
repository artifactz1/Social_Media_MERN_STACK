// // Allows us to encrypt our password
// import brcrypt from "bcrypt";

// // Give us a way to send a user a webtoken
// // that they can use for AUTHORIZATION
// import jwt from "jsonwebtoken";

// // Need to create this model if you haven't
// /*
//     - mkdir in server
//         - models
//             - User.js
// */
// import User from "../models/User.js";

// /* REGISTER USER */

// /* Creating a regsiter function
//         - => {}
//             - is a call back function
//         - async
//             - because we are going to be calling mongoose db
//         - req
//             - provide us with the request body we get from the front end
//         - res
//             - response is what we are going to be sending back to the front end

//     */
// export const register = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       picturePath,
//       friends,
//       location,
//       occupation,
//     } = req.body;

//     /*
//             Generates a random salt by bcrypt
//                 - basically encryption
//                 - use the salt to encrypt password
//         */

//     const salt = await brcrypt.genSalt();
//     const passwordHash = await brcrypt.hash(password, salt);

//     const Newuser = new User({
//       firstName,
//       lastName,
//       email,
//       password: passwordHash,
//       picturePath,
//       friends,
//       location,
//       occupation,
//       viewedProfile: Math.floor(Math.random() * 10000),
//       impressions: Math.floor(Math.random() * 10000),
//     });

//     const savedUser = await newUser.save();
//     // status code 201 : means something has been created
//     // then we create a json with savedUser which was created above
//     // for the front-end to have
//     //  - this is important to have the data correct
//     res.status(201).json(savedUser);
//   } catch (err) {
//     // this what happens when something goes wrong
//     // we'll send the frontend a status code of 500
//     // with an error message of whatever the mongoDB data base returns
//     res.status(500).json({ error: err.message });
//   }
// };

// /* LOGGING IN */

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // We are using mongoose (findOne) to
//     // try to find the one with a specified email
//     const user = await User.findOne({ email: email });
//     if (!user) return res.status(400).json({ msg: "User does not exist. " });

//     /*  using bcrypt to compare the password that was sent from the user (front end)
//             to the user.password that has been saved inside the data base
//             - both are using the same salt compare to see if they have the same hash
//          */
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

//     // the 4 lines above are checking if the email and password are a match!

//     // have to go to .env file and add JWT_SECRET
//     // prcoess.env.JWT_SECRET is the secret string
//     // - this could be any type of string as long as it's guessable
//     // - make sure string is a secure one you can keep
//     // NOTE:
//     //  - If you working for a company, they'll be hiring a 3 party authentication
//     //    or company that is good with security which is way more recure than this
//     //  - THIS IS A BASIC WAY OF HOW AUTHENTICATION WORKS

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//     // delete the password so that it doesn't get sent back to the front end (saftey)
//     delete user.password;
//     res.status(200).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
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
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
