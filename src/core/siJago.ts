/**
 * sijago-graphql-client
 * @author Copyright(c) 2022 by Restu wahyu saputra
 * MIT Licensed
 */

import fetch from 'isomorphic-fetch'
import { assert } from 'is-any-type'

import { SiJagoResponse, SiJagoOptions, SiJagoConfig } from '../types'
import { SiJagoError } from '../utils/error'
import { SiJagoScalarType } from './scallarType'
import { localHeaders, globalHeaders } from './headersConfig'
import { queryParserNotParams, queryParserWithParams, mutationParserWithParams } from '../utils/parserSchema'
import { validator } from '../utils/validator'
import { replacerInputString } from '../utils/replacerInputString'

export class SiJago {
	private static url: string = ''
	private static sdl: string = ''
	private static method: string = 'POST'
	private static headers: Record<string, any> = {}
	static configs: SiJagoConfig = {}
	static scalar: typeof SiJagoScalarType = SiJagoScalarType

	/**
	 * schemaResolvers for query graphql request
	 *
	 * @params {  body } string
	 * @return { string } string
	 */

	private static schemaResolvers(body: string): string {
		return JSON.stringify({ query: body })
	}

	/**
	 * respose formatter for graphql request
	 *
	 * @params {  data } Object | Array
	 * @params {  res } Response | Object
	 * @return { SiJagoResponse } SiJagoResponse | Object
	 */

	private static response(data: Record<string, any> | Record<string, any>[], res: Response): SiJagoResponse {
		return {
			res: {
				data: data['data'] as any,
				error: data['error'] as any,
				url: res.url,
				status: res.status,
				statusText: res.statusText,
				headers: res.headers
			}
		}
	}

	/**
	 * validator for graphql schema and options request by resolvers
	 *
	 * @params {  SiJagoOptions } SiJagoOptions | Object
	 * @return { void } Promise<void>
	 */

	private static async validator(resolversType: string, options: SiJagoOptions): Promise<void> {
		const isValidOptions: Promise<any> | boolean = await validator('isValidOptions', options)
		if (assert.isPromise(isValidOptions as any)) isValidOptions

		const isOptionsNotEmpty: Promise<any> | boolean = await validator('isOptionsNotEmpty', options as Record<string, any>)
		if (assert.isPromise(isOptionsNotEmpty as any)) isOptionsNotEmpty

		if (!assert.isUndefined(SiJago.configs as any)) {
			const isValidConfigs: Promise<any> | boolean = await validator('isValidConfigs', SiJago.configs)
			if (assert.isPromise(isValidConfigs as any)) isValidConfigs
		}

		if (options.hasOwnProperty('headers')) {
			const isValidHeaders: Promise<any> | boolean = await validator('isValidHeaders', options.headers as Record<string, any>)
			if (assert.isPromise(isValidHeaders as any)) isValidHeaders
		}

		if (resolversType == 'query') {
			const isValidSchemaQuery: Promise<any> | boolean = await validator('isValidSchemaQuery', options)
			if (assert.isPromise(isValidSchemaQuery as any)) isValidSchemaQuery
		}

		if (resolversType == 'mutation') {
			const isValidSchemaMutation: Promise<any> | boolean = await validator('isValidSchemaMutation', options)
			if (assert.isPromise(isValidSchemaMutation as any)) isValidSchemaMutation
		}
	}

	/**
	 * Query allow your get data from server-side, and it also returns an object based on the operation performed
	 *
	 * @params {  options } SiJagoOptions | object
	 * @return { SiJagoResponse }  Promise<SiJagoResponse> | Promise<Object>
	 */

	static async query(options: SiJagoOptions): Promise<SiJagoResponse> {
		try {
			await SiJago.validator('query', options)
			SiJago.headers = !Object.keys(SiJago.configs).length ? localHeaders(options.headers as any) : globalHeaders(SiJago)
			SiJago.sdl = options.hasOwnProperty('input')
				? SiJago.schemaResolvers(replacerInputString(options.input as any, queryParserWithParams(options)))
				: SiJago.schemaResolvers(queryParserNotParams(options.body))

			options.url = options.hasOwnProperty('url') ? options.url : SiJago.url

			const res: Response = await fetch(options.url as string, {
				method: SiJago.method,
				body: SiJago.sdl,
				headers: SiJago.headers
			})
			const data: Record<string, any> | Record<string, any>[] = await res.json()

			return SiJago.response(data, res)
		} catch (e: any) {
			return Promise.reject(new SiJagoError(e.message))
		}
	}

	/**
	 * Mutation allow you to modify server side data, and it also returns an object based on the operation performed.
	 * It can be used to insert, update, or delete data
	 *
	 * @params {  options } SiJagoOptions | Object
	 * @return { SiJagoResponse }  Promise<SiJagoResponse> | Promise<Object>
	 */

	static async mutation(options: SiJagoOptions): Promise<SiJagoResponse> {
		try {
			await SiJago.validator('mutation', options)
			SiJago.headers = !Object.keys(SiJago.configs).length ? localHeaders(options.headers as any) : globalHeaders(SiJago)
			SiJago.sdl = SiJago.schemaResolvers(replacerInputString(options.input as any, mutationParserWithParams(options)))

			options.url = options.hasOwnProperty('url') ? options.url : SiJago.url

			const res: Response = await fetch(options.url as string, {
				method: SiJago.method,
				body: SiJago.sdl,
				headers: SiJago.headers
			})
			const data: Record<string, any> = await res.json()

			return SiJago.response(data, res)
		} catch (e: any) {
			return Promise.reject(new SiJagoError(e.message))
		}
	}
}
