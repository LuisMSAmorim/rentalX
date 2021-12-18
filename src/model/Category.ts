import { v4 as uuid } from "uuid";

class Category{
    private id?: string;
    public name: string;
    public description: string;
    private createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        };
    };
};

export { Category };