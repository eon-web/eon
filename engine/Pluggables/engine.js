const { Pluggable, PlugEvent } = require('../../plugins');

/**
 * This is the root pluggable for this app
 */
class Engine extends Pluggable {
    constructor(plugins, options) {
        super(options);
        this.events.create = new PlugEvent(this);
        this.events.resolvePath = new PlugEvent(this);
        this.events.onBeforeRequest = new PlugEvent(this);
        this.events.request = new PlugEvent(this);
        this.events.listen = new PlugEvent(this);
        this.events.tearDown = new PlugEvent(this);
        this.events.middleware = new PlugEvent(this);
        this.events.onBeforeResolution = new PlugEvent(this);
        this.events.middlewareFinished = new PlugEvent(this);
        plugins.map(p => this.registerPlug(p));
    }
}

module.exports = Engine;