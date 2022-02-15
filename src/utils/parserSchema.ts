export const queryParserNotParams = (query: Record<string, any>): string => {
	const graphqlSchema: string = JSON.stringify(query)
		.replace(
			/\.*(GraphqlString|GraphqlNumber|GraphqlFloat|GraphqlBoolean|GraphqlDate|GraphqlObject|GraphqlArray|GraphqlArrayObject|GraphqlBuffer)/gi,
			''
		)
		.replace(/[:,]/g, ' ')
		.replace(/[""]/g, '')

	return graphqlSchema
}

export const queryParserWithParams = (options: Record<string, any>): string => {
	const resolversName: string = `{${Object.keys(options.body)[0]} `

	const bodySchema: string = JSON.stringify(Object.assign(options.body))
		.replace(
			/\.*(GraphqlString|GraphqlNumber|GraphqlFloat|GraphqlBoolean|GraphqlDate|GraphqlObject|GraphqlArray|GraphqlArrayObject|GraphqlBuffer)/gi,
			''
		)
		.replace(/[""]/g, '')
		.replace(/[:,]/g, ' ')

	const inputSchema: string = JSON.stringify({ input: options.input })
		.replace(
			/\.*(GraphqlString|GraphqlNumber|GraphqlFloat|GraphqlBoolean|GraphqlDate|GraphqlObject|GraphqlArray|GraphqlArrayObject|GraphqlBuffer)/gi,
			''
		)
		.replace(/[""]/g, '')

	const validInputSchema: string = inputSchema.replace(/^[{]+(input:)/i, '').replace(/[}]$/, '')
	const addGroupBracket: string = validInputSchema.replace(/^[{]/, '(').replace(/[}]$/, ')')
	const mergeSchema: string =
		resolversName + addGroupBracket + bodySchema.replace(/^[{]/, '').replace(resolversName.replace(/^[{]/, ''), '')

	return mergeSchema
}

export const mutationParserWithParams = (options: Record<string, any>): string => {
	const resolversName: string = `mutation{${Object.keys(options.body)[0]} `

	const bodySchema: string = JSON.stringify(Object.assign(options.body))
		.replace(
			/\.*(GraphqlString|GraphqlNumber|GraphqlFloat|GraphqlBoolean|GraphqlDate|GraphqlObject|GraphqlArray|GraphqlArrayObject|GraphqlBuffer)/gi,
			''
		)
		.replace(/[""]/g, '')
		.replace(/[:,]/g, ' ')

	const inputSchema: string = JSON.stringify({ input: options.input })
		.replace(
			/\.*(GraphqlString|GraphqlNumber|GraphqlFloat|GraphqlBoolean|GraphqlDate|GraphqlObject|GraphqlArray|GraphqlArrayObject|GraphqlBuffer)/gi,
			''
		)
		.replace(/[""]/g, '')

	const addGroupBracket: string = inputSchema.replace(/^[{]/, '(').replace(/[}]$/, ')')
	const mergeSchema: string =
		resolversName + addGroupBracket + bodySchema.replace(/^[{]/, '').replace(resolversName.replace(/^(mutation)+[{]/i, ''), '')

	return mergeSchema
}
