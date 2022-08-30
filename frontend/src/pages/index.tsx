import moment from 'moment'
import type { NextPage } from 'next'
import { MatchWidgetGrid } from '../components/Match/MatchWidgetGrid'
import { PageWrapper } from '../components/PageWrapper'
import { useMatchesOnDateQuery } from '../generated/graphql'

const Home: NextPage = () => {
	const currentDate = moment().startOf('day').toDate()
	const { loading, data } = useMatchesOnDateQuery({
		variables: {
			date: currentDate,
		},
	})

	return (
		<div>
			{loading || !data ? (
				<span>loading...</span>
			) : (
				<PageWrapper
					title={`${moment(data.matchesOnDate.date).format(
						'YYYY/MM/DD'
					)} | Meccsek | Waterpolo`}
				>
					{data.matchesOnDate.leagues.map((x) => (
						<MatchWidgetGrid key={x.id} title={x.title} matches={x.matches} />
					))}
				</PageWrapper>
			)}
		</div>
	)
}

export default Home
