import type { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { PageWrapper } from '../../components/PageWrapper'
import { useSearchLazyQuery } from '../../generated/graphql'

const SearchWrapper = styled.div`
	width: 100%;
	margin-top: 25vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const SearchInput = styled.input`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 400;
	font-size: 16px;
	color: #000000;
	border: 2px solid #000000;
	max-width: 400px;
	padding: 5px 20px;
	margin-bottom: 50px;

	&::placeholder {
		text-transform: uppercase;
		font-size: 12px;
	}

	&:focus {
		outline: none;
	}
`

const SearchResultsWrapper = styled.div``

const SearchResultsTitle = styled.h3`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 700;
	font-size: 12px;
	color: #000000;
	text-transform: uppercase;
	margin-bottom: 10px;
`

const SearchResultsList = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	width: 70vw;
`

const SearchResultsListItem = styled.li`
	margin: 0;
	padding: 0;
`

const SearchResultsListItemLink = styled.a`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 400;
	font-size: 16px;
	color: #000000;
	text-transform: uppercase;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`

const Search: NextPage = () => {
	const [query, setQuery] = useState<string>('')
	const [search, { loading, data }] = useSearchLazyQuery()

	const onChange = useCallback(
		(event) => {
			const query = event.target.value
			setQuery(query)
			if (query.length) {
				setTimeout(() => {
					search({ variables: { query: query } })
				}, 200)
			}
		},
		[search]
	)

	return (
		<PageWrapper title={`Keresés erre: "${query}" | Waterpolo`}>
			<SearchWrapper>
				<SearchInput
					type={'text'}
					onChange={onChange}
					placeholder={'keresés'}
					value={query}
				/>
				{!loading && data && (
					<SearchResultsWrapper>
						<SearchResultsTitle>bajnokságok</SearchResultsTitle>
						<SearchResultsList>
							{data.search.leagues.map((x) => (
								<SearchResultsListItem key={x.id}>
									<Link href={`/league/${x.id}`} passHref>
										<SearchResultsListItemLink>
											{x.title}
										</SearchResultsListItemLink>
									</Link>
								</SearchResultsListItem>
							))}
						</SearchResultsList>
					</SearchResultsWrapper>
				)}
			</SearchWrapper>
		</PageWrapper>
	)
}

export default Search
