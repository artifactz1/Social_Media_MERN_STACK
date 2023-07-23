import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,

    /*  make the likes as a map 
                - that's how mongoDB saves it 
                - all we need to check if the user ID exists in this map 
                - and the value is going to be true always if it exists 

            if you like it your going to add to this map 
            if you don't like it your going to remove that map 

            reason he didn't use array where you could store it as an array of strings is: 
            - because using a map is much more efficient
        */

    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
