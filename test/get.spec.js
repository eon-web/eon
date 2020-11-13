const supertest = require('supertest');
const eon = require("../index");

describe('Protocol: GET', () => {
    it("should work with a GET JSON request", () => {
        const app = eon(80)
            .get("/")
            .json((req, res) => ({ foo: true }));
        supertest(app)
            .get("/")
            .accept("application/json")
            .end((err) => {
                if (err) throw err;
            });
    });

    it("should work with a GET text request", () => {
        const app = eon(80)
            .get('/')
            .text(() => 'Foo Bar Baz');
        supertest(app)
            .get('/')
            .accept("text/plain")
            .end(err => {
                if (err) throw err;
            })
    });
});