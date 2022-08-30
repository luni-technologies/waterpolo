import moment from 'moment'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MatchWidgetRow } from '../../../components/Match/MatchWidgetRow'
import { PageWrapper } from '../../../components/PageWrapper'
import { TableWidgetWrapper } from '../../../components/Table/TableWidgetWrapper'
import { useLeagueByIdQuery } from '../../../generated/graphql'

const LeagueHeader = styled.header`
	padding-top: 80px;
`

const LeagueSubtitle = styled.h2`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 700;
	font-size: 20px;
	text-transform: uppercase;
	color: #6f6f6f;
`

const LeagueTitle = styled.h1`
	margin-top: -10px;
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 700;
	font-size: 40px;
	text-transform: uppercase;
	color: #000000;
`

const League: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { loading, data } = useLeagueByIdQuery({
		variables: {
			id: id as string,
		},
	})

	const latestResults =
		loading || !data
			? []
			: data.findById.matches.filter((x) => moment(x.date).isBefore()).slice(-3)

	const upcomingMatches =
		loading || !data
			? []
			: data.findById.matches
					.filter((x) => moment(x.date).isAfter())
					.splice(0, 3)

	return (
		<div>
			{loading || !data ? (
				<span>loading...</span>
			) : (
				<PageWrapper title={`${data.findById.title} | Waterpolo`}>
					<LeagueHeader>
						<LeagueSubtitle>{data.findById.organiser}</LeagueSubtitle>
						<LeagueTitle>{data.findById.title}</LeagueTitle>
					</LeagueHeader>
					<MatchWidgetRow
						title="Legfrissebb eredmények"
						matches={latestResults}
						leagueId={id as string}
					/>
					<MatchWidgetRow
						title="Következő meccsek"
						matches={upcomingMatches}
						leagueId={id as string}
					/>
					<TableWidgetWrapper tables={data.findById.tables} />
				</PageWrapper>
			)}
		</div>
	)
}

export default League
