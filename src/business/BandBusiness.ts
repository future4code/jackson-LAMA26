import { Band, BandInput } from "../model/Band"
import authenticator from "../services/Authenticator"
import { AuthenticationData } from "../services/Authenticator"
import  idGenerator  from "../services/IdGenerator"
import bandDatabase from '../data/BandDatabase'

class BandBusiness {

    public createBand = async (input: BandInput, token: string): Promise<Band> => {
    
        const { name, musicGenre, responsible } = input
        try{
            
            const tokenData: AuthenticationData = authenticator.getTokenData(token)
    
            const role = tokenData.role
            
            if(role === "NORMAL") {
                throw new Error("'role' 'NORMAL' cannot create bands");
            }
            const id: string = idGenerator.generateId()

            const ref: Band = (await bandDatabase.selectBand(id, name));

            if(ref.getName() === name) {
                throw new Error("bands cannot repeat the name");
            }
    
            const data: Band = new Band (id, name, musicGenre, responsible)
       
            await bandDatabase.createBand(data)
    
            const createdBand: Band = (await bandDatabase.selectBand(id, name));
     
            return createdBand
    
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public getPostById = async (id: string, token: string): Promise<PostClass> => {

        try {
    
            let message = "Success!"
    
            const tokenData: AuthenticationData = authenticator.getTokenData(token)
    
            const band: Band = (await (bandDatabase.selectBand(id, name)));
     
            if(!band) {
             throw new Error("'id' not registered");
             }
    
             return band
    
        }catch (error) {
            throw new Error(error.message);
        }
    }
}


export default new BandBusiness()