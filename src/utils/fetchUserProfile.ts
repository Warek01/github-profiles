import { UserProfile, RawUserProfile, GitHubRepo } from '../types'

import GitHubRequest from './GitHubRequest'

const fetchUserProfile = async (login: string, token: string = ''): Promise<UserProfile | number> => {
	const requestedTimestamp = Date.now()
	
	const profileReq = new GitHubRequest<RawUserProfile>(`https://api.github.com/users/${ login }`, token)
	await profileReq.request()
	
	if (!profileReq.ok) return profileReq.status
	
	const profileRes = await profileReq.parse()
	const reposReq = new GitHubRequest<GitHubRepo[]>(profileRes.repos_url, token)
	await reposReq.request()
	
	if (!reposReq.ok) return reposReq.status
	
	const reposRes = await reposReq.parse()
	
	return {
		repos: reposRes,
		requestTimestamp: requestedTimestamp,
		authToken: token,
		...profileRes
	}
}

export default fetchUserProfile
