import { UserProfile, GitHubRepo, GitHubResponseUserProfile } from '../types'

/**
 * Loads user profile and its repositories
 * @param {string} login - User's nickname/login
 * @param {string} [authToken = ''] - User's personal access (OAuth) token
 * @returns {@link UserProfile} or status code if failed
 * */
const fetchUserProfile = async (login: string, authToken: string = ''): Promise<UserProfile | number> => {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Language': 'en-US, en-GB',
    'Accept': 'application/json',
    'Authorization': !!authToken ? `token ${authToken}` : '',
  }

  const begin = Date.now()

  const result = await Promise.all([
    fetch(`https://api.github.com/users/${login}`, { headers }),
    fetch(`https://api.github.com/users/${login}/repos`, { headers }),
  ])

  let profile: GitHubResponseUserProfile = {} as GitHubResponseUserProfile
  let repos: GitHubRepo[] = []

  for (const value of result) {
    if (!value.ok) return value.status
    const res = await value.json()

    if (Array.isArray(res)) repos = res
    else profile = res
  }

  const elapsedMs = Date.now() - begin

  return { authToken, repos, elapsedMs, ...profile }
}

export default fetchUserProfile
