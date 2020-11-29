import { Band, BandInput } from "../model/Band"
import tokenGenerator, { TokenGenerator } from "../services/Authenticator"
import { AuthenticationData } from "../services/Authenticator"
import  idGenerator, { IdGenerator }  from "../services/IdGenerator"
import bandDatabase, {BandDatabase} from '../data/BandDatabase'
import { CustomError } from "../error/BaseError"

export class BandBusiness {

    constructor(
        private tokenGenerator: TokenGenerator,
        private idGenerator: IdGenerator,
        private bandDatabase: BandDatabase
    )
{}
    public createBand = async (input: BandInput, token: string): Promise<Band> => {
    
        const { name, musicGenre, responsible } = input
        try{
            
            if (!name || !musicGenre || !responsible) {
                throw new CustomError(422, "Missing input");
             }

            const tokenData: AuthenticationData = this.tokenGenerator.verify(token)
    
            const role = tokenData.role
            
            if(role !== "ADMIN" ) {
                throw new Error("'role' 'NORMAL' cannot create bands");
            }
            const id: string = this.idGenerator.generate()
    
            const data: Band = new Band (id, name, musicGenre, responsible)
       
            await this.bandDatabase.createBand(data)
    
            const createdBand: Band = (await this.bandDatabase.selectBand(id, name));

            return createdBand
    
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getPostById = async (id: string, token: string): Promise<Band> => {

        try {
    
            let message = "Success!"
    
            const tokenData: AuthenticationData = this.tokenGenerator.verify(token)
            const name: string = ""
            const band: Band = (await (this.bandDatabase.selectBand(id, name)));
     
            if(!band) {
             throw new Error("'id' not registered");
             }
    
             return band
    
        }catch (error) {
            throw new Error(error.message);
        }
    }
}


export default new BandBusiness(
    tokenGenerator,
    idGenerator,
    bandDatabase
)