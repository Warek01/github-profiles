import RawUserProfile from './RawUserProfile'
import GitHubRepo from '../GitHubRepo'

/** Wrap over default profile object returned from GitHub API */
export default interface UserProfile extends RawUserProfile {
	authToken: string
	elapsedMs: number
	repos: GitHubRepo[]
}
