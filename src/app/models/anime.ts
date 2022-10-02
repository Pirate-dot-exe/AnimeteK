export class Anime {
    private _id: any;
    private _titulo: string;
    private _generos: string[]; 
    private _imageLink: any; //Link para imagem
    private _nota: number;
    private _data: string;
    private _totalEp: number;
    private _assistidosEp: number;

    constructor(
        titulo: string,
        generos: string[],
        imageLink: string,
        nota: number,
        data: string,
        totalEp: number,
        assistidosEp: number,

    ){
        this._titulo = titulo;
        this._generos = generos;
        this._imageLink = imageLink;
        this._nota = nota;
        this._data= data;
        this._totalEp = totalEp;
        this._assistidosEp = assistidosEp;
    }

    public get id(): any{
        return this._id;
    }
    public get titulo(): string{
        return this._titulo;
    }
    public set titulo(titulo: string){
        this._titulo = titulo;
    }
    public get generos(): string[]{
        return this._generos;
    }
    public set generos(generos: string[]){
        this._generos = generos;
    }
    public get imageLink(): string{
        return this._imageLink;
    }
    public set imageLink(imageLink: string){
        this._imageLink = imageLink;
    }
    public get nota(): number{
        return this._nota;
    }
    public set nota(nota: number){
        this._nota = nota;
    }
    public get data(): string{
        return this._data;
    }
    public set data(data: string){
        this._data = data;
    }
    public get totalEp(): number{
        return this._totalEp;
    }
    public set totalEp(totalEp: number){
        this._totalEp = totalEp;
    }
    public get assistidosEp(): number{
        return this._assistidosEp;
    }
    public set assistidosEp(assistidosEp: number){
        this._assistidosEp = assistidosEp;
    }
}
