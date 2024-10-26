import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URI
})

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers:{
            accesstoken: Cookies.get('accessToken'),
            refreshtoken : Cookies.get('refreshToken')
        }
    });
    return forward(operation)
})

export const gqlClient = new ApolloClient({
    // uri: process.env.NEXT_PUBLIC_SERVER_URI,
    link: authMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
})
