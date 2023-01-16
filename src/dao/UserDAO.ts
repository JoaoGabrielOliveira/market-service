export default class UserDAO {
    id: number | undefined;
    firstName : string | undefined;

    constructor(id?:number, firstName?:string){
        this.id = id ?? undefined;
        this.firstName = firstName ?? undefined;
    }
}