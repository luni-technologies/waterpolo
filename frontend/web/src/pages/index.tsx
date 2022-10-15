import moment from 'moment'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { MatchWidgetGrid } from '../components/Match/MatchWidgetGrid'
import { PageWrapper } from '../components/PageWrapper'
import { useMatchesOnDateQuery } from '../generated/graphql'

import 'moment/locale/hu'
import { useState } from 'react'

const DateSelectorWrapper = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	max-width: 100%;
	height: 60px;
	background-color: #ffffff;
	border-top: 2px solid #000000;
	padding: 0 20px;
`

const DateSelectorList = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	overflow-x: scroll;
	white-space: nowrap;
	height: 100%;

	scrollbar-width: none;
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
`

const DateSelectorDate = styled.span<{ active: boolean }>`
	display: inline-block;
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	font-weight: 700;
	text-transform: uppercase;
	color: ${(props) => (props.active ? `#ffffff` : `#000000`)};
	background-color: ${(props) => (props.active ? `#000000` : `#ffffff`)};
	padding: 5px;

	&:hover {
		cursor: pointer;
	}

	&:not(:last-child) {
		margin-right: 10px;
	}
`

const MatchWidgetGridWrapper = styled.div`
	padding-bottom: 60px;
`

const NoGamesText = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 20px;
	font-weight: 700;
	text-transform: uppercase;
`

const Home: NextPage = () => {
	let [date, setDate] = useState<moment.Moment>(moment().startOf('day'))
	const { loading, data } = useMatchesOnDateQuery({
		variables: {
			date: date.toDate(),
		},
	})

	return (
		<PageWrapper
			title={`${moment(data?.matchesOnDate.date).format(
				'YYYY/MM/DD'
			)} | Meccsek | Waterpolo`}
		>
			<DateSelectorWrapper>
				<DateSelectorList>
					{[...Array(14)].map((_, i) => {
						let dateOfIndex = moment().startOf('day').add(i, 'days')
						let isActive = date.isSame(dateOfIndex)
						if (i === 0) {
							return (
								<DateSelectorDate
									active={isActive}
									key={i}
									onClick={() => setDate(dateOfIndex)}
								>
									Ma
								</DateSelectorDate>
							)
						} else if (i === 1) {
							return (
								<DateSelectorDate
									active={isActive}
									key={i}
									onClick={() => setDate(dateOfIndex)}
								>
									Holnap
								</DateSelectorDate>
							)
						} else {
							return (
								<DateSelectorDate
									active={isActive}
									key={i}
									onClick={() => setDate(dateOfIndex)}
								>
									{dateOfIndex.format('dddd, MMMM D')}
								</DateSelectorDate>
							)
						}
					})}
				</DateSelectorList>
			</DateSelectorWrapper>
			{loading || !data ? (
				<span>loading...</span>
			) : (
				<MatchWidgetGridWrapper>
					{data.matchesOnDate.leagues.length > 0 ? (
						data.matchesOnDate.leagues.map((x) => (
							<MatchWidgetGrid key={x.id} title={x.title} matches={x.matches} />
						))
					) : (
						<NoGamesText>nincsenek meccsek</NoGamesText>
					)}
				</MatchWidgetGridWrapper>
			)}
		</PageWrapper>
	)
}

export default Home
