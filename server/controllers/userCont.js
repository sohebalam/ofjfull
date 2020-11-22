import JWT from "jsonwebtoken";
import User from "../models/userModel.js";
// import { JWT_SECRET } from "../configuration/index.js";

const signToken = (user) => {
  return JWT.sign(
    {
      iss: "CodeWorkr",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    "ofuauth" //JWT_ SECRET
  );
};

const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
    });

    await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },
  signIn = async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  googleOAuth = async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  facebookOAuth = async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret = async (req, res, next) => {
    console.log("I managed to get here!");
    res.json({ secret: "resource" });
  };

export { secret, signIn, signUp, googleOAuth, facebookOAuth };
