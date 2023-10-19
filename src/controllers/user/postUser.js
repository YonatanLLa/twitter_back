import { createAccessToken } from "../../libs/jwt.js";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";

export const postUser = async (req, res) => {
  const { username, email, password, bio, profilePicture } = req.body;

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      throw new Error("Email exitente");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      bio,
      profilePicture,
    });
    
    const userCreated = await newUser.save()
    const token = await createAccessToken({id: userCreated._id})

    res.cookie('token', token)

    res.status(200).json({dato: newUser.username + " resgistrado exitosamente"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
