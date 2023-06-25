import User from "../models/User";

/* READ */
export const getUser = async (req, res) => {
    try {
        // going to grab the id from request paramaters 
        const{ id } = req.params;
        // use that id to grab the information of the user we need 
        const user = await User.findById(id);
        // need  the send back to the front 
        // end everything relevant to this user after we found it
        res.status(200).json(user);

    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};

// grabs all of the user's friends with user's ID
export const getUserFriends = async(req, res) =>{

    try{
        const{ id } = req.params;
        const user = await User.findById(id);

        /*
            we use promise because we are going to make multiple api calls to the DB
        */
        const friends = await Promise.all(
            // grabbing each ID that the user has
            user.friends.map((id) => User.findById)
        );

        // going to format this properly for the front end 
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) =>
            {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // we are checking if the friendID is included in the main user's friend id 
        // if so we want to make sure they are removed ↓ 
        if (user.friends.includes(friendId)){

            // filter((id)) we are passing id into function 
            // then we check that if id doesn't equal to friendID
            // filter function is a java script function 
            // - where we can copy user.friends array any time id !== friendID
            // - basically removing when id is === to friend id 
            user.friends = user.friends.filter((id) => id !== friendId);

            // this friend has to remove the user from their friends list 
            friend.friends = user.friends.filter((id) => id !== id);
        }
        // if they aren't included in the friends list we are going to add them to the friend list 
        // pretty much like facebook functionality
        else
        {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // to make sure the list is saved and updated
        await user.save();
        await friend.save();

        // going to format this properly for the front end 
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) =>
            {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}