/** Default profile object returned from GitHub API */
export default interface GithubUserProfile {
	avatar_url: string | null;
	bio: string | null;
	blog: string | null;
	company: string | null;
	created_at: string;
	email: string | null;
	events_url: string | null;
	followers: number;
	followers_url: string | null;
	following: number;
	following_url: string | null;
	gists_url: string | null;
	gravatar_id: string | null;
	hireable: boolean | null;
	html_url: string;
	id: number;
	location: string | null;
	login: string;
	name: string;
	node_id: string;
	organizations_url: string | null;
	owned_private_repos: number | null;
	plan: {
		collaborators: number;
		name: string;
		private_repos: number;
		space: number;
	} | null;
	private_gists: number | null;
	public_gists: number;
	public_repos: number;
	received_events_url: string | null;
	repos_url: string;
	site_admin: boolean;
	starred_url: string | null;
	subscriptions_url: string | null;
	total_private_repos: number | null;
	twitter_username: string | null;
	two_factor_authentication: boolean | null;
	type: string;
	updated_at: string;
	url: string;
}
