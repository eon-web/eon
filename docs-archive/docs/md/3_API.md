# API
API referenece.

### `eon(port): EonWebEngine`
This function is the default export of the Eon library. It will create a new EonWebEngine instance.

## Class: `EonWebEngine`
An instance of this class is created by `require('eon')(<port>)`;

### `constructor`
Args:
- `port:number` The port to listen on

### `get(path):Path`
Registers a new GET listener on `path`.

Args:
- `path:string` The pathname to register the listener on. Examples: `"/"`, `"/test"`

Returns: `GETPath extends Path`

### `post(path):Path`
Registers a new POST listener on `path`.

Args:
- `path:string` The pathname to register the listener on. Examples: `"/"`, `"/test"`

Returns: `POSTPath extends Path`

### `listen([callback]):void`
Listens on the port specified by the constructor.

Args:
- `callback?:function(port)` (optional) Will be called once the server is listening. Arguments: The port the server is listening on.

Returns: `void`

## Class: `Path`
A path listener

### `text(callback):EonWebEngine`
When a request is received on this path, the text returned from `callback(req, res)` will be sent to the client.

Args:
- `callback:function(req:IncomingHTTPData, res:OutgoingHTTPData)` The request handler

Returns: `EonWebEngine` The Engine that created it.

### `json(callback):EonWebEngine`
Like `Path.text()` but will run `JSON.stringify` on callback output before sending

### `hook(callback):EonWebEngine`
Like `Path.text()`, but expects the callback to send data itsself

Args:
- `callback:function(req:IncomingHTTPData, res:OutgoingHTTPData)` The request handler

Returns: `EonWebEngine` The Engine that created it.

## Class: `IncomingHTTPData`
An incoming HTTP request

### field: `whatwg:URL`
A parsed `URL` object ([see nodejs URL docs](https://nodejs.org/api/url.html#url_url_strings_and_url_objects))

### field: `method:string`
The request method ('GET', 'POST', 'PUT', etc..)

### field: `headers:object`
The request headers ([see nodejs http docs](https://nodejs.org/api/http.html#http_message_headers))

### field: `rawHeaders:object`
The unprocessed request headers ([see nodejs http docs](https://nodejs.org/api/http.html#http_message_rawheaders))

### field: `url:string`
The full request url, without protocol and host. Example: `/p/a/t/h?name=john&lastname=doe#info`

### field: `pathname:string`
alias for `IncomingHTTPData.whatwg.pathname`

### field: `query:object`
The parsed querystring (Only available for GET requests)

### field: `body:object`
The parsed post/put body (Only available for Non-GET requests **after the** `body` **event has fired**)

### event: `body`
Fired on POST-like requests after the body is received and parsed

Arguments to handler: none

### `on(event, handler)`
Register an event handler. Multiple handlers can be registed for one event. **Handlers cannot be unregistered**

Args:
- `event:string` Name of the event to listen for
- `handler:function(...args)` The handler to call when the event is fired

## Class: `OutgoingHTTPData`
An outgoing HTTP response. Passed as second argument to request handlers

### field: `endend:boolean`
Wether the stream has been closed

### `status(code):OutgoingHTTPData`
Sets the response status

Args:
- `code:number` The status code to send

Returns: `OutgoingHTTPData` The object it was called on

### `header(name, value):OutgoingHTTPData`
Sets a response header

Args:
- `name:string` The name of the header
- `value:string` The value of the header

Returns: `OutgoingHTTPData` The object it was called on

### `getHeader(name):string`
Returns the value of a header

Args:
- `name:string` The name of the header to retrieve

Returns `string` The value of the header

### `write(data):OutgoingHTTPData`
Sends data to the client

Args:
- `data:string` The data to write

Returns: `OutgoingHTTPData` The object it was called on

### `end(data):OutgoingHTTPData`
Like `write()` but will close the stream

Returns: `OutgoingHTTPData` The object it was called on