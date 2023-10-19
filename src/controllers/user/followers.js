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

        userFollower.followers.push(userId);
        const followering = await userFollower.save();
        res.status(201).json(followering);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}
    

export const followering = () =>{
    
}