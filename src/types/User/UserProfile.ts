import GithubUserProfile from './GithubUserProfile'
import GitHubRepo from '../GitHubRepo'

/** Wrap over default profile object returned from GitHub API */
export default interface UserProfile extends GithubUserProfile {
	authToken: string
	requestedTimestamp: number
	repos: GitHubRepo[]
}