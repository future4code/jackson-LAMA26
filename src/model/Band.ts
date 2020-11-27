export class Band {
    private id: string
    private name: string
    private musicGenre: string
    private responsible: string

 
    constructor(
       id: string,
       name: string,
       musicGenre: string,
       responsible: string
    ) {
       this.id = id
       this.name = name
       this.musicGenre = musicGenre
       this.responsible = responsible
    }
 
    public getId = (): string => this.id
    public getName = (): string => this.name
    public getMusicGenre = (): string => this.musicGenre
    public getResponsible = (): string => this.responsible
 
 }

 export interface BandInput {
    name: string,
    musicGenre: string,
    responsible: string
 }