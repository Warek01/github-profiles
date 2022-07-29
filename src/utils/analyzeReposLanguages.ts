import { GitHubRepo } from '../types'

import GitHubRequest from './GitHubRequest'

interface AnalyzedRepoLanguages {
	raw: Map<string, number>
	parsed: Map<string, number>
	total: number
	elapsedMs: number
}

const analyzeReposLanguages = async (repos: GitHubRepo[], authToken: string = ''): Promise<AnalyzedRepoLanguages> => {
	const begin = Date.now()
	const raw = new Map<string, number>()
	const parsed = new Map<string, number>()
	let total = 0
	
	for (const repo of repos) {
		const req = new GitHubRequest<{ [name: string]: number }>(repo.languages_url, authToken)
		await req.request()
		if (!req.ok)
			console.log('Error fetching repo languages', req.status, repo)
		const res = await req.parse()
		
		for (const [lang, value] of Object.entries(res)) {
			total += value
			if (raw.has(lang))
				raw.set(lang, raw.get(lang)! + value)
			else
				raw.set(lang, value)
		}
		
		raw.forEach((value, key) => {
			parsed.set(key, Number((value / total * 100).toFixed(2)))
		})
	}
	
	const end = Date.now()
	
	return { raw, parsed, total, elapsedMs: end - begin }
}

export default analyzeReposLanguages
