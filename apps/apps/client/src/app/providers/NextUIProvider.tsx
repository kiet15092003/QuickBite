'use client'

import { ApolloProvider } from '@apollo/client'
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from 'next-themes'
import { gqlClient } from '../../core/graphql/gql.setup'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={gqlClient}>
      <NextUIProvider>
        {/* <NextThemesProvider attribute='class' defaultTheme='dark'> */}
          {children}
        {/* </NextThemesProvider> */}
      </NextUIProvider>
    </ApolloProvider>
  )
}