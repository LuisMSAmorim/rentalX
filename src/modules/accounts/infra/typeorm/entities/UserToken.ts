import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity("users_tokens")
class UserToken {

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    expiration_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        this.id = uuid();
    };
};

export { UserToken };