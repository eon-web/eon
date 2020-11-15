declare namespace eon {
	interface CookieOptions {
		expires: Date;
		max_age: number;
		path: string;
		domain: string;
		same_site: 'strict' | 'lax' | 'none';
		secure: boolean;
		HttpOnly: boolean;
	}

	class Callable extends Function {
		constructor();
		_call(): void;
	}

	class EonWebEngine extends Callable {
		public host: Engine;
		public port: number;
		public options: { plugins: any[] };
		private _onerror: ((err: Error, data: any, engine: EonWebEngine) => void)[];
		constructor(port?: number, options?: { plugins: any[] });
		errorHandler(callback: (err: Error, data: any, engine: EonWebEngine) => void): EonWebEngine;
		get(path: string): GETPath;
		post(path: string): POSTPath;
		use(path: string, callback: Function): EonWebEngine;
		listen(callback: Function): void;
  }
  
  class IncomingHTTPData {
		public whatwg: URL;
		public method: 'POST' | 'GET'; // Only set to this because of current support
		public headers: any;
		public rawHeaders: string[];
		public url: string;
		public pathname: string;
		public query: any | undefined;
    	public body: any | undefined;
    	public data: any | undefined;
		public error: Error | undefined;

		constructor(req: any, noParseBody: any, engine: EonWebEngine, res: any);
		on(event: string, listener: Function): void;
  }

  class OutgoingHTTPData {
		public endend: boolean;
		constructor(res: any);
		status(n: number): OutgoingHTTPData;
		header(name: string, value: string): OutgoingHTTPData;
		getHeader(name: string): string;
		write(data: string): OutgoingHTTPData;
		end(data: any): OutgoingHTTPData;
		cookie(name: string, value: string, options: CookieOptions);
  }

  class TextCallbackHandler {
		public callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any;
		constructor(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any);
		invoke(
			req: IncomingHTTPData,
			res: OutgoingHTTPData,
			options: { noParseBody: boolean; noUTF8Header: boolean }
		): void;
  }

  class JSONCallbackHandler extends TextCallbackHandler {
		invoke(
			req: IncomingHTTPData,
			res: OutgoingHTTPData,
			options: { noParseBody: boolean; noUTF8Header: boolean }
		): void;
  }

  class HookCallbackHandler extends TextCallbackHandler {
		invoke(
			req: IncomingHTTPData,
			res: OutgoingHTTPData,
			options: { noParseBody: boolean; noUTF8Header: boolean }
		): void;
  }

  class GETPath {
		constructor(engine: EonWebEngine);
		text(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => string): EonWebEngine;
		hook(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any): EonWebEngine;
		json(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any): EonWebEngine;
		invoke(
			req: IncomingHTTPData,
			res: OutgoingHTTPData,
			options: { noParseBody: boolean; noUTF8Header: boolean }
		): void;
  }

  class POSTPath extends GETPath {
		onBody(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any): EonWebEngine;
		invoke(
			req: IncomingHTTPData,
			res: OutgoingHTTPData,
			options: { noParseBody: boolean; noUTF8Header: boolean }
		): void;
  }

  class Engine extends Pluggable {
		public events: any;
		constructor(plugins: Pluggable[], options: any);
  }

  class Plug extends Callable {
		constructor(options: any);
		public _call(): void;
		public apply(pluggable: Pluggable): void;
  }

  class Pluggable {
		public events: any;
		public globals: any;
		public plugs: Plug[];
		public options: any;
		public registerPlug(p: Plug): void;
		public register(event: string, listener: Function): void;
  }

  class PlugEvent {
		hooks: Function[];
		constructor(host: Pluggable);
		listen(callback: (host: Pluggable, ...args: any) => void): void;
		fire(...args: any): void;
		asyncFire(snyc: boolean, ...args: any): void;
		private _asyncCall(f: (...args: any) => void, ...args: any): void;
  }

}

declare function eon(
  port?: number,
  options?: any
): eon.EonWebEngine;

export = eon;