export interface DockerHubWebhookDataRaw {
	push_data?: {
		pushed_at?: unknown,
		images?: unknown[],
		tag?: unknown,
		pusher?: unknown
	},
	callback_url?: unknown,
	repository?: {
		status?: unknown,
		description?: unknown,
		is_trusted?: unknown,
		full_description?: unknown,
		repo_url?: unknown,
		owner?: unknown,
		is_official?: unknown,
		is_private?: unknown,
		name?: unknown,
		namespace?: unknown,
		star_count?: unknown,
		comment_count?: unknown,
		date_created?: unknown,
		dockerfile?: unknown,
		repo_name?: unknown
	}
}

export interface DockerHubWebhookData {
	callbackUrl: string,
	repoUrl: string,
	imageName: string,
	tag: string,
	name: string,
	namespace: string,
	owner: string,
}

