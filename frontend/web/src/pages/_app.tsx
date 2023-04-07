import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { usePanelbear } from '@panelbear/panelbear-nextjs'
import moment from 'moment'
import type { AppProps } from 'next/app'

import 'moment/locale/hu'

function MyApp({ Component, pageProps }: AppProps) {
	usePanelbear('FBdv2Hw7OOx')

	moment.locale('hu')

	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
		cache: new InMemoryCache(),
		credentials: 'include',
	})

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
