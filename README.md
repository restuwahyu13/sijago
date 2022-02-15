# SiJago (GraphQL Client)

**SiJago** is GraphQL Client for Browser and Node.js, You can write request GraphQL schema using JavaScript Object Style, Why i create this tools, Because for reducing typo when writing GraphQL schema using HTTP client like Axios, Fetch or GraphQL client using Apollo and also to simplify calling the GraphQL schema for easy to understand for human.

## Table Of Content

- [Installation](#installation)
- [Sijago Options](#sijago-options)
- [Sijago Properties](#sijago-properties)
  + [Scalar](#scalar)
  + [Configs](#configs)
- [Sijago Methods](#sijago-methods)
   + [Query](#query)
   + [Mutation](#mutation)
- [Example Usage](#example-usage)
- [Testing](#testing)
- [Bugs](#bugs)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install sijago -S or yarn add sijago -S
```

## SiJago Options

- **url?**: is used for the address the graphql server that will be used to interaction.
- **input**: is used to send given request from client to graphql server, usually used when using mutation or query.
- **body**: is used to display the response data provided by the graphql server.
- **headers**: is used for interface of the Fetch API allows you to perform various actions on HTTP request and response headers.

## SiJago Properties

- ### Scalar

  Scalar is used for data type identification in your GraphQL Schema, something like `scalar.GraphqlString` is equals to `String` in GraphQL Schema, **Important** this scalar is fake because, it is only used for data type identification in GraphQL Schema, and this below is scalar type identification support which you can use.

  - **GraphqlString** 
  - **GraphqlNumber** 
  - **GraphqlFloat** 
  - **GraphqlBoolean** 
  - **GraphqlDate** 
  - **GraphqlObject** 
  - **GraphqlArray**
  - **GraphqlArrayObject** 
  - **GraphqlBuffer** 

- ### Configs
  
  Configs is used for global custome headers, for interation request between client and server.

  - **url**: is used for the address of the graphql server that will be used to interaction.
  - **origin**: is used for response header indicates whether the response can be shared with requesting code from the given origin, default value to `*`.
  - **method**: used for response header specifies one or more methods allowed when accessing a resource in response or request, default value to `POST`.
  - **allowedHeaders**: ise used for response header is used in response to a preflight request can be used during the actual request, default value to `Content-Type, Accept, Authorization`.
  - **exposedHeaders**: is used for response header allows a server to indicate which response headers should be made available, default value to `Content-Range, X-Content-Range`.
  - **credentials**: is used for response header tells http whether to expose the response to server.
  - **maxAge**: is used for response header indicates how long the results of a preflight request can be cached.
  - **auth**: is used for request header can be used to provide credentials that authenticate a user agent with a server.
  - **responseType**: is used representation header is used to indicate the original media type of the resource, default value to `Content: application/json and Accept: application/json`.
  - **cache**: is used HTTP header field holds directives in both requests and responses, that control caching.
  - **compression**: is used for compress the message data without losing information about the origin media type.
  - **headers**: is used for interface of the Fetch API allows you to perform various actions on HTTP request and response headers.

## SiJago Methods

- ### Query(options: SiJagoOptions): Promise(SiJagoResponse) | Promise(Object)

  Query allow your get data from server-side, and it also returns an object based on the operation performed.

- ### Mutation(options: SiJagoOptions): Promise(SiJagoResponse) | Promise(Object)

  Mutation allow you to modify server side data, and it also returns an object based on the operation performed. It can be used to insert, update, or delete data.


## Example Usage

- ##### Before Usage Using SiJago With CommonJS Module

  ```javascript
  const fetch = require('node-fetch')

  (async function() {
    fetch('https://graphqlzero.almansi.me/api', {
      method: 'POST',
      body: JSON.strgify({
        query:`
            albums(options: { sort: { order: DESC } }) {
            data {
              id
              title
              user {
                name
                email
              }
              photos {
                data {
                  title
                  url
                }
              }
            }
          }
        `
      })
     })
  })()
  ```

- ##### After Usage Using SiJago With CommonJS Module

  ```javascript
  const { sijago } = require('sijago')

  (async function() {
    const { res } = await sijago.query({
      url: 'https://graphqlzero.almansi.me/api',
      input: { options: { sort: { order: 'DESC' } } },
      body: {
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
  })()
  
  /** Example response usage if you use sijago graphql client
  {
    data: { albums: { data: [Array] } },
    error: undefined,
    url: 'https://graphqlzero.almansi.me/api',
    status: 200,
    statusText: 'OK',
    headers: Headers {
      [Symbol(map)]: [Object: null prototype] {
        'content-type': [Array],
        'transfer-encoding': [Array],
        connection: [Array],
        'access-control-allow-credentials': [Array],
        date: [Array],
        'access-control-allow-origin': [Array],
        'x-vercel-cache': [Array],
        server: [Array],
        'x-vercel-id': [Array],
        'strict-transport-security': [Array],
        'cache-control': [Array],
        'content-encoding': [Array]
      }
    }
  }
  */
  ```
  
- ##### Before Usage Using SiJago With ESM Module

  ```javascript
  import fetch from 'node-fetch'

  (async function() {
    fetch('https://graphqlzero.almansi.me/api', {
      method: 'POST',
      body: JSON.strgify({
        query:`
            albums(options: { sort: { order: DESC } }) {
            data {
              id
              title
              user {
                name
                email
              }
              photos {
                data {
                  title
                  url
                }
              }
            }
          }
        `
      })
     })
  })()
  ```

- ##### After Usage Using SiJago With ESM Module

  ```javascript
  import { sijago } from 'sijago'

  (async function() {
    const { res } = await sijago.query({
      url: 'https://graphqlzero.almansi.me/api',
      input: { options: { sort: { order: 'DESC' } } },
      body: {
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
  })()
  
  /** Example response usage if you use sijago graphql client
  {
    data: { albums: { data: [Array] } },
    error: undefined,
    url: 'https://graphqlzero.almansi.me/api',
    status: 200,
    statusText: 'OK',
    headers: Headers {
      [Symbol(map)]: [Object: null prototype] {
        'content-type': [Array],
        'transfer-encoding': [Array],
        connection: [Array],
        'access-control-allow-credentials': [Array],
        date: [Array],
        'access-control-allow-origin': [Array],
        'x-vercel-cache': [Array],
        server: [Array],
        'x-vercel-id': [Array],
        'strict-transport-security': [Array],
        'cache-control': [Array],
        'content-encoding': [Array]
      }
    }
  }
  */
  ```

- ##### Example Usage Using SiJago With Local Headers

  ```javascript
  import { sijago } from 'sijago'

  (async function() {
    const { res } = await sijago.query({
      url: 'https://graphqlzero.almansi.me/api',
      input: { options: { sort: { order: 'DESC' } } },
      body: {
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
        },
        headers: {
           origin: 'graphqlzero.almansi.me',
           methods: ['POST', 'GET', 'PUT', 'DELETE', 'HEAD', 'OPTIONS']
        }
      }
    })
  })()
  
  /** Example response usage if you use sijago graphql client
    {
      data: { albums: { data: [Array] } },
      error: undefined,
      url: 'https://graphqlzero.almansi.me/api',
      status: 200,
      statusText: 'OK',
      headers: Headers {
        [Symbol(map)]: [Object: null prototype] {
          'content-type': [Array],
          'transfer-encoding': [Array],
          connection: [Array],
          'access-control-allow-credentials': [Array],
          date: [Array],
          'access-control-allow-origin': [Array],
          'x-vercel-cache': [Array],
          server: [Array],
          'x-vercel-id': [Array],
          'strict-transport-security': [Array],
          'cache-control': [Array],
          'content-encoding': [Array]
        }
      }
    }
  */
  ```

- ##### Example Usage Using SiJago With Global Headers

  ```javascript
  import { sijago } from 'sijago'

  sijago.configs = {
    url: 'https://graphqlzero.almansi.me/api',
    origin: 'graphqlzero.almansi.me',
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'HEAD', 'OPTIONS']
  }

  (async function() {
    const { res } = await sijago.query({
      input: { options: { sort: { order: 'DESC' } } },
      body: {
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
  })()
  /** Example response usage if you use sijago graphql client
    {
      data: { albums: { data: [Array] } },
      error: undefined,
      url: 'https://graphqlzero.almansi.me/api',
      status: 200,
      statusText: 'OK',
      headers: Headers {
        [Symbol(map)]: [Object: null prototype] {
          'content-type': [Array],
          'transfer-encoding': [Array],
          connection: [Array],
          'access-control-allow-credentials': [Array],
          date: [Array],
          'access-control-allow-origin': [Array],
          'x-vercel-cache': [Array],
          server: [Array],
          'x-vercel-id': [Array],
          'strict-transport-security': [Array],
          'cache-control': [Array],
          'content-encoding': [Array]
        }
      }
    }
  */
  ```

- ##### Example Usage Using SiJago With Global Custome Headers

  ```javascript
  import { sijago } from 'sijago'

  sijago.configs.headers.set('Content-Type', 'application/graphql')
  sijago.configs.headers.set('Accept', 'application/graphql')

  (async function() {
    const { res } = await sijago.query({
      input: { options: { sort: { order: 'DESC' } } },
      body: {
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
  })()
  /** Example response usage if you use sijago graphql client
    {
      data: { albums: { data: [Array] } },
      error: undefined,
      url: 'https://graphqlzero.almansi.me/api',
      status: 200,
      statusText: 'OK',
      headers: Headers {
        [Symbol(map)]: [Object: null prototype] {
          'content-type': [Array],
          'transfer-encoding': [Array],
          connection: [Array],
          'access-control-allow-credentials': [Array],
          date: [Array],
          'access-control-allow-origin': [Array],
          'x-vercel-cache': [Array],
          server: [Array],
          'x-vercel-id': [Array],
          'strict-transport-security': [Array],
          'cache-control': [Array],
          'content-encoding': [Array]
        }
      }
    }
  */
  ```

## Testing

- Testing Via Local

  ```sh
  npm test or make test
  ```

- Testing Via Local And Build

  ```sh
  make build
  ```

- Testing Via Docker

  ```sh
  docker build -t sijago or make dkb tag=sijago
  ```

## Bugs

For information on bugs related to package libraries, please visit [here](https://github.com/restuwahyu13/sijagoissues)

## Contributing

Want to make **sijago** more perfect ? Let's contribute and follow the [contribution guide.](https://github.com/restuwahyu13/sijago/blob/main/CONTRIBUTING.md)

## License

- [MIT License](https://github.com/restuwahyu13/sijago/blob/main/LICENSE.md)

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2rem;">
  <b><a href="#sijago-graphql-client">BACK TO TOP</a></b>
</p>