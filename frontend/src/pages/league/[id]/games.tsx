import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MatchWidgetGrid } from '../../../components/Match/MatchWidgetGrid'
import { PageWrapper } from '../../../components/PageWrapper'
import { Spacer } from '../../../components/Spacer'
import { useLeagueByIdQuery } from '../../../generated/graphql'

const LeagueHeader = styled.header`
	padding-top: 80px;

	@media only screen and (max-width: 770px) {
		padding-top: 20px;
	}
`

const LeagueSubtitle = styled.h2`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 700;
	font-size: 20px;
	text-transform: uppercase;
	color: #6f6f6f;

	@media only screen and (max-width: 770px) {
		font-size: 15px;
	}
`

const LeagueTitle = styled.h1`
	margin-top: -10px;
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 700;
	font-size: 40px;
	text-transform: uppercase;
	color: #000000;

	@media only screen and (max-width: 770px) {
		font-size: 30px;
		margin: 0;
	}
`

const LeagueGames: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { loading, data } = useLeagueByIdQuery({
		variables: {
			id: id as string,
		},
	})

	return (
		<div>
			{loading || !data ? (
				<span>loading...</span>
			) : (
				<PageWrapper title={`${data.findById.title} | Meccsek | Waterpolo`}>
					<LeagueHeader>
						<LeagueSubtitle>{data.findById.organiser}</LeagueSubtitle>
						<LeagueTitle>{data.findById.title}</LeagueTitle>
					</LeagueHeader>
					<Spacer />
					<MatchWidgetGrid matches={data.findById.matches} />
				</PageWrapper>
			)}
		</div>
	)
}

export default LeagueGames
