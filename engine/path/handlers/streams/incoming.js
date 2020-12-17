
const createLog = require('../../../../libs/log');
const log = createLog('eonjs', 'EON_LOGLEVEL');

class IncomingHTTPData {
    constructor(req, noParseBody, engine, res) {
        this.res = res;
        this.engine = engine;
        this.whatwg = new URL(req.url, `http://${req.headers.host}`);
        this.data = req.data;
        this.method = req.method;
        this.body = undefined;
        this.error = false;
        this.headers = req.headers;
        this.rawHeaders = req.rawHeaders;
        this.url = req.url;
        this.pathname = this.whatwg.pathname;
        this._events = {};
        this._fired = [];
        this.query = {};
        this.whatwg.searchParams.forEach((val, key) => this.query[key] = val);
        if (req.method === 'POST' || req.method === 'PUT') {
            let body = "";
            req.on('data', d => body += d.toString());
            req.on('end', _ => {
                this.rawBody = body;
                if (!noParseBody && (req.method !== 'PUT')) {
                    try {
                        if (req.headers['content-type'].split(';').map(t => t.trim()).includes('application/json')) {
                            log('info', 'request body is json');
                            this.body = JSON.parse(body || '');
                        } else {
                            log('info', 'assumed request body is form');
                            this.body = require('querystring').parse(body || '');
                        }
                    } catch (e) {
                        log('warning', `Error while parsing body '${body}': ${e.message}`);
                        this.error = e;
                    }
                    this._fire('body', true);
                } else {
                    log('info', 'not parsing body');
                    this.body = this.rawBody;
                    this._fire('body', true);
                };
            });
        }
    }

    on(e, l) {
        if (this._fired.includes(e)) return l();
        if (this._events[e]) return this._events[e].push(l);
        this._events[e] = [l];
    }

    _fire(e, t, ...d) {
        try {
            if (this._events[e]) this._events[e].forEach(l => l(...d));
            if (t) this._fired.push(e);
        } catch (error) {
            if ((!this.engine) || (!this.res)) throw error;
            log('error', `Failed to respond to request`);
            log('error', `Error:`, error);
            this.engine._handle_error(error,  {
                url: this.url,
                time: new Date()
            });
            if (!this.res.ended) { this.res.status(500).end(`Error: ${error.message}`) }
        }
    }
}

module.exports = IncomingHTTPData;