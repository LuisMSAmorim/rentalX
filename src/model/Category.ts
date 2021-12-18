import { v4 as uuid } from "uuid";

class Category{
    private id?: string;
    private name: string;
    private description: string;
    private createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        };
    };
};

export { Category };