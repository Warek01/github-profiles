import { UserProfile, GithubUserProfile, GitHubRepo } from '../types'

const fetchUserProfile = async (login: string, token: string = ''): Promise<UserProfile | number> => {
	const requestedTimestamp = Date.now()
	
	const profileReq = await fetch(`https://api.github.com/users/${ login }`, {
		method: 'GET',
		headers: {
			'Authorization': token ? `token ${ token }` : '',
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
	
	if (profileReq.ok) {
		const profileRes = await profileReq.json() as GithubUserProfile
		
		// Fetch user repositories
		const reposReq = await fetch(profileRes.repos_url, {
			method: 'GET',
			headers: {
				'Authorization': token ? `token ${ token }` : '',
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		
		if (reposReq.ok) {
			const reposRes = await reposReq.json() as GitHubRepo[]
			
			return {
				repos: reposRes,
				requestedTimestamp,
				authToken: token,
				...profileRes
			}
		} else return reposReq.status
	} else return profileReq.status
}

export default fetchUserProfile
