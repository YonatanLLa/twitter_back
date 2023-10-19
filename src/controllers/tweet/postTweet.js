import Tweet from "../../models/tweets.js";
import User from "../../models/user.js";
import { jwtUser } from "../../libs/jwtUser.js";

export const postTweet = async (req, res) => {
  const { content } = req.body;

  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("token now defined");
    }
    const userId = jwtUser(token);

    const newTweet = new Tweet({
      content,
      author: userId,
    });

    const createdTweet = await newTweet.save();

    const userAuthor = await User.findById(createdTweet.author);
    
    createdTweet.author = userAuthor;

    res.status(200).json(createdTweet);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
