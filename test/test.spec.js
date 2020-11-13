const supertest = require("supertest");
const eon = require("../index");

describe("app", () => {
    it("should be typeof function", () => {
        expect(typeof eon()).toBe("function");
    });
    it("should set the port", () => {
        const app = eon(8080);
        expect(app.port).toBe(8080);
    });
    it("should work with a GET JSON request", () => {
        const app = eon(80)
            .get("/")
            .json((req, res) => { foo: true });
        supertest(app)
            .get("/")
            .accept("application/json")
            .end((err) => {
                if (err) throw err;
            });
    });
    it("should work with a GET text request", () => {

    });
});