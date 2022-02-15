type SuccessResponse = {
	readonly data: Record<string, any> | Record<string, any>[]
	readonly errors?: Record<string, any> | Record<string, any>[]
	readonly headers: Record<string, any>
	readonly success: boolean
	readonly status: number
}

export interface HeadersOptions {
	origin?: string | string[]
	methods?: string | string[]
	allowedHeaders?: string[]
	exposedHeaders?: string[]
	credentials?: boolean
	maxAge?: number
	auth?: string
	responseType?: string
	cache?: string | string[]
	compression?: string | string[]
}

export interface SiJagoOptions {
	url?: string
	input?: Record<string, any>
	body: Record<string, any>
	headers?: HeadersOptions
}

export interface SiJagoConfig {
	url?: string
	origin?: string
	method?: string
	allowedHeaders?: string
	exposedHeaders?: string
	credentials?: boolean
	maxAge?: number
	auth?: string
	responseType?: string
	cache?: string
	compression?: string
	headers?: Headers
}

export interface SiJagoResponse {
	readonly res: SuccessResponse | Record<string, any>
}
