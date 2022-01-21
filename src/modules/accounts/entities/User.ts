import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    private id: string;

    @Column()
    private name: string;

    @Column()
    private username: string;

    @Column()
    private password: string;

    @Column()
    private email: string;

    @Column()
    private driver_license: string;

    @Column()
    private isAdmin: boolean;

    @CreateDateColumn()
    private created_at: Date;

    constructor(){
        this.id = uuid();
    };
};

export { User };