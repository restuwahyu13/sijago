export const replacerInputString = (input: Record<string, any>, query: string): string => {
	let graphqlSchema: string = query

	const arrayString: any[] = Object.values(input)
		.map((data: any) => {
			if (typeof data === 'object' || typeof data === 'string') {
				return typeof data === 'string' ? data : Object.values(data)
			}
		})
		.flat(Infinity)
		.filter((val) => val !== undefined && val)

	arrayString.forEach((val: any): void => {
		if (typeof val === 'string') {
			graphqlSchema = graphqlSchema.replace(val, `"${val}"`)
		}
	})

	return graphqlSchema
}
