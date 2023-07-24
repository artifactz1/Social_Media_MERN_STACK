import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

// Creating component and passing in what we passed in prior
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) =>
  // This is where we return and write our logic
  {
    // this determines if we open the comments list or not
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    /*
        This is how the object is going to look like
        You can see in server/models/Post.js
        likes = {
            "userId1" : true,
            "userId2" : true,
            "userId3" : true,
            ...
        }

        This is better because its not keeping track of the count of likes
        but who actually liked it
    */
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // API CALL
    const patchLike = async () => {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      // Will get the post from the backend
      const updatedPost = await response.json();
      // Now we can just update the post
      dispatch(setPost({ post: updatedPost }));

      // if we go to client/src/state/index.js
      // - we are gonna go through the list of the post to find the post that we just updated
      //   and if so we are just going to replace it, otherwise we just return the original post if didn't find it
    };

    return (
      <WidgetWrapper m="2rem 0">
        {/* This is the friend user post who posted it */}
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        {/* Description */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {/* Picture */}
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}

        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            {/* Like Button */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            {/* Comments Button to write*/}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          {/* Share Button */}
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>

        {/* To check all of the comments */}
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };

export default PostWidget;
