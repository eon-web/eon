const eon = require("../index");

describe("app", () => {
    it("should be typeof function", () => {
        expect(typeof eon()).toBe("function");
    });

    it("should set the port", () => {
        const app = eon(8080);
        expect(app.port).toBe(8080);
    });

    it("should fall back to port 8080", () => {
        const app = eon();
        expect(app.port).toBe(8080);
    })
});