import bcrypt from "bcryptjs";
import { createAccessToken } from "../../libs/jwt.js";
import User from "../../models/user.js"
export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      throw new Error("Email now exist");
    }

    const comparePassword = await bcrypt.compare(password, existEmail.password);
    if (!comparePassword) {
      throw new Error("Password incorrect");
    }

    const token = await createAccessToken({ id: existEmail._id });
    console.log(token);
    res.cookie("token", token);

    res.status(200).json({
      id: existEmail._id,
      username: existEmail.username,
      email: existEmail.email,
      createdAt: existEmail.createdAt,
      updatedAt: existEmail.updatedAt,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
