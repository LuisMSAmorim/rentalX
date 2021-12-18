import { v4 as uuid } from "uuid";

class Specifications{
    
    private id: string;
    public name: string;
    public description: string;
    private createdAt: Date;

    constructor(){
        this.id = uuid();
        this.createdAt = new Date();
    };
};

export { Specifications };