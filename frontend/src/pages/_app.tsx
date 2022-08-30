import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { usePanelbear } from '@panelbear/panelbear-nextjs'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	usePanelbear('FBdv2Hw7OOx')

	const client = new ApolloClient({
		uri: process.env.API_URL || 'http://localhost:4000/graphql',
		cache: new InMemoryCache(),
	})

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
