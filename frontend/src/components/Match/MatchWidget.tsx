import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { MatchMin } from '../../generated/graphql'

const MatchWidgetWrapper = styled.a<{ grid?: boolean }>`
	display: block;
	height: 120px;
	width: ${(props) => (props.grid ? '100%' : 'calc(100% / 3 - 20px)')};
	border: 2px solid #000000;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	text-decoration: none;

	@media only screen and (max-width: 770px) {
		min-width: calc(100vw - 90px);
	}
`

const MatchWidgetTeam = styled.a<{ align: 'left' | 'right' }>`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 14px;
	color: #000000;
	text-transform: uppercase;
	width: 30%;
	text-align: ${(props) => props.align};
`

const MatchWidgetCenterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`

const MatchWidgetMain = styled.span`
	font-family: 'Oswald', sans-serif;
	font-size: 30px;
	line-height: 30px;
	color: #000000;
	text-transform: uppercase;
`

const MatchWidgetSub = styled.span`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 18px;
	line-height: 18px;
	color: #6f6f6f;
`

interface MatchWidgetProps {
	match: MatchMin
	grid?: boolean
}

export const MatchWidget: React.FC<MatchWidgetProps> = ({ match, grid }) => {
	const isUpcoming = moment(match.date).isValid()
		? moment(match.date).isAfter()
		: true

	return (
		<Link href={isUpcoming ? '' : `/game/${match.id}`} passHref>
			<MatchWidgetWrapper grid={grid}>
				<MatchWidgetTeam align="left">{match.team_home}</MatchWidgetTeam>
				<MatchWidgetCenterWrapper>
					<MatchWidgetMain>
						{isUpcoming
							? moment(match.date).isValid()
								? moment(match.date).format('MMM DD')
								: 'TBD'
							: `${match.score_home}-${match.score_away}`}
					</MatchWidgetMain>
					<MatchWidgetSub>
						{isUpcoming
							? moment(match.date).isValid()
								? moment(match.date).format('HH:mm')
								: 'TBD'
							: moment(match.date).isValid()
							? moment(match.date).format('MMM DD HH:mm')
							: 'TBD'}
					</MatchWidgetSub>
				</MatchWidgetCenterWrapper>
				<MatchWidgetTeam align="right">{match.team_away}</MatchWidgetTeam>
			</MatchWidgetWrapper>
		</Link>
	)
}
