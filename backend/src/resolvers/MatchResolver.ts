import axios from 'axios'
import { load } from 'cheerio'
import moment from 'moment-timezone'
import { Arg, Query, Resolver } from 'type-graphql'
import { LeagueMid } from '../entities/League'
import { Match, MatchesOnDate } from '../entities/Match'
import { calculateScore, scoreData } from '../utils/calculateScore'
import { parseDate } from '../utils/parseDate'

/* https://www.tutorialspoint.com/group-array-by-equal-values-javascript */
function groupSimilar(arr: Array<any>): Array<any> {
	return arr.reduce(
		(acc, val) => {
			const { data, map } = acc
			const ind = map.get(val)
			if (map.has(val)) {
				data[ind][1]++
			} else {
				map.set(val, data.push([val, 1]) - 1)
			}
			return { data, map }
		},
		{
			data: [],
			map: new Map(),
		}
	).data
}

const statScoreTable: { type: string; value: number }[] = [
	{ type: 'Labdaelhozás', value: 0.3 },
	{ type: 'Labdaszerzés', value: 0.1 },
	{ type: 'Büntető hiba', value: -0.4 },
	{ type: 'Büntető róla', value: 0.2 },
	{ type: 'Büntetődobás - gól', value: 0.7 },
	{ type: 'Kivédett lövés', value: 0.1 },
	{ type: 'Centergól', value: 1 },
	{ type: 'Támadó hiba', value: -0.3 },
	{ type: 'Akciógól', value: 1 },
	{ type: 'Kiállítás 20mp centerből', value: -0.3 },
	{ type: 'Kiállítás róla', value: 0.1 },
	{ type: 'Kihagyott lövés előnyből', value: -0.2 },
	{ type: 'Kivédett lövés előnyből', value: -0.1 },
	{ type: 'Kivédett centerlövés', value: 0.2 },
	{ type: 'Blokk', value: 0.3 },
	{ type: 'Gól emberelőnyből', value: 1 },
	{ type: 'Büntetődobás - kivédve', value: -0.3 },
]

const gkStatScoreTable: { type: string; value: number }[] = [
	{ type: 'actionSave', value: 0.7 },
	{ type: 'actionGoal', value: -0.7 },
	{ type: 'centerSave', value: 0.7 },
	{ type: 'centerGoal', value: -0.7 },
	{ type: 'freeSave', value: 0.5 },
	{ type: 'freeGoal', value: -0.5 },
	{ type: 'penSave', value: 1 },
	{ type: 'penGoal', value: -0.5 },
	{ type: 'swimSave', value: 1 },
	{ type: 'swimGoal', value: -0.5 },
	{ type: 'disSave', value: 0.7 },
	{ type: 'disGoal', value: -0.7 },
	{ type: 'forSave', value: 0.5 },
	{ type: 'forGoal', value: -0.5 },
]

@Resolver()
export class MatchResolver {
	@Query(() => MatchesOnDate)
	async matchesOnDate(
		@Arg('date', () => Date, { validate: false }) date: Date
	): Promise<MatchesOnDate> {
		let parsedDate = moment.tz(date, 'Europe/Budapest').format('YYYY-MM-DD')
		const resp = await axios.get(
			`${process.env.PARSE_ROOT_DOMAIN}musor/${parsedDate}`
		)
		const $ = load(resp.data)

		const data: LeagueMid[] = []

		let loopLeague: string
		$('table.team_standings_table tbody tr:not(:first-child)').map((i, el) => {
			if ($(el).has('td.liga_fej').length === 1) {
				loopLeague = $(el).text().trim()
				data.push({
					id: i.toString(),
					title: loopLeague,
					matches: [],
				})
			} else {
				let match = {
					id: $(el).find('td').eq(0).text().trim(),
					date: parseDate($(el).find('td').eq(1).text().trim()),
					team_home: $(el).find('td').eq(2).text().trim(),
					team_away: $(el).find('td').eq(3).text().trim(),
					score_home: parseInt(
						$(el).find('td').eq(4).text().trim().split('(')[0].split('-')[0] ||
							'0'
					),
					score_away: parseInt(
						$(el).find('td').eq(4).text().trim().split('(')[0].split('-')[1] ||
							'0'
					),
					location: $(el).find('td').eq(5).text().trim(),
				}
				if (
					match.team_home !== '' &&
					match.team_away !== '' &&
					match.date &&
					match.date.getHours() !== 0
				) {
					data.find((x) => x.title === loopLeague)?.matches.push(match)
				}
			}
		})

		return {
			date,
			leagues: data.filter((x) => x.matches.length > 0),
		}
	}

	@Query(() => Match)
	async matchById(@Arg('id', () => String) id: string): Promise<Match> {
		const resp = await axios.get(`${process.env.PARSE_ROOT_DOMAIN}meccs/${id}`)
		const $ = load(resp.data)

		const data: Match = {
			id,
			team_home: $('table.meccs_tabla tr').eq(0).find('th').eq(0).text().trim(),
			team_away: $('table.meccs_tabla tr').eq(0).find('th').eq(2).text().trim(),
			score_home: parseInt($('td.meccs_eredmeny_hazai').text().trim() || '0'),
			score_away: parseInt($('td.meccs_eredmeny_vendeg').text().trim() || '0'),
			location:
				$('table.meccs_tabla tr')
					.eq(0)
					.find('th')
					.eq(1)
					.html()
					?.split('<br>')[0]
					.trim() || null,
			date: parseDate(
				$('table.meccs_tabla tr')
					.eq(0)
					.find('th')
					.eq(1)
					.html()
					?.split('<br>')[1]
					.trim()!
			),
			quarters: [],
			events: [],
			league: $('div.news_top_rounded').text().split('-')[1]?.trim() || '',
			lineup_home: [],
			lineup_away: [],
			goalscorers_home: [],
			goalscorers_away: [],
			playerScores: [],
			referees: [],
			coaches_home: [],
			coaches_away: [],
		}

		$('table.meccs_tabla > tbody > tr:last-child')
			.find('td[align="right"]')
			.eq(0)
			.html()!
			.split('<br>')
			.forEach((x) => {
				if (x === '') return
				let nameLower = x.trim().toLowerCase()
				let nameCap = nameLower
					.split(' ')
					.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
					.join(' ')
				data.coaches_home.push({ name: nameCap })
			})

		$('table.meccs_tabla > tbody > tr:last-child')
			.find('td[align="left"]')
			.eq(0)
			.html()!
			.split('<br>')
			.forEach((x) => {
				if (x === '') return
				let nameLower = x.trim().toLowerCase()
				let nameCap = nameLower
					.split(' ')
					.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
					.join(' ')
				data.coaches_away.push({ name: nameCap })
			})

		try {
			data.quarters = $('td.meccs_eredmeny_reszlet')
				.text()
				.trim()
				.replace(/[\(\)]/g, '')
				.split(',')
				.map((x) => ({
					score_home: parseInt(x.split('-')[0].trim()),
					score_away: parseInt(x.split('-')[1].trim()),
				}))
		} catch (e) {
			data.quarters = []
		}

		$('table.meccs_detail tr').map((_, x) => {
			if ($(x).find('td').eq(0).text() === 'Játékvezető') {
				data.referees.push({ name: $(x).find('td').eq(1).text().trim() })
			}
		})

		let gkPlayerScores: {
			name: string
			scores: scoreData[]
			team: 'home' | 'away'
		}[] = []
		$('table.meccs_jatekos').map((index, x) => {
			$(x)
				.html()
				?.split('\n')
				.map((x) => x.trim())
				.join('')
				.split('<tr style="height: 12px;"></tr>')
				.forEach((playerTable) => {
					let t$ = $.load(playerTable, {}, false)
					let name = t$('tr').eq(0).find('td').eq(0).text()
					if (name === '') return
					let playerScores: scoreData[] = []
					t$('tr')
						.eq(1)
						.find('td')
						.map((i, y) => {
							let stat = $(y).text().split('(')[0].split('/')
							let statPoint1 = {
								value: parseInt(stat[0]),
								weight: gkStatScoreTable[2 * i].value,
							}
							let statPoint2 = {
								value: parseInt(stat[1]) - parseInt(stat[0]),
								weight: gkStatScoreTable[2 * i + 1].value,
							}
							playerScores.push(statPoint1)
							playerScores.push(statPoint2)
						})
					t$('tr')
						.eq(3)
						.find('td')
						.map((i, y) => {
							let stat = $(y).text().split('(')[0].split('/')
							let statPoint1 = {
								value: parseInt(stat[0]),
								weight: gkStatScoreTable[2 * i + 4].value,
							}
							let statPoint2 = {
								value: parseInt(stat[1]) - parseInt(stat[0]),
								weight: gkStatScoreTable[2 * i + 5].value,
							}
							playerScores.push(statPoint1)
							playerScores.push(statPoint2)
						})
					gkPlayerScores.push({
						name: name,
						scores: playerScores,
						team: index === 0 ? 'home' : 'away',
					})
				})
		})

		$('div.n_tab')
			.eq(1)
			.find('td[valign]')
			.eq(0)
			.find('tr.even, tr.odd')
			.map((_, el) => {
				data.lineup_home.push({
					name: $(el).find('td').eq(1).text().trim(),
					number: parseInt($(el).find('td').eq(0).text().trim()),
					isGK:
						typeof gkPlayerScores.find(
							(x) =>
								x.team === 'home' &&
								x.name === $(el).find('td').eq(1).text().trim()
						) !== 'undefined',
				})
			})

		$('div.n_tab')
			.eq(1)
			.find('td[valign]')
			.eq(1)
			.find('tr.even, tr.odd')
			.map((_, el) =>
				data.lineup_away.push({
					name: $(el).find('td').eq(1).text().trim(),
					number: parseInt($(el).find('td').eq(0).text().trim()),
					isGK:
						typeof gkPlayerScores.find(
							(x) =>
								x.team === 'away' &&
								x.name === $(el).find('td').eq(1).text().trim()
						) !== 'undefined',
				})
			)

		$('div.n_tab')
			.eq(3)
			.find('table.esemenylista tr.odd, tr.even')
			.map((_, el) =>
				data.events.push({
					time: {
						quarter: $(el).find('td').eq(1).text().trim(),
						seconds:
							parseInt($(el).find('td').eq(2).text().trim().split(':')[0]) *
								60 +
							parseInt($(el).find('td').eq(2).text().trim().split(':')[1]),
					},
					team:
						$(el).find('td').eq(0).text().trim() === '' &&
						$(el).find('td').eq(5).text().trim() === ''
							? ''
							: $(el).find('td').eq(0).text().trim() === ''
							? data.team_away
							: data.team_home,
					player: {
						name:
							$(el).find('td').eq(0).text().trim() === '' &&
							$(el).find('td').eq(5).text().trim() === ''
								? ''
								: $(el).find('td').eq(0).text().trim() === ''
								? $(el).find('td').eq(5).text().trim().split(' (')[0]
								: $(el).find('td').eq(0).text().trim().split(' (')[0],
						number:
							$(el).find('td').eq(0).text().trim() === '' &&
							$(el).find('td').eq(5).text().trim() === ''
								? 0
								: $(el).find('td').eq(0).text().trim() === ''
								? parseInt(
										$(el)
											.find('td')
											.eq(5)
											.text()
											.trim()
											.split(' (')[1]
											.replace(')', '')
								  )
								: parseInt(
										$(el)
											.find('td')
											.eq(0)
											.text()
											.trim()
											.split(' (')[1]
											.replace(')', '')
								  ),
						isGK:
							typeof gkPlayerScores.find((x) => {
								x.name ===
									($(el).find('td').eq(0).text().trim() === '' &&
									$(el).find('td').eq(5).text().trim() === ''
										? ''
										: $(el).find('td').eq(0).text().trim() === ''
										? $(el).find('td').eq(5).text().trim().split(' (')[0]
										: $(el).find('td').eq(0).text().trim().split(' (')[0])
							}) !== 'undefined',
					},
					eventType: $(el).find('td').eq(4).text().trim(),
					score:
						statScoreTable.find(
							(x) => x.type === $(el).find('td').eq(4).text().trim()
						)?.value || 0,
				})
			)

		data.lineup_home.forEach((player) => {
			if (player.isGK) {
				data.playerScores.push({
					player: player,
					score: calculateScore(
						gkPlayerScores.find((x) => x.name === player.name)?.scores || [],
						0.4
					),
				})
			} else {
				let scores = data.events
					.filter(
						(event) =>
							event.player.name === player.name &&
							event.player.number === player.number
					)
					.map((x) => {
						return { value: 1, weight: x.score }
					})
				if (scores.length === 0) return
				data.playerScores.push({
					player: player,
					score: calculateScore(scores),
				})
			}
		})

		data.lineup_away.forEach((player) => {
			if (player.isGK) {
				data.playerScores.push({
					player: player,
					score: calculateScore(
						gkPlayerScores.find((x) => x.name === player.name)?.scores || []
					),
				})
			} else {
				let scores = data.events
					.filter(
						(event) =>
							event.player.name === player.name &&
							event.player.number === player.number
					)
					.map((x) => {
						return { value: 1, weight: x.score }
					})
				if (scores.length === 0) return
				data.playerScores.push({
					player: player,
					score: calculateScore(scores),
				})
			}
		})

		const homeGoalEvents = data.events
			.filter(
				(x) =>
					x.eventType.toLowerCase().includes('gól') &&
					!x.eventType.toLowerCase().includes('gólpassz') &&
					x.team === data.team_home
			)
			.map((y) => y.player.name)
		const homeGroupedGoals = groupSimilar(homeGoalEvents)
			.sort((a, b) => b[1] - a[1])
			.map((x) => ({ name: x[0], amount: x[1] }))

		data.goalscorers_home = homeGroupedGoals

		const awayGoalEvents = data.events
			.filter(
				(x) =>
					x.eventType.toLowerCase().includes('gól') &&
					!x.eventType.toLowerCase().includes('gólpassz') &&
					x.team === data.team_away
			)
			.map((y) => y.player.name)
		const awayGroupedGoals = groupSimilar(awayGoalEvents)
			.sort((a, b) => b[1] - a[1])
			.map((x) => ({ name: x[0], amount: x[1] }))

		data.goalscorers_away = awayGroupedGoals

		return data
	}
}
