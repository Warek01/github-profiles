class GitHubRequest<T> {
	private static readonly _allowCache = true
	private static readonly _cacheMaxAge = 3600 * 24 // 1 day
	private static readonly _defaultStatusCode = 400
	
	private readonly _url: string
	private readonly _token: string
	
	private _res?: Response
	
	public get ok(): boolean {
		return !!this._res?.ok
	}
	
	public get status(): number {
		return this._res?.status || GitHubRequest._defaultStatusCode
	}
	
	constructor(url: string, token: string = '') {
		this._url = url
		this._token = token
	}
	
	public async request(): Promise<void> {
		const headers = {
			'Content-Type': 'application/json',
			'Content-Language': 'en-US, en-GB',
			'Accept': 'application/json',
			'Authorization': !!this._token ? `token ${ this._token }` : ''
		}
		
		this._res = await fetch(this._url, {
			method: 'GET',
			redirect: 'follow',
			mode: 'cors',
			cache: GitHubRequest._allowCache ? 'default' : 'no-store',
			headers
		})
	}
	
	public async parse(): Promise<T> {
		return await this._res?.json() as T
	}
}

export default GitHubRequest
