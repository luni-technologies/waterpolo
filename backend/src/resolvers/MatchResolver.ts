import axios from 'axios'
import { load } from 'cheerio'
import moment from 'moment-timezone'
import { Arg, Query, Resolver } from 'type-graphql'
import { LeagueMid } from '../entities/League'
import { Match, MatchesOnDate } from '../entities/Match'
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

@Resolver()
export class MatchResolver {
	@Query(() => MatchesOnDate)
	async matchesOnDate(
		@Arg('date', () => Date) date: Date
	): Promise<MatchesOnDate> {
		let parsedDate = moment.tz(date, 'Europe/Budapest').format('YYYY-MM-DD')
		const resp = await axios.get(`https://waterpolo.hu/musor/${parsedDate}`)
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
				data
					.find((x) => x.title === loopLeague)
					?.matches.push({
						id: $(el).find('td').eq(0).text().trim(),
						date: parseDate($(el).find('td').eq(1).text().trim()),
						team_home: $(el).find('td').eq(2).text().trim(),
						team_away: $(el).find('td').eq(3).text().trim(),
						score_home: parseInt(
							$(el).find('td').eq(4).text().trim().split('(')[0].split('-')[0]
						),
						score_away: parseInt(
							$(el).find('td').eq(4).text().trim().split('(')[0].split('-')[1]
						),
						location: $(el).find('td').eq(5).text().trim(),
					})
			}
		})

		return {
			date,
			leagues: data,
		}
	}

	@Query(() => Match)
	async matchById(@Arg('id', () => String) id: string): Promise<Match> {
		const resp = await axios.get(`https://waterpolo.hu/meccs/${id}`)
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
			league: $('div.news_top_rounded').text().split('-')[1].trim(),
			lineup_home: [],
			lineup_away: [],
			goalscorers_home: [],
			goalscorers_away: [],
		}

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

		$('div.n_tab')
			.eq(1)
			.find('td[valign]')
			.eq(0)
			.find('tr.even, tr.odd')
			.map((_, el) =>
				data.lineup_home.push({
					name: $(el).find('td').eq(1).text().trim(),
					number: parseInt($(el).find('td').eq(0).text().trim()),
				})
			)

		$('div.n_tab')
			.eq(1)
			.find('td[valign]')
			.eq(1)
			.find('tr.even, tr.odd')
			.map((_, el) =>
				data.lineup_away.push({
					name: $(el).find('td').eq(1).text().trim(),
					number: parseInt($(el).find('td').eq(0).text().trim()),
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
					},
					eventType: $(el).find('td').eq(4).text().trim(),
				})
			)

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
