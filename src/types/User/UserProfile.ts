import GithubUserProfile from './GithubUserProfile';

/** Wrap over default profile object returned from GitHub API */
export default interface UserProfile extends GithubUserProfile {
	auth: boolean;
	requestedTimestamp: number;
}