import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import { Band, BandInput } from "../model/Band";

class BandController {

    public async createBand(
       req: Request,
       res: Response
    ): Promise<void> {
   
       try {
          let message = "Success!"
   
          const token: string = req.headers.authorization as string
    
          const { name, musicGenre, responsible } = req.body
    
          
          const input: BandInput = {
           name,
           musicGenre,
           responsible
       }
   
       const result = await BandBusiness.createBand(input, token);
   
    
          res.status(201).send({ message, result})
    
       } catch (error) {
          let message = error.sqlMessage || error.message
          res.statusCode = 400
    
          res.send({ message })
       
    }}
 
    public async getBandById(
       req: Request,
       res: Response
    ): Promise<void> {
    
        try {
           let message = "Success!"
    
           const token: string = req.headers.authorization as string
    
           const id: string  = req.params.id
    
           const result: Band = await BandBusiness.getPostById(id, token);
     
           res.status(200).send({ message, result })
     
        } catch (error) {
           let message = error.sqlMessage || error.message
           res.statusCode = 400
     
           res.send({ message })
        }
     }
 }
 
 export default new BandController()