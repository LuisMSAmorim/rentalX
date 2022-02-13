import request from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {

    const server = request(app);

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license) 
            values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX') `
        );    
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new category", async () => {
        const loginData = {
            email: "admin@admin.com.br",
            password: "admin"
        };

        const loginToken = await server.post('/sessions').send(loginData);
        const { token } = loginToken.body.token;

        const category = {
            name: "CategorySuperTest",
            description: "A supertest test description"
        };

        const response = await server.post('/categories').send(category).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);
    });
});