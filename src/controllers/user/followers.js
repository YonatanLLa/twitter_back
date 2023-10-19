import mongoose from "mongoose"
import { jwtUser } from "../../libs/jwtUser.js"
import User from "../../models/user.js"

export const followers = async (req, res) => {
    const { id } = req.params

    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }
        const userId = jwtUser(token); // Asegúrate de que jwtUser funcione correctamente
        const userFollower = await User.findById(id);

        if (!userFollower) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // console.log(userFollower);
        const followerData = userFollower.followers.some(followerId => {
          const externalObjectId = new mongoose.Types.ObjectId(userId)
          return followerId.equals(externalObjectId)
        } )

        console.log(followerData);

        if (followerData === true) {
          userFollower.followers = userFollower.followers.filter(followerId => {
            const externalObjectId = new mongoose.Types.ObjectId(userId)
            return !followerId.equals(externalObjectId)
          })

           await userFollower.save()
          res.status(200).json({dato: "eliminado"})
        } else {
          
          userFollower.followers.push(userId);
          const followering = await userFollower.save();
          res.status(201).json(followering);
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}
    


export const followering = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = jwtUser(token); // Decodifica el token para obtener el ID del usuario autenticado

    // Buscar el usuario autenticado en la base de datos
    const user = await User.findById(userId);

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener la lista de usuarios que el usuario autenticado está siguiendo
    const followingUserIds = user.following;

    // Consulta la base de datos para obtener los detalles de los usuarios a los que sigue
    console.log(followingUserIds);
    const followingUsers = await User.find({ _id: { $in: followingUserIds } });
    console.log(followingUsers);
    // Respondemos con los detalles de los usuarios a los que sigue el usuario autenticado
    res.status(200).json(followingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};