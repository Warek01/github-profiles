import { GitHubRepo } from '../types'

interface AnalyzedRepoLanguages {
  /** Languages mapped by characters */
  raw: Map<string, number>
  /** Languages mapped by percentage */
  parsed: Map<string, number>
  /** Total amount of characters */
  total: number
  /** Request response time */
  elapsedMs: number
}

const analyzeReposLanguages = async (repos: GitHubRepo[], authToken: string = ''): Promise<AnalyzedRepoLanguages> => {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Language': 'en-US, en-GB',
    'Accept': 'application/json',
    'Authorization': !!authToken ? `token ${authToken}` : '',
  }
  const begin = Date.now()
  const raw = new Map<string, number>()
  const parsed = new Map<string, number>()
  let total = 0

  const promises: Promise<Response>[] = []
  repos.forEach(repo => promises.push(fetch(repo.languages_url, { headers })))

  const responses = await Promise.allSettled(promises)
  const handledResponses = responses.map(res => {
    if (res.status === 'rejected') console.log('Could not load', res)
    else return res.value.json()
  })
  const values: { [name: string]: number }[] = await Promise.all(handledResponses)

  values.forEach(obj => {
    Object.entries(obj).forEach(([key, value]) => {
      total += value
      if (raw.has(key)) raw.set(key, raw.get(key)! + value)
      else raw.set(key, value)
    })
  })

  raw.forEach((value, key) => {
    const v = Number(((value / total) * 100).toFixed(2))
    parsed.set(key, v)
  })

  const elapsedMs = Date.now() - begin

  return { raw, parsed, total, elapsedMs }
}

export default analyzeReposLanguages
