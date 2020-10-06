const http = require('http');

const HOSTNAME = '0.0.0.0', PORT = 8080;

const server = http.createServer((req, res) => {
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();

		res.statusCode = 200;
		const {method, url} = req;
		console.log(req.rawHeaders)
		console.log(req.headers)
		console.log(method)
		console.log(url)
		console.log(body)
		res.setHeader('Content-Type', 'application/json');
		res.end('{}');
	})

});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
