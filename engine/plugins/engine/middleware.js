const log = require('../../../libs/log')('eonjs', 'EON_LOGLEVEL');

/**
 * This plugin simulates connect-like middleware in eon
 */

class MiddlewarePlugin {
    constructor() { }

    apply(engine) {
        engine.events.middleware.listen((engine, path_, callback, webEngine) => {
            let path = path_;
            let handle = callback;

            if (typeof path !== 'string') {
                path = '/';
                handle = path_;
            }

            if (typeof handle !== 'function') {
                throw "Middleware must be a function";
            }

            (engine.globals.middlewares = engine.globals.middlewares || []).push({ path, handle });
        });

        engine.events.onBeforeResolution.listen((engine, req, res, webEngine) => {
            let stack = (engine.globals.middlewares || []).map(el => el);
            log('verbose', 'onBeforeResolution invoked');
            log('verbose', `res is ${res.writeableEnded ? 'closed' : 'open'}`);
            log('verbose', 'Middleware stack is', stack);

            function next(err) {
                if (err) {
                    res.statusCode = err.status || 500;
                    if (!res.writableEnded) res.end(err.message);
                    else log('warning', `middleware failed: ${err.message}`)
                } else if (stack.length > 0) {
                    let n = stack.shift();
                    if (req.url.startsWith(n.path)) {
                        let path_ = req.url.slice(1).split('/');
                        let path__ = n.path.slice(1).split('/');
                        while (path_[0] === path__[0]) {
                            path_.shift();
                            path__.shift();
                        }
                        if (path__.length === 0) {
                            let path = '/' + path_.join('/');
                            let old = req.url;
                            req.url = path;
                            n.handle(req, res, next);
                            req.url = old;
                        } else {
                            next();
                        }
                    } else {
                        next();
                    }
                } else {
                    log('info', 'middleware stack done');
                    engine.events.middlewareFinished.fire(req, res, webEngine);
                }
            }

            next();
        });
    }
}

module.exports = MiddlewarePlugin;