import {
  ApolloClient
} from 'apollo-client'
import {
  ApolloLink,
  split
} from 'apollo-link'
import {
  InMemoryCache
} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'

import { getMainDefinition } from 'apollo-utilities'
// import { LocalStorage } from 'quasar'
const adminkey = 'CicaazFQDaN9HaqMO9YQXMzWAz3JCY7H2N9RlmNeUJ2Jr5eReKV7o9YLIJZpywcd'
// const token = LocalStorage.getItem('ugAccessToken') // token dari keycloak login
const httpLink = createHttpLink({
  uri: 'https://wms-dev.hasura.app/v1/graphql',
  fetch: fetch
})
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  operation.setContext({
    headers: {
      'x-hasura-access-key': adminkey
      // Authorization: 'bearer ' + token
    }
  })

  return forward(operation)
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'wss:/wms-dev.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-access-key': adminkey
        // Authorization: 'bearer ' + token
      }
    }
  }
})
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({
    query
  }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authMiddleware.concat(httpLink)
)

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
// Create the apollo client
export const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  connectToDevTools: true
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler({
    graphQLErrors,
    networkError
  }) {
    if (graphQLErrors) {
      graphQLErrors.map(({
        message,
        locations,
        path
      }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
})

export default ({
  app,
  Vue
}) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
