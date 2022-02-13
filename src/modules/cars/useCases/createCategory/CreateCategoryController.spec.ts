import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create Category Controller", () => {

    it("Should be able to create a new category", async () => {
        const category = {
            name: "CategorySuperTest",
            description: "A supertest test description"
        };

        const response = await request(app).post('/categories').send(category);

        expect(response.status).toBe(201);
    });
});