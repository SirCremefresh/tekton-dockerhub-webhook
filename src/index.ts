import {createServer, IncomingMessage, ServerResponse} from 'http';
import {DockerHubWebhookData, DockerHubWebhookDataRaw} from './docker-hub-webhook-data.model';

const HOSTNAME = '0.0.0.0';
const PORT = 8080;
const EVENT_LISTENER_PATH_PREFIX = '/run/';

const DEBUG = process.env.DEBUG === 'true';
if (DEBUG) {
	console.debug('Debug logging is enabled');
}

const DOCKER_HUB_SECRET = process.env.DOCKER_HUB_SECRET;
if (DOCKER_HUB_SECRET === undefined) {
	console.error('The environment variable: "DOCKER_HUB_SECRET" is not set. Killing Application ');
	process.exit(1);
} else {
	console.info('Secret successfully loaded from environment variable. variable: "DOCKER_HUB_SECRET"');
}

function isEventListenerPathValid(path: string | string[] | undefined): boolean {
	if (typeof path !== 'string') {
		return false;
	}
	return path.slice(EVENT_LISTENER_PATH_PREFIX.length) === DOCKER_HUB_SECRET;
}

function checkAndParseBody(body: string): { ok: true, data: DockerHubWebhookData } | { ok: false, data: string } {
	let parsedBody;
	try {
		parsedBody = JSON.parse(body) as DockerHubWebhookDataRaw;
	} catch (e) {
		return {ok: false, data: 'could not parse body to Object'};
	}


	let callbackUrl;
	if (parsedBody.callback_url && typeof parsedBody.callback_url === 'string') {
		callbackUrl = parsedBody.callback_url;
	} else {
		return {ok: false, data: 'The callback_url is not set.'};
	}
	let tag;
	if (parsedBody.push_data?.tag && typeof parsedBody.push_data.tag === 'string') {
		tag = parsedBody.push_data.tag;
	} else {
		return {ok: false, data: 'The push_data.tag is not set.'};
	}
	let repoUrl;
	if (parsedBody.repository?.repo_url && typeof parsedBody.repository.repo_url === 'string') {
		repoUrl = parsedBody.repository.repo_url;
	} else {
		return {ok: false, data: 'The repository.repo_url is not set.'};
	}
	let imageName;
	if (parsedBody.repository?.repo_name && typeof parsedBody.repository.repo_name === 'string') {
		imageName = parsedBody.repository.repo_name;
	} else {
		return {ok: false, data: 'The repository.repo_name is not set.'};
	}
	let name;
	if (parsedBody.repository?.name && typeof parsedBody.repository.name === 'string') {
		name = parsedBody.repository.name;
	} else {
		return {ok: false, data: 'The repository.name is not set.'};
	}
	let namespace;
	if (parsedBody.repository?.namespace && typeof parsedBody.repository.namespace === 'string') {
		namespace = parsedBody.repository.namespace;
	} else {
		return {ok: false, data: 'The repository.namespace is not set.'};
	}
	let owner;
	if (parsedBody.repository?.owner && typeof parsedBody.repository.owner === 'string') {
		owner = parsedBody.repository.owner;
	} else {
		return {ok: false, data: 'The repository.owner is not set.'};
	}


	return {
		ok: true,
		data: {
			callbackUrl,
			repoUrl,
			imageName,
			name,
			namespace,
			tag,
			owner
		}
	};
}

function getBody(req: IncomingMessage): Promise<string> {
	return new Promise((res) => {
		const bodyArray: Uint8Array[] = [];
		req.on('data', (chunk) => {
			bodyArray.push(chunk);
		}).on('end', () => {
			res(Buffer.concat(bodyArray).toString());
		});
	});
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
	const body: string = await getBody(req);
	res.setHeader('Content-Type', 'application/json');

	if (DEBUG) {
		console.debug('Received call with body: ' + body);
	}

	if (!isEventListenerPathValid(req.headers['eventlistener-request-url'])) {
		res.statusCode = 400;
		console.error('The specified eventListener path was incorrect. url: ' + req.headers['eventlistener-request-url']);
		res.end(JSON.stringify({status: 'The specified eventListener path was incorrect.'}));
		return;
	}

	const parsedBody = checkAndParseBody(body);
	if (!parsedBody.ok) {
		res.statusCode = 400;
		console.error('The Received body could not be parsed. body: ' + body + ', msg: ' + parsedBody.data);
		res.end(JSON.stringify({status: 'The Received body could not be parsed. msg: ' + parsedBody.data}));
		return;
	}

	const response = JSON.stringify(parsedBody.data);

	if (DEBUG) {
		console.debug('Sending response. response: ' + response);
	}

	res.statusCode = 200;
	res.end(response);
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
