class HandlerPlugin {
    constructor() { }

    apply(engine) {
        engine.events.request.listen((engine, req, res, webEngine) => {
            // Get base path
            const basePath = (new URL(req.url, `http://localhost:${webEngine.port}`));
            // Resolve path
            engine.globals.unresolved = undefined;
            engine.events.onBeforeResolution.fire(req, res, webEngine);
            if (!res.writeableEnded) {
                engine.events.resolvePath.fire(basePath, req, webEngine);
                if (engine.globals.unresolved !== undefined) {
                    res.statusCode = 404;
                    return res.end(`No ${req.method} path registered on ${req.url}`);
                }
                req.data = engine.globals.pathInfo;
                engine.events.onBeforeRequest.fire(req, res, webEngine);
                if (!res.writeableEnded)
                    (async () => { engine.globals.path.invoke(req, res, webEngine.options.noParseBody); })();
            }
        });
    }
}

module.exports = HandlerPlugin;