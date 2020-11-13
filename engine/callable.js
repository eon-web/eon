class Callable extends Function {
    constructor() {
        super('...args', 'return this._bound._call(...args)');
        this._bound = this.bind(this);
        return this._bound;
    }

    _call() {}
}

module.exports = Callable;