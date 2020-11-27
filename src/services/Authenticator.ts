import * as jwt from "jsonwebtoken"

class Authenticator {
   public generateToken(
      payload: AuthenticationData
   ): string {
      return jwt.sign(
         payload,
         process.env.JWT_KEY as string,
         {
            expiresIn: "24min"
         }
      )
   }

   public getTokenData(
      token: string
   ): AuthenticationData {
      const result = jwt.verify(
         token,
         process.env.JWT_KEY as string
      ) as AuthenticationData

      return {
         id: result.id,
      }
   }
}

export interface AuthenticationData {
  id: string;
  role?: string;
}

export default new Authenticator()