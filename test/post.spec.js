const supertest = require('supertest');
const eon = require("../index");

describe('Protocol: POST', () => {
    it("should work with a POST JSON request", (done) => {
        const app = eon(80)
            .post("/")
            .json((req, res) => ({ foo: true }));
        supertest(app)
            .post("/")
            .accept("application/json")
            .expect(200, done)
    });

    it("should work with a GET text request", (done) => {
        const app = eon(80)
            .post('/')
            .text(() => 'Foo Bar Baz');
        supertest(app)
            .post('/')
            .accept("text/plain")
            .expect(200, done)
    });

    it("should be able to send a non-200 status code", done => {
        const app = eon(80)
            .post('/')
            .text((_, res) => {
                res.status(204)
                return '';
            });
        supertest(app)
            .post('/')
            .expect(204, done)
    });

    it("should be able to send a cookie header", done => {
        const app = eon(80)
            .post('/')
            .onBody((req, res) => {
                res.status(204).cookie('cookie', 'foo', {}).end();
            });
        supertest(app)
            .post('/')
            .expect('set-cookie', 'cookie=foo')
            .expect(204, done)
    });

    it("should correctly receive the POST body", done => {
        const app = eon(80)
            .post('/')
            .onBody((req, res) => {
                res.end(req.body.hello);
            });
        supertest(app)
            .post('/')
            .send('hello=world')
            .expect((res) => res.body === 'world')
            .end(done);
    });
});