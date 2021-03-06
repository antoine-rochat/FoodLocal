import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { Client, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Theme from './components/Theme';

import AuthProvider from './components/providers/AuthProvider';

import './index.css';

import 'leaflet/dist/leaflet.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: 'https://api.foodlocal.ch/graphql',
});

// Create a WebSocket link: Pour les sessions mais ça fonctionne pas
const wsLink = new WebSocketLink({
  uri: `wss://api.foodlocal.ch/subscriptions`,
  options: {
    reconnect: true
  }
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return (token ? {
    headers: {
      ...headers,
      "token": token,
    }
  } : {
      headers: {
        ...headers,
      }
    });
});


const client = new ApolloClient({
  defaultOptions,
  link: authLink.concat(httpLink).split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink
    ),
  cache: new InMemoryCache(), // No cash caus no update of it
});

/*
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink({
  uri: 'https://api.foodlocal.ch/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-token": token ? token : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  defaultOptions,
  cache: new InMemoryCache()
});
*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <MuiThemeProvider theme={Theme}>
          <AuthProvider>
            <App />
          </AuthProvider>
      </MuiThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
