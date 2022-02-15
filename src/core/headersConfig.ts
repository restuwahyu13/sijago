import { assert } from 'is-any-type'
import { HeadersOptions, SiJagoConfig } from '../types'

export function localHeaders(options: HeadersOptions): InstanceType<typeof Headers> {
	let headers: Headers = new Headers()

	// set headers to Access-Control-Allow-Origin
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('origin')) {
		const origin: any = assert.isString(options.origin as any) ? options.origin : (options.origin as string[]).join(',')
		headers.set('Access-Control-Allow-Origin', origin)
		headers.set('Vary', 'origin')
	}

	// set headers to Access-Control-Allow-Methods
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('methods')) {
		const methods: any = assert.isString(options.methods as any) ? options.methods : (options.methods as string[]).join(',')
		headers.set('Access-Control-Allow-Methods', methods)
	}

	// set headers to Access-Control-Allow-Headers
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('allowedHeaders')) {
		const allowedHeaders: any = (options.allowedHeaders as string[]).join(',')
		headers.set('Access-Control-Allow-Headers', allowedHeaders)
	}

	// set headers to Access-Control-Expose-Headers
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('exposedHeaders')) {
		const exposedHeaders: any = (options.exposedHeaders as string[]).join(',')
		headers.set('Access-Control-Expose-Headers', exposedHeaders)
	}

	// set headers to Content-Type && Accept
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('responseType')) {
		headers.set('Accept', options.responseType as string)
		headers.set('Content-Type', options.responseType as string)
	}

	// set headers to Access-Control-Allow-Credentials
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('credentials')) {
		headers.set('Access-Control-Allow-Credentials', String(options.credentials) as string)
	}

	// set headers to Access-Control-Max-Age
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('maxAge')) {
		headers.set('Access-Control-Max-Age', String(Math.abs(options.maxAge as number)))
	}

	// set headers to Authorization
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('auth')) {
		headers.set('Authorization', options.auth as string)
	}

	// set headers to Cache-Control
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('cache')) {
		const cache: any = assert.isString(options.cache as any) ? options.cache : (options.cache as string[]).join(',')
		headers.set('Cache-Control', cache)
	}

	// set headers to Content-Encoding && Accept-Encoding
	if (!assert.isUndefined(options as any) && options.hasOwnProperty('compression')) {
		const compression: any = assert.isString(options.compression as any)
			? options.compression
			: (options.compression as string[]).join(',')

		headers.set('Content-Encoding', compression)
		headers.set('Accept-Encoding', compression)
	}

	return headers
}

export function globalHeaders(SiJago: any): Headers {
	let configs: SiJagoConfig = SiJago.configs
	let headers: Headers = new Headers()

	// set headers to Host
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('url')) {
		SiJago.url = configs.url as string
	}

	// set headers to Access-Control-Allow-Origin
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('origin')) {
		headers.set('Access-Control-Allow-Origin', configs.origin as string)
	}

	// set headers to Access-Control-Allow-Methods
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('method')) {
		headers.set('Access-Control-Allow-Methods', configs.method as string)
	}

	// set headers to Access-Control-Allow-Methods
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('method')) {
		headers.set('Access-Control-Allow-Methods', configs.method as string)
	}

	// set headers to Access-Control-Allow-Headers
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('allowedHeaders')) {
		headers.set('Access-Control-Allow-Headers', configs.allowedHeaders as string)
	}

	// set headers to Access-Control-Expose-Headers
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('exposedHeaders')) {
		headers.set('Access-Control-Expose-Headers', configs.exposedHeaders as string)
	}

	// set headers to Access-Control-Allow-Credentials
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('credentials')) {
		headers.set('Access-Control-Allow-Credentials', String(configs.credentials) as string)
	}

	// set headers to Access-Control-Max-Age
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('maxAge')) {
		headers.set('Access-Control-Max-Age', String(Math.abs(configs.maxAge as number)) as string)
	}

	// set headers to Authorization
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('auth')) {
		headers.set('Authorization', configs.auth as string)
	}

	// set customer Headers
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('headers')) {
		headers = Object.assign(headers, configs.headers)
	}

	// set headers to Content Type && Accept
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('responseType')) {
		headers.set('Content-Type', configs.responseType as string)
		headers.set('Accept', configs.responseType as string)
	}

	// set headers to Cache-Control
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('cache')) {
		headers.set('Cache-Control', configs.cache as string)
	}

	// set headers to Content-Encoding && Accept-Encoding
	if (!assert.isUndefined(configs as any) && configs.hasOwnProperty('compression')) {
		headers.set('Content-Encoding', configs.compression as string)
		headers.set('Accept-Encoding', configs.compression as string)
	}

	return headers
}
