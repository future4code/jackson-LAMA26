import { UserInputDTO, LoginInputDTO } from "../model/User";
import userDatabase, { UserDatabase } from "../data/UserDatabase";
import  idGenerator, { IdGenerator }  from "../services/IdGenerator";
import hashManager, { HashManager } from "../services/HashManager";
import  tokenGenerator, {TokenGenerator}  from "../services/Authenticator";
import { CustomError } from "../error/BaseError";

export class UserBusiness {

    constructor (
       private idGenerator: IdGenerator,
       private hashManager: HashManager,
       private tokenGenerator: TokenGenerator,
       private userDatabase : UserDatabase
    ){}

    async createUser(user: UserInputDTO) {

        try{

        if (!user.name || !user.email || !user.password ) {
            throw new CustomError(422, "Missing input");
         }

         if (user.email.indexOf("@") === -1) {
            throw new CustomError(422, "Invalid email");
         }

         if (user.password.length < 6) {
            throw new CustomError(422, "Invalid password");
         }

        const id = this.idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await this.hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.tokenGenerator.generate({ id, role: user.role });

        return {accessToken};
        
    } catch (error) {
        if (error.message.includes("for key 'email'")) {
           throw new CustomError(409, "Email already in use")
        }

        throw new CustomError(error.statusCode, error.message)
     }

  }

    async getUserByEmail(user: LoginInputDTO) {

        try{

            if (!user.email || !user.password) {
                throw new CustomError(422, "Missing input");
            }

        const userDatabase = new UserDatabase();
        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new CustomError(401, "Invalid credentials");
         }

        const hashManager = new HashManager();
        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = this.tokenGenerator.generate({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new CustomError(401, "Invalid credentials");
        }

        return {accessToken};

    }  catch (error) {
        throw new CustomError(error.statusCode, error.message)
    }
    }
}

export default new UserBusiness(
    idGenerator,
    hashManager,
    tokenGenerator,
    userDatabase
)