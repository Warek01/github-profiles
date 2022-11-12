import GitHubResponseUserProfile from './GitHubResponseUserProfile'
import GitHubRepo from '../GitHubRepo'

/** Wrap over default profile object returned from GitHub API */
export default interface UserProfile extends GitHubResponseUserProfile {
  authToken: string
  elapsedMs: number
  repos: GitHubRepo[]
}
