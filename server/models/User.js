// /*
//     We are going to be creating the User Object
//     All we are going to do is copy whatever was in the Data model diagram
// */

// import mongoose from "mongoose";

// /*
//     Each variable will have their own properties
//     - min / max is the how many characters
//     - unique : won't have duplicates
//     - timestamps will allow us when user was created

//     Note:
//         create the UserSchema and then
//         const User = mongoose.model("User", UserSchema)
//         export default User;
// */
// const UserSchema = new mongoose.Schema(
//     {
//         firstName: {
//             type: String,
//             required: true,
//             min: 2,
//             max: 50,
//         },
//         lastName: {
//             type: String,
//             required: true,
//             min: 2,
//             max: 50,
//         },
//         email: {
//             type: String,
//             required: true,
//             min: 2,
//             max: 50,
//             unique: true,
//         },
//         password: {
//             type: String,
//             required: true,
//             min: 5,
//         },
//         picturePath: {
//             type: String,
//             default:"",
//         },
//         friends: {
//             type: Array,
//             default:[]
//         },
//         location: String,
//         occupation: String,
//         viewedProfile: Number,
//         impressions: Number,
//     },
//     {
//         timestamps: true
//     }
// )

// const User = mongoose.model("User", UserSchema);
// export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
