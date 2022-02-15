import gql from 'graphql-tag'
import { assert } from 'is-any-type'

import { SiJagoError } from './error'
import { queryParserNotParams, queryParserWithParams, mutationParserWithParams } from './parserSchema'
import { replacerInputString } from './replacerInputString'

const isValidSchemaQuery = (options: Record<string, any>): any => {
	if (!options.hasOwnProperty('input') && !gql(queryParserNotParams(options.body)).hasOwnProperty('kind')) {
		return 'GraphQL schema is not valid'
	}

	if (options.hasOwnProperty('input') && !gql(queryParserWithParams(options)).hasOwnProperty('kind')) {
		return 'GraphQL schema is not valid'
	}

	return true
}

const isValidSchemaMutation = (options: Record<string, any>): any => {
	if (
		options.hasOwnProperty('input') &&
		!gql(replacerInputString(options.input as any, mutationParserWithParams(options))).hasOwnProperty('kind')
	) {
		return 'GraphQL schema is not valid'
	}

	return true
}

const isValidOptions = (options: Record<string, any>): any => {
	const defaultProperty = { input: undefined, url: undefined, headers: undefined, body: undefined }
	const compareIn = Object.keys(options)
	const newInData = compareIn.map((v) => v in defaultProperty)

	return newInData.includes(false) ? 'Options property is not valid' : true
}

const isOptionsNotEmpty = (options: Record<string, any>): any => {
	if (options.hasOwnProperty('url') && !['http', 'https'].includes(options.url.split(/[://]/g)[0])) {
		return 'Url format is not valid'
	}

	if (options.hasOwnProperty('input') && !Object.keys(options.input).length) {
		return 'Input is required, one or a lot of property'
	}

	if (options.hasOwnProperty('body') && !Object.keys(options.body).length) {
		return 'Body is required, one or a lot of property'
	}

	if (options.hasOwnProperty('headers') && !Object.keys(options.headers).length) {
		return 'Headers is required, one or a lot of property'
	}

	return true
}

const isValidConfigs = (options: Record<string, any>): any => {
	const defaultProperty = {
		url: undefined,
		origin: undefined,
		method: undefined,
		allowedHeaders: undefined,
		exposedHeaders: undefined,
		credentials: undefined,
		maxAge: undefined,
		auth: undefined,
		headers: undefined,
		responseType: undefined,
		cache: undefined,
		compression: undefined
	}

	const compareIn = Object.keys(options)
	const newInData = compareIn.map((v) => v in defaultProperty)

	return newInData.includes(false) ? 'Configs property is not valid' : true
}

const isValidHeaders = (options: Record<string, any>): any => {
	const defaultProperty = {
		origin: undefined,
		methods: undefined,
		allowedHeaders: undefined,
		exposedHeaders: undefined,
		credentials: undefined,
		maxAge: undefined,
		auth: undefined,
		responseType: undefined,
		cache: undefined,
		compression: undefined
	}
	const compareIn = Object.keys(options)
	const newInData = compareIn.map((v) => v in defaultProperty)

	if (newInData.includes(false)) {
		return 'Headers property is not valid'
	}

	return true
}

export const validator = (errorType: string, options: Record<string, any>): boolean | Promise<any> => {
	if (errorType == 'isValidSchemaQuery' && assert.isString(isValidSchemaQuery(options))) {
		return assert.isUndefined(typeof window as any)
			? Promise.reject(new SiJagoError(isValidSchemaQuery(options)))
			: Promise.reject(new Error(isValidSchemaQuery(options)))
	}

	if (errorType == 'isValidSchemaMutation' && assert.isString(isValidSchemaMutation(options))) {
		return assert.isUndefined(typeof window as any)
			? Promise.reject(new SiJagoError(isValidSchemaMutation(options)))
			: Promise.reject(new Error(isValidSchemaMutation(options)))
	}

	if (errorType == 'isValidOptions' && assert.isString(isValidOptions(options))) {
		return assert.isUndefined(typeof window as any)
			? Promise.reject(new SiJagoError(isValidOptions(options)))
			: Promise.reject(new Error(isValidOptions(options)))
	}

	if (errorType == 'isValidHeaders' && assert.isString(isValidHeaders(options))) {
		return assert.isUndefined(typeof window as any)
			? Promise.reject(new SiJagoError(isValidHeaders(options)))
			: Promise.reject(new Error(isValidHeaders(options)))
	}

	if (errorType == 'isValidConfigs' && assert.isString(isValidConfigs(options))) {
		return assert.isUndefined(typeof window as any)
			? Promise.reject(new SiJagoError(isValidConfigs(options)))
			: Promise.reject(new Error(isValidConfigs(options)))
	}

	if (errorType == 'isOptionsNotEmpty' && assert.isString(isOptionsNotEmpty(options))) {
		return assert.isUndefined(typeof window as any)
			? Promise.reject(new SiJagoError(isOptionsNotEmpty(options)))
			: Promise.reject(new Error(isOptionsNotEmpty(options)))
	}

	return true
}
