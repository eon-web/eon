const PlugEvent = require('./event');

/**
 * An instance of this class can be "plugged in to". Extend it to add events.
 */
// More to come
class Pluggable {
    constructor(options) {
        this.events = {};
        // Share data between Plugs using `globals`
        this.globals = {};
        this.plugs = [];
        this.options = options;
    }

    registerPlug(p) {
        if (!this.plugs.includes(p)) this.plugs.push(p);
        p.apply(this);
    }

    register(e, l) {
        this.events[e] = l;
    }

    unbindAll() {
        for (let event in this.events) {
            this.unbind(event);
        }
    }

    unbind(event) {
        this.events[event].hooks = [];
    }
}

module.exports = {
    Pluggable,
    PlugEvent
}