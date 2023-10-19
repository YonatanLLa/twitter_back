import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const jwtUser = (token) =>{
    if (!token) {
       throw new Error({ message: 'Token no proporcionado' });
      }
      let id;
    try {
        const tokenParts = token.split('Bearer').pop().trim();
     //    console.log(tokenParts);
        const tokenized = jwt.verify(tokenParts, TOKEN_SECRET);
     
         id = tokenized.id;
        return id
 
     } catch (error) {
          console.log("error", error.message)
          return res.status(400).json({error: error.message})
      }
}