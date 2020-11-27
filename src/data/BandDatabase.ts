import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

class BandDatabase extends BaseDatabase{

    private tableName: string = "NOME_TABELA_BANDAS"
 
    public getTableName = (): string => this.tableName
 
    public async createBand(
       post: Band
    ) {

        try {
            await this.getConnection().insert({
                id: post.getId(),
                name: post.getName(),
                music_genre: post.getMusicGenre(),
                responsible: post.getResponsible()
             }).into(this.tableName)
          } catch (error) {
             throw new Error("Erro de banco de dados: " + error.sqlMessage);
          }
        }
        public async selectBand(
            id: string,
            authorId: string
         ): Promise<Band> {
            try {
               const result = await this.getConnection()(this.tableName)
                  .select("*")
                  .where({ id }).orWhere("name", name);
    
               return new Band(
                  result[0].id,
                  result[0].name,
                  result[0].music_genre,
                  result[0].responsible
               )
      
            } catch (error) {
               throw new Error(error.slqMessage || error.message)
            }
       }

}

export default new BandDatabase()