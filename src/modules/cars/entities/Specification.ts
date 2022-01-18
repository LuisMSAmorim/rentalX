import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("specifications")
class Specification{
    
    @PrimaryColumn()
    private id: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @CreateDateColumn()
    private createdAt: Date;

    constructor(){
        this.id = uuid();
        this.createdAt = new Date();
    };
};

export { Specification };