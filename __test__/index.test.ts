import { sijago } from '../src'

describe('SiJago Group Testing', function () {
	let url = ''
	let body = {}

	beforeEach(() => {
		url = 'https://graphqlzero.almansi.me/api'
		body = {
			albums: {
				data: {
					title: sijago.scalar.GraphqlString,
					user: {
						name: sijago.scalar.GraphqlString,
						email: sijago.scalar.GraphqlString
					},
					photos: {
						data: {
							title: sijago.scalar.GraphqlString,
							url: sijago.scalar.GraphqlString
						}
					}
				}
			}
		}
	})

	it('Should be url is required', function () {
		expect(sijago).toBeDefined()
		sijago.query({ url: '', body }).catch((e) => {
			expect(e.message).toBe('Url format is not valid')
		})
	})

	it('Should be input is required', function () {
		expect(sijago).toBeDefined()
		sijago.query({ url, input: {}, body }).catch((e) => {
			expect(e.message).toBe('Input is required, one or a lot of property')
		})
	})

	it('Should be body is required', function () {
		expect(sijago).toBeDefined()
		sijago.query({ url, body: {} }).catch((e) => {
			expect(e.message).toBe('Body is required, one or a lot of property')
		})
	})

	it('Should be headers is required', function () {
		expect(sijago).toBeDefined()
		sijago.query({ url, body, headers: {} }).catch((e) => {
			expect(e.message).toBe('Headers is required, one or a lot of property')
		})
	})

	it('Should be query data from server success', function () {
		expect(sijago).toBeDefined()
		sijago.query({ url, body }).then(({ res }) => {
			expect(res.status).toEqual(200)
			expect(res.hasOwnProperty('data')).toBeTruthy()
		})
	})

	it('Should be query data from server failed', function () {
		expect(sijago).toBeDefined()
		sijago.query({ url, body: { results: { testing: sijago.scalar.GraphqlString } } }).then(({ res }) => {
			expect(res.status).toEqual(400)
		})
	})

	it('Should be mutation data from server success', function () {
		expect(sijago).toBeDefined()
		sijago
			.mutation({
				url: 'https://graphqlzero.almansi.me/api',
				input: { title: 'Megadeth Black Album', userId: 2 },
				body: {
					createAlbum: {
						title: sijago.scalar.GraphqlString,
						user: {
							name: sijago.scalar.GraphqlString,
							email: sijago.scalar.GraphqlString
						},
						photos: {
							data: {
								title: sijago.scalar.GraphqlString,
								url: sijago.scalar.GraphqlString
							}
						}
					}
				}
			})
			.then(({ res }) => {
				expect(res.status).toEqual(200)
				expect(res.hasOwnProperty('data')).toBeTruthy()
			})
	})

	it('Should be mutation data from server failed', function () {
		expect(sijago).toBeDefined()
		sijago
			.mutation({
				url: 'https://graphqlzero.almansi.me/api',
				input: { title: 'Megadeth Black Album', userId: 2 },
				body: {
					createAlbumx: {
						title: sijago.scalar.GraphqlString,
						user: {
							name: sijago.scalar.GraphqlString,
							email: sijago.scalar.GraphqlString
						},
						photos: {
							data: {
								title: sijago.scalar.GraphqlString,
								url: sijago.scalar.GraphqlString
							}
						}
					}
				}
			})
			.then(({ res }) => {
				expect(res.status).toEqual(400)
			})
	})
})
