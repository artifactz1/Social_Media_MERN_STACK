
import { createSlice } from "@reduxjs/toolkit";

/*
    This will be the state that will be stored in our global state
    
    This type of informatio, this data will be accessible throughout our
    entire application and we can grab it anywhere we want
    
    So we dont' have to pass in state and properties down different componenets  
*/
const initialState = {

    /* represents dark/light mode
        - we are gonna configure it globally 
    */
    mode: "light",


    /* 
        This is all the auth information we are going to store  
    */
    user: null,
    token: null,
    
    // Include all the post we need 
    posts: [], 
};


export const authSlice = createSlice({

    // represents the auth workflow
    name: "auth",

    // passing initial state into initialstate above 
    initialState,
    
    /* 
        this is our actions - can think of it as functions 
        - functions that involve modifying the global state 
    */

    reducers: {
        // function to change light/dark mode
        setMode: (state) => {

            // current state -> then you set it to the new state when you call this function
            state.mode = state.mode === "light" ? "dark" : "light";
            
        },
        // action is where you set the payload
        // mainly paras for the function 
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            // if user already exists 
            // then we'll set the friends inside our state
            if(state.user) {
                state.user.friends = action.payload.friends;
            }
            else {
                console.error("user friends non-existent :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state,action) => {
            // grab our list of post, map through each one 
            // if post._id = to current post id that we are sending into this funciton 
            // we'll return the post that we want 
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.post = updatedPosts;
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;