import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    /*
            getting the request header from the front-end 
            we are grabbing the authorization header 
            - that's where the token will be set on the front-end
        */
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    /*
            We are checking if the token starts with the String "Bearer"
            - this is set on the front-end 

            The line after is going to take anything after the "Bearer" string
        */
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, tokens.length).trimLeft();
    }

    const verified = jwt.verify(token, prcoess.env.JWT_SECRET);
    req.user = verified;

    /*
            For middle wear the next function is what we have to use
            - this function is up top on the function 
        */
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
