import { UserBusiness } from "../src/business/UserBusiness"
import { LoginInputDTO, User, UserInputDTO, UserRole } from "../src/model/User"


describe("Signup", () => {
   const idGenerator = { generate: jest.fn() } as any
   const hashGenerator = { hash: jest.fn() } as any
   const tokenGenerator = { generate: jest.fn() } as any
   const userDatabase = { createUser: jest.fn() } as any

   const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashGenerator,
      tokenGenerator,
      userDatabase
   )

   test("Error when 'name' is empty", async () => {
      expect.assertions(2)

        const pessoa: UserInputDTO = {
            name: "",
            email: "mimi@gmail.com",
            password: "123456",
            role: "NORMAL"
        }
      try {
         await userBusiness.createUser(
           pessoa
         )
      } catch (error) {
         expect(error.statusCode).toBe(422)
         expect(error.message).toBe("Missing input")
      }
   })

    test("Error when 'email' is empty", async () => {
    expect.assertions(2)
    
      const pessoa: UserInputDTO = {
          name: "Mimi",
          email: "",
          password: "123456",
          role: "NORMAL"
      }
    try {
       await userBusiness.createUser(
         pessoa
       )
    } catch (error) {
       expect(error.statusCode).toBe(422)
       expect(error.message).toBe("Missing input")
    }
 })

    test("Error when 'password' is empty", async () => {
      expect.assertions(2)
      
        const pessoa: UserInputDTO = {
            name: "mimi",
            email: "mimi@gmail.com",
            password: "",
            role: "NORMAL"
        }
      try {
         await userBusiness.createUser(
           pessoa
         )
      } catch (error) {
         expect(error.statusCode).toBe(422)
         expect(error.message).toBe("Missing input")
      }
   })

    test("Error when 'email' is invalid", async () => {
    expect.assertions(2)
    
      const pessoa: UserInputDTO = {
          name: "mimi",
          email: "mimi.gmail.com",
          password: "123456",
          role: "NORMAL"
      }
    try {
       await userBusiness.createUser(
         pessoa
       )
    } catch (error) {
       expect(error.statusCode).toBe(422)
       expect(error.message).toBe("Invalid email")
    }
 })

    test("Error when 'password' is invalid", async () => {
    expect.assertions(2)
    
      const pessoa: UserInputDTO = {
          name: "mimi",
          email: "mimi@gmail.com",
          password: "145",
          role: "NORMAL"
      }
    try {
       await userBusiness.createUser(
         pessoa
       )
    } catch (error) {
       expect(error.statusCode).toBe(422)
       expect(error.message).toBe("Invalid password")
    }
 })

    test("When 'role' is empty", async () => {
    expect.assertions(1)
    
      const pessoa: UserInputDTO = {
          name: "mimi",
          email: "mimi@gmail.com",
          password: "123456",
          role: ""
      }
    try {
       const result = await userBusiness.createUser(
         pessoa
       )

    expect(result.accessToken).toBeDefined()
    } catch (error) {

    }
 })

    test("Success case", async () => {
    expect.assertions(1)
    
      const pessoa: UserInputDTO = {
          name: "mimi",
          email: "mimi@gmail.com",
          password: "123456",
          role: "NORMAL"
      }
    try {
       const result = await userBusiness.createUser(
         pessoa
       )
       expect(result.accessToken).toBeDefined()

    } catch (error) {

    }
 })
})

describe("Login", () => {
    const idGenerator = {} as any
    const hashGenerator = {
       compareHash: jest.fn(
          () => false
       )
    } as any
    const tokenGenerator = { generate: jest.fn() } as any
    const userDatabase = {
       getUserByEmail: jest.fn(
          () => undefined
       )
    } as any
 
    const userBusiness: UserBusiness = new UserBusiness(
       idGenerator,
       hashGenerator,
       tokenGenerator,
       userDatabase
    )
    test("Error when 'email' is empty", async () => {
       expect.assertions(2)
       try {
        const pessoa: LoginInputDTO = {
            email: "",
            password: "123456"
        }
          await userBusiness.getUserByEmail(
            pessoa 
          )
       } catch (error) {
          expect(error.message).toBe("Missing input")
          expect(error.statusCode).toBe(422)
       }
    })

    test("Error when 'password' is empty", async () => {
        expect.assertions(2)
        try {
         const pessoa: LoginInputDTO = {
             email: "mi@gmail.com",
             password: ""
         }
           await userBusiness.getUserByEmail(
             pessoa 
           )
        } catch (error) {
           expect(error.message).toBe("Missing input")
           expect(error.statusCode).toBe(422)
        }
     })

     test("Error when 'email' is invalid", async () => {
        expect.assertions(2)
        try {
         const pessoa: LoginInputDTO = {
             email: "mif@gmail.com",
             password: "123456"
         }
           await userBusiness.getUserByEmail(
             pessoa 
           )
        } catch (error) {
           expect(error.message).toBe("Invalid credentials")
           expect(error.statusCode).toBe(401)
        }
     })

     test("Error when 'password' is invalid", async () => {
        expect.assertions(2)
        try {
         const pessoa: LoginInputDTO = {
             email: "mi@gmail.com",
             password: "1234567"
         }
           await userBusiness.getUserByEmail(
             pessoa 
           )
        } catch (error) {
           expect(error.message).toBe("Invalid credentials")
           expect(error.statusCode).toBe(401)
        }
     })

     test("Success case", async()=>{

        const idGenerator = {} as any
        const hashGenerator = {
           compareHash: jest.fn(
              () => true
           )
        } as any
        const tokenGenerator = { generate: jest.fn() } as any
        const userDatabase = {
           getUserByEmail: jest.fn(
              () => new User(
                 "id",
                 "hinata",
                 "hinata@gmail.com",
                 "123456",
                 UserRole.NORMAL
              )
           )
        } as any
     
        const userBusiness: UserBusiness = new UserBusiness(
           idGenerator,
           hashGenerator,
           tokenGenerator,
           userDatabase
        )
        expect.assertions(1)

        const pessoa: LoginInputDTO = {
            email: "hinata@gmail.com",
            password: "123456"
        }
        try {
           const result = await userBusiness.getUserByEmail(
             pessoa
           )
           expect(result.accessToken).toBeDefined()
        } catch (error) {
           
        }
     })

})