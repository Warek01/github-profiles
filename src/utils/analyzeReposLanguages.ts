import { GitHubRepo } from '../types'

interface AnalyzedRepoLanguages {
	raw: Map<string, number>
	parsed: Map<string, number>
	total: number
	elapsedMs: number
}

const analyzeReposLanguages = async (repos: GitHubRepo[], authToken: string = ''): Promise<AnalyzedRepoLanguages> => {
	const headers = {
		'Content-Type': 'application/json',
		'Content-Language': 'en-US, en-GB',
		'Accept': 'application/json',
		'Authorization': !!authToken ? `token ${ authToken }` : ''
	}
	const begin = Date.now()
	const raw = new Map<string, number>()
	const parsed = new Map<string, number>()
	let total = 0
	
	try {
		const promises: Promise<Response>[] = []
		repos.forEach(repo => promises.push(fetch(repo.languages_url, { headers })))
		
		const responses = await Promise.all(promises)
		const values: { [name: string]: number }[] = await Promise.all(responses.map(res => res.json()))
		
		values.forEach(obj => {
			Object.entries(obj).forEach(([key, value]) => {
				total += value
				if (raw.has(key)) raw.set(key, raw.get(key)! + value)
				else raw.set(key, value)
			})
		})
		
		raw.forEach((value, key) => {
			const v = Number((value / total * 100).toFixed(2))
			parsed.set(key, v)
		})
		
	} catch (err) {
	
	}
	
	const elapsedMs = Date.now() - begin
	
	return { raw, parsed, total, elapsedMs }
}

export default analyzeReposLanguages
