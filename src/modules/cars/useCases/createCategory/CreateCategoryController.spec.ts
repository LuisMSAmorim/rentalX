import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create Category Controller", () => {

    it("Should be able to list all categories", async () => {
        await request(app).get('/categories').expect(200);
    });
});