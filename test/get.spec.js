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

    it("should parse GET query parameters", () => {
        const app = eon(80)
            .get("/")
            .text(req => req.query.foo);
        supertest(app)
            .get("/")
            .expect(res => res.body === 'bar')
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

    it("should catch errors", () => {
        const app = eon(80)
            .errorHandler(() => {})
            .get('/')
            .text(() => { throw new Error('oopsie!') });
        supertest(app)
            .get('/')
            .expect(500)
            .end(err => {
                if (err) throw err;
            })
    });
});