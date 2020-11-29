import { BandBusiness } from "../src/business/BandBusiness"
import { BandInput } from "../src/model/Band"
import { AuthenticationData } from "../src/services/Authenticator"

describe("Create Band", () => {
    const idGenerator = { generate: jest.fn() } as any
    const tokenGenerator = { generate: jest.fn() } as any
    const bandDatabase = { createUser: jest.fn() } as any
 
    const bandBusiness: BandBusiness = new BandBusiness(
       idGenerator,
       tokenGenerator,
       bandDatabase
    )
 
    test("Error when 'name' is empty", async () => {
       expect.assertions(2)
 
         const band: BandInput = {
             name: "",
             musicGenre: "Rock",
             responsible: "Gustavo Bertoni"
         }

         const token: string = "hinaa"

       try {
          await bandBusiness.createBand(
            band,
            token
          )
       } catch (error) {
          expect(error.statusCode).toBe(422)
          expect(error.message).toBe("Missing input")
       }
    })

    test("Error when 'musicGenre' is empty", async () => {
        expect.assertions(2)
  
          const band: BandInput = {
              name: "Scalene",
              musicGenre: "",
              responsible: "Gustavo Bertoni"
          }
 
          const token: string = "hina"
 
        try {
           await bandBusiness.createBand(
             band,
             token
           )
        } catch (error) {
           expect(error.statusCode).toBe(422)
           expect(error.message).toBe("Missing input")
        }
     })

     test("Error when 'responsible' is empty", async () => {
        expect.assertions(2)
  
          const band: BandInput = {
              name: "Scaelene",
              musicGenre: "Rock",
              responsible: ""
          }
 
          const token: string = "hina"
 
        try {
           await bandBusiness.createBand(
             band,
             token
           )
        } catch (error) {
           expect(error.statusCode).toBe(422)
           expect(error.message).toBe("Missing input")
        }
     })
})