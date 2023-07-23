// // have to create this file
// import Post from "../models/Posts.js";
// import User from "../models/User.js";

// /* Create */
// // this is going to handle the fucntion that we created in the index.js file
// // this will actually have an image getting passed through through the middle ware
// export const createPost = async (req, res) => {
//   try {
//     const { userId, description, picturePath } = req.body;
//     const user = await User.findById(userId);
//     const newPost = new Post({
//       userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       location: user.location,
//       description,
//       userPicturePath: user.picturePath,
//       picturePath,
//       likes: {
//         // "someid: true"
//       },
//       comments: [],
//     });

//     // save newPost into mongoDB
//     await newPost.save();

//     // grabbing all of the post
//     // we need all the post to be returned to the front end
//     // so the front end has a list of the updated post
//     const post = await Post.find();

//     // 201 something has been created
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(409).json({ message: err.message });
//   }
// };

// /* READ */
// export const getFeedPosts = async (req, res) => {
//   try {
//     // grabbing the news feed
//     // grabbing all of the post
//     // we need all the post to be returned to the front end
//     // so the front end has a list of the updated post
//     const post = await Post.find();
//     // 200 is successful request
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserPosts = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     //grabbing the news feed
//     const post = await Post.find({ userId });
//     // 200 is successful request
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// /* UPDATE */
// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.param;
//     const { userId } = req.body;

//     //grabbing the post information
//     const post = await Post.findById(id);

//     // grabbing if the user has like it or not

//     // Checks if the userId Exists
//     // its a boolean so it would be true
//     const isLiked = post.likes.get(userId);

//     // if it is like we are going to delte the user

//     // object that includes the list or keys thats going to have all the IDs
//     // and if that exits then we are going to delete the ID
//     if (isLiked) {
//       post.likes.delete(userId);
//     }

//     // else we are going to set it

//     // if it doesn't exits make it true
//     else {
//       post.likes.set(userId, true);
//     }

//     // depending on our post.likes
//     // we are going to update our post by finding
//     // the post first and passing in the new likes

//     // passing in id / post.likes
//     // this is how we are going to update a specific post
//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       {
//         likes: post.likes,
//       },
//       // a new object
//       { new: true }
//     );

//     // 200 is successful request
//     // pass in the updated post so we can update the front end
//     // Note: we always have to update the front end once you hit the like button
//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

import Post from "../models/Posts.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
