import { UserProfile, RawUserProfile, GitHubRepo } from '../types'

import GitHubRequest from './GitHubRequest'

/**
 * Loads user profile and its repositories
 * @param {string} login - User's nickname/login
 * @param {string} [authToken = ''] - User's personal access (OAuth) token
 * @returns {@link UserProfile} or status code if failed
 * */
const fetchUserProfile = async (login: string, authToken: string = ''): Promise<UserProfile | number> => {
	const requestTimestamp = Date.now()
	
	const profileReq = new GitHubRequest<RawUserProfile>(`https://api.github.com/users/${ login }`, authToken)
	await profileReq.request()
	
	if (!profileReq.ok) return profileReq.status
	
	const profileRes = await profileReq.parse()
	const reposReq = new GitHubRequest<GitHubRepo[]>(profileRes.repos_url, authToken)
	await reposReq.request()
	
	if (!reposReq.ok) return reposReq.status
	
	const repos = await reposReq.parse()
	const responseTimestamp = Date.now()
	
	return {
		authToken,
		repos,
		requestTimestamp,
		responseTimestamp,
		...profileRes
	}
}

export default fetchUserProfile
