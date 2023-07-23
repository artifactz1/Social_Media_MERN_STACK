import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  // Grabbing the stored list of Post
  const posts = useSelector((state) => state.posts);
  // Grabbing the token
  const token = useSelector((state) => state.token);

  // ====================================================================
  /*
     Going to make 2 API calls
     - the reason being is because of the isProfile Tag on  line 6

     The post widget is going to do two things 
     - Home Page : going to grab all the post from anybody / friends through 
        -  server/routes/posts.js - line : router.get("/", verifyToken, getFeedPosts);
     - However for Profile Page : we are going to only get user Posts
        -  server/routes/posts.js - line : router.get("/:userId/posts", verifyToken, getUserPosts);
  */

  const getPosts = async () => {
    // Making API CALL where this will grab all the posts
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // Making API CALL where this will grab all the user's post
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    // If the profile is correct, we'll make the getUserPosts() api call
    // Otherwise you do the getPosts
    // Overall it will return an array
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ====================================================================

  return (
    <>
      {/* The post that we get, we are going to create a component for each post   */}
      {posts.map(
        // Inside of here we are going to destructor number of items from each post
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
