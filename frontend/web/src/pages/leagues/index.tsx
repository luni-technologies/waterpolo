import type { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import { Loading } from '../../components/Loading'
import { PageWrapper } from '../../components/PageWrapper'
import { useLeagueAllQuery } from '../../generated/graphql'

const LeaguesListWrapper = styled.ul`
	list-style-type: none;
	margin: 0;
	margin-top: 50px;
	padding: 0;

	@media only screen and (max-width: 770px) {
		margin-top: 60px;
	}
`

const LeaguesListTitle = styled.h3`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	font-weight: 700;
	text-transform: uppercase;
	margin-right: 10px;
	margin-bottom: 15px;
`

const LeaguesListItem = styled.li`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 400;
	font-size: 17px;
	text-transform: uppercase;

	&:not(:last-child) {
		margin-bottom: 5px;
	}

	& a {
		color: #000000;
		text-decoration: none;
	}

	& a:hover {
		color: #ffffff;
		background-color: #000000;
	}

	@media only screen and (max-width: 770px) {
		font-size: 15px;
	}
`

const Leagues: NextPage = () => {
	const { loading, data } = useLeagueAllQuery()

	return (
		<PageWrapper title="Bajnokságok | Waterpolo">
			{loading || !data ? (
				<Loading />
			) : (
				<LeaguesListWrapper>
					<LeaguesListTitle>bajnokságok</LeaguesListTitle>
					{data.all.mens.map((x) => (
						<LeaguesListItem key={x.id}>
							<Link href={`/league/${x.id}`} passHref>
								<a>{x.title}</a>
							</Link>
						</LeaguesListItem>
					))}
				</LeaguesListWrapper>
			)}
		</PageWrapper>
	)
}

export default Leagues
