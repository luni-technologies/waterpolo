import moment from 'moment'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Loading } from '../../components/Loading'
import { PageWrapper } from '../../components/PageWrapper'
import { Spacer } from '../../components/Spacer'
import { useMatchByIdQuery } from '../../generated/graphql'
import { createCalendarEvent } from '../../utils/createCalendarEvent'

const GameSectionTitle = styled.h3`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 20px;
	width: 100%;
	text-align: center;
`

const GameHeader = styled.header`
	padding-top: 80px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		padding-top: 60px;
	}
`

const GameHeaderTeam = styled.h2`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 700;
	font-size: 40px;
	text-transform: uppercase;
	color: #000000;
	width: 35%;

	&:not(:first-child) {
		text-align: right;
	}

	@media only screen and (max-width: 768px) {
		text-align: center !important;
		width: 100%;
		font-size: 30px;
	}
`

const GameHeaderScoreWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	@media only screen and (max-width: 768px) {
		margin: 20px 0;
	}
`

const GameHeaderScore = styled.h3`
	font-family: 'Oswald', sans-serif;
	font-weight: 700;
	font-size: 50px;
	text-transform: uppercase;
	color: #000000;

	@media only screen and (max-width: 768px) {
		font-size: 35px;
	}
`

const GameHeaderScoreQuarter = styled.span`
	font-family: 'Oswald', sans-serif;
	font-weight: 400;
	font-size: 20px;
	text-transform: uppercase;
	color: #6f6f6f;

	@media only screen and (max-width: 768px) {
		font-size: 15px;
	}
`

const GameColumnsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		flex-flow: column-reverse;
	}
`

const GameColumn = styled.div`
	display: flex;
	flex-direction: column;

	&:nth-child(1) {
		margin-right: 30px;
		width: 75%;
	}

	&:nth-child(2) {
		width: 25%;
	}

	@media only screen and (max-width: 768px) {
		width: 100% !important;
		margin: 0 !important;
	}
`

const GameScorersWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const GameScorersRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`

const GameScorers = styled.p`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 400;
	font-size: 400;
	color: #000000;
	width: 35%;

	text-align: right;
	&:not(:first-child) {
		text-align: left;
	}
`

const GameTimelineWrapper = styled.div``

const GameTimelineList = styled.ul`
	list-style-type: none;
	width: 100%;
	padding: 0;
`

const GameTimelineListItem = styled.li`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	&:not(:last-child) {
		margin-bottom: 20px;
	}
`

const GameTimelineListItemText = styled.span<{ bold: boolean }>`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 14px;
	font-weight: ${(props) => (props.bold ? 700 : 400)};
	text-transform: ${(props) => (props.bold ? `uppercase` : `none`)};
	width: 50%;

	text-align: right;
	padding-right: 20px;
	&:not(:first-child) {
		text-align: left;
		padding-left: 20px;
	}
`

const GameTimelineListItemBold = styled.span`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 13px;
	font-weight: 700;
	width: 100%;
	text-align: center;
	margin: 20px 0;
	text-transform: uppercase;
`

const GameTimelineListItemTime = styled.span`
	font-family: 'Oswald', sans-serif;
	font-weight: 400;
`

const GameLineupWrapper = styled.div``

const GameLineupTableWrapper = styled.div`
	width: 100%;
	font-family: 'Roboto Condensed', sans-serif;
	border: 2px solid #000000;

	&:not(:last-child) {
		margin-bottom: 10px;
	}
`

const GameLineupTableTitle = styled.h4`
	text-transform: uppercase;
	text-align: left;
	width: 100%;
	border-bottom: 2px solid #000000;
	padding-left: 5%;
`

const GameLineupTableCoach = styled.h5`
	margin: 0;
	text-align: left;
	width: 100%;
	border-bottom: 2px solid #000000;
	font-weight: 400;
	font-size: 14px;
	padding-left: 5%;
`

const GameLineupTable = styled.table`
	width: 100%;
`

const GameLineupTableRow = styled.tr<{ highlight?: boolean }>`
	background-color: ${(props) => (props.highlight ? '#000000' : 'none')};

	& > td {
		color: ${(props) => (props.highlight ? '#ffffff' : '#000000')};
	}
`

const GameLineupTableDataName = styled.td`
	padding-left: 5px;
	font-size: 16px;
`

const GameLineupTableDataNumber = styled.td`
	width: 5%;
	text-align: center;
	font-family: 'Oswald', sans-serif;
	font-size: 13px;
	padding: 0 5px 0 5px;
`

const GameMVPWrapper = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const GameMVPName = styled.span`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 16px;
	font-weight: 700;
	text-transform: uppercase;
`

const GameMVPScore = styled.span`
	font-family: 'Oswald', sans-serif;
	font-size: 14px;
`

const GameInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const GameInfoData = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&:not(:last-child) {
		margin-bottom: 20px;
	}
`

const GameInfoDataTitle = styled.h6`
	margin: 0;
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 13px;
	text-transform: uppercase;
	font-weight: 700;
`

const GameInfoDataLink = styled.a`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 13px;
	text-transform: uppercase;
	font-weight: 700;

	&:hover {
		cursor: pointer;
		color: #ffffff;
		background-color: #000000;
	}
`

const GameInfoDataValue = styled.p`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 13px;
`

const Game: NextPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { loading, data } = useMatchByIdQuery({
		variables: {
			id: id as string,
		},
		pollInterval: 2000,
	})

	const crucialEvents = ['gól', 'labdaelhozás', 'büntetődobás', 'vége']
	const eventsFiltered =
		loading || !data
			? []
			: data.matchById.events.filter((x) =>
					crucialEvents.some(
						(y) =>
							x.eventType.toLowerCase().includes(y) &&
							!x.eventType.toLowerCase().includes('gólpassz')
					)
			  )

	return (
		<PageWrapper
			title={`${data?.matchById.team_home || 'Betöltés...'} v ${
				data?.matchById.team_away || 'Betöltés...'
			} | Waterpolo`}
		>
			{loading || !data ? (
				<Loading />
			) : (
				<>
					<GameHeader>
						<GameHeaderTeam>{data.matchById.team_home}</GameHeaderTeam>
						<GameHeaderScoreWrapper>
							<GameHeaderScore>
								{data.matchById.score_home} - {data.matchById.score_away}
							</GameHeaderScore>
							<GameHeaderScoreQuarter>
								{data.matchById.quarters
									.map((x) => `${x.score_home}-${x.score_away}`)
									.join(', ')}
							</GameHeaderScoreQuarter>
						</GameHeaderScoreWrapper>
						<GameHeaderTeam>{data.matchById.team_away}</GameHeaderTeam>
					</GameHeader>
					<Spacer />
					<GameColumnsWrapper>
						<GameColumn>
							{(data.matchById.goalscorers_home.length > 0 ||
								data.matchById.goalscorers_away.length > 0) && (
								<GameScorersWrapper>
									<GameSectionTitle>Góllövők</GameSectionTitle>
									<GameScorersRow>
										<GameScorers>
											{data.matchById.goalscorers_home
												.map((x) => `${x.name} ${x.amount}x`)
												.join(', ')}
										</GameScorers>
										<GameScorers>
											{data.matchById.goalscorers_away
												.map((x) => `${x.name} ${x.amount}x`)
												.join(', ')}
										</GameScorers>
									</GameScorersRow>
								</GameScorersWrapper>
							)}
							{eventsFiltered.length > 0 && (
								<>
									<Spacer />
									<GameTimelineWrapper>
										<GameSectionTitle>Idővonal</GameSectionTitle>
										<GameTimelineList>
											{eventsFiltered.map((x, i) => {
												if (x.eventType.toLowerCase().includes('vége')) {
													return (
														<GameTimelineListItem>
															<GameTimelineListItemBold>
																{x.time.quarter} negyed vége
															</GameTimelineListItemBold>
														</GameTimelineListItem>
													)
												} else {
													return (
														<GameTimelineListItem key={i}>
															<GameTimelineListItemText
																bold={x.team === data.matchById.team_home}
															>
																{x.team === data.matchById.team_home
																	? x.player.name
																	: x.eventType}
															</GameTimelineListItemText>
															<GameTimelineListItemTime>
																{moment
																	.utc(x.time.seconds * 1000)
																	.format('mm:ss')}
															</GameTimelineListItemTime>
															<GameTimelineListItemText
																bold={x.team === data.matchById.team_away}
															>
																{x.team === data.matchById.team_away
																	? x.player.name
																	: x.eventType}
															</GameTimelineListItemText>
														</GameTimelineListItem>
													)
												}
											})}
										</GameTimelineList>
									</GameTimelineWrapper>
								</>
							)}
						</GameColumn>
						<GameColumn>
							{data.matchById.lineup_home.length > 0 &&
								data.matchById.lineup_away.length > 0 && (
									<>
										<GameLineupWrapper>
											<GameSectionTitle>Játékosok</GameSectionTitle>
											<GameLineupTableWrapper>
												<GameLineupTableTitle>
													{data.matchById.team_home}
												</GameLineupTableTitle>
												{data.matchById.coaches_home.length > 0 && (
													<GameLineupTableCoach>
														{data.matchById.coaches_home
															.map((x) => x.name)
															.join(', ')}
													</GameLineupTableCoach>
												)}
												<GameLineupTable>
													<tbody>
														{data.matchById.lineup_home.map((x, i) => (
															<GameLineupTableRow key={i} highlight={x.isGK}>
																<GameLineupTableDataNumber>
																	{x.number}
																</GameLineupTableDataNumber>
																<GameLineupTableDataName>
																	{x.name}
																</GameLineupTableDataName>
																<GameLineupTableDataNumber>
																	{(
																		data.matchById.playerScores.find(
																			(y) =>
																				y.player.name === x.name &&
																				y.player.number === x.number
																		)?.score || 0
																	).toFixed(2)}
																</GameLineupTableDataNumber>
															</GameLineupTableRow>
														))}
													</tbody>
												</GameLineupTable>
											</GameLineupTableWrapper>
											<GameLineupTableWrapper>
												<GameLineupTableTitle>
													{data.matchById.team_away}
												</GameLineupTableTitle>
												{data.matchById.coaches_away.length > 0 && (
													<GameLineupTableCoach>
														{data.matchById.coaches_away
															.map((x) => x.name)
															.join(', ')}
													</GameLineupTableCoach>
												)}
												<GameLineupTable>
													<tbody>
														{data.matchById.lineup_away.map((x, i) => (
															<GameLineupTableRow key={i} highlight={x.isGK}>
																<GameLineupTableDataNumber>
																	{x.number}
																</GameLineupTableDataNumber>
																<GameLineupTableDataName>
																	{x.name}
																</GameLineupTableDataName>
																<GameLineupTableDataNumber>
																	{(
																		data.matchById.playerScores.find(
																			(y) =>
																				y.player.name === x.name &&
																				y.player.number === x.number
																		)?.score || 0
																	).toFixed(2)}
																</GameLineupTableDataNumber>
															</GameLineupTableRow>
														))}
													</tbody>
												</GameLineupTable>
											</GameLineupTableWrapper>
										</GameLineupWrapper>
										<Spacer />
									</>
								)}
							{data.matchById.events.at(-1)?.eventType === 'Vége' &&
								data.matchById.events.at(-1)?.time.quarter === 'IV.' && (
									<>
										<GameMVPWrapper>
											<GameSectionTitle>A meccs embere</GameSectionTitle>
											<GameMVPName>
												{
													[...data.matchById.playerScores].sort(
														(a, b) => b.score - a.score
													)[0].player.name
												}
											</GameMVPName>
											<GameMVPScore>
												{[...data.matchById.playerScores]
													.sort((a, b) => b.score - a.score)[0]
													.score.toFixed(2)}
											</GameMVPScore>
										</GameMVPWrapper>
										<Spacer />
									</>
								)}
							<GameInfoWrapper>
								<GameSectionTitle>adatok</GameSectionTitle>
								<GameInfoData>
									<GameInfoDataTitle>helyszín</GameInfoDataTitle>
									<GameInfoDataValue>
										{data.matchById.location ?? '?'}
									</GameInfoDataValue>
								</GameInfoData>
								<GameInfoData>
									<GameInfoDataTitle>dátum</GameInfoDataTitle>
									<GameInfoDataValue>
										{moment(data.matchById.date).isValid()
											? moment(data.matchById.date).format('llll')
											: '?'}
									</GameInfoDataValue>
								</GameInfoData>
								<GameInfoData>
									<GameInfoDataTitle>bajonkság</GameInfoDataTitle>
									<GameInfoDataValue>{data.matchById.league}</GameInfoDataValue>
								</GameInfoData>
								<GameInfoData>
									<GameInfoDataTitle>bírók</GameInfoDataTitle>
									<GameInfoDataValue>
										{data.matchById.referees.map((x) => x.name).join(', ')}
									</GameInfoDataValue>
								</GameInfoData>
								<GameInfoData>
									<GameInfoDataLink
										onClick={() => {
											createCalendarEvent({
												title: `${data.matchById.team_home} - ${data.matchById.team_away}`,
												start: moment(data.matchById.date).toDate(),
												end: moment(data.matchById.date)
													.add(1, 'hours')
													.toDate(),
												location:
													data.matchById.location === null
														? undefined
														: data.matchById.location,
											}).download()
										}}
										style={{}}
									>
										naptárhoz adás
									</GameInfoDataLink>
								</GameInfoData>
							</GameInfoWrapper>
							<Spacer />
						</GameColumn>
					</GameColumnsWrapper>
				</>
			)}
		</PageWrapper>
	)
}

export default Game
