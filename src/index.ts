import {createServer, IncomingMessage, ServerResponse} from 'http';

const HOSTNAME = '0.0.0.0';
const PORT = 8080;

const DOCKER_HUB_SECRET = process.env.DOCKER_HUB_SECRET;
if (DOCKER_HUB_SECRET === undefined) {
	console.error("The environment variable: \"DOCKER_HUB_SECRET\" is not set. Killing Application ")
	process.exit(1);
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
	const bodyArray: Uint8Array[] = [];
	req.on('data', (chunk) => {
		bodyArray.push(chunk);
	}).on('end', () => {
		const body: string = Buffer.concat(bodyArray).toString();

		res.statusCode = 200;
		const {method, url} = req;
		console.log(req.rawHeaders);
		console.log(req.headers);
		console.log(method);
		console.log(url);
		console.log(body);
		res.setHeader('Content-Type', 'application/json');
		res.end('{}');
	});

});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
