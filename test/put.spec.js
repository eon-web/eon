const supertest = require('supertest');
const eon = require("../index");

describe('Protocol: PUT', () => {
    it("should send no response", (done) => {
        const app = eon(80)
            .post("/")
            .hook((req, res) => (res.status(200).end()));
        supertest(app)
            .post("/")
            .expect(res => res.body === '')
            .expect(200, done)
    });
});