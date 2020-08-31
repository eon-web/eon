const turbo = require('..')(8080);

turbo.get('/').text((req, res) => 'Faster test');
turbo.get('/hook').hook((req, res) => res.end(`You requested ${req.pathname}`));
turbo.get('/json').json((req, res) => ({hello: 'world'}));
turbo.post('/post').hook((req, res) => req.on('body', _ => {
    res.end(`You sent me: ${JSON.stringify(req.body)}`);
}));
turbo.listen(p => console.log(`Listening on http://localhost:${p}`));