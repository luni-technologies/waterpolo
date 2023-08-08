import axios from 'axios'
import { load } from 'cheerio'
import moment from 'moment'
import { Arg, Query, Resolver } from 'type-graphql'
import { League, LeagueResponse, Table } from '../entities/League'
import { MatchMin } from '../entities/Match'
import { parseDate } from '../utils/parseDate'

@Resolver()
export class LeagueResolver {
	@Query(() => LeagueResponse)
	async all(): Promise<LeagueResponse> {
		const resp = await axios.get(`${process.env.PARSE_ROOT_DOMAIN}bajnoksagok/`)
		const $ = load(resp.data)

		let data: LeagueResponse = {
			mens: [],
			womens: [],
		}

		$('select.seasons_select')
			.eq(0)
			.find('option')
			.map((_, el) => {
				if ($(el).text() === '') return
				data.mens.push({
					id: $(el).attr('value') || '',
					title: $(el).text(),
				})
			})

		$('select.seasons_select')
			.eq(1)
			.find('option')
			.map((_, el) => {
				if ($(el).text() === '') return
				data.womens.push({
					id: $(el).attr('value') || '',
					title: $(el).text(),
				})
			})

		return data
	}

	@Query(() => League)
	async findById(@Arg('id', () => String) id: string): Promise<League> {
		const resp = await axios.get(
			`${process.env.PARSE_ROOT_DOMAIN}bajnoksagok/?szures[bajnoksag_id]=${id}`
		)
		const $ = load(resp.data)

		let matches: MatchMin[] = []
		let tables: Table[] = []

		$('table.team_standings_table_full')
			.eq(0)
			.find('tr.gamerow')
			.map((_, el) => {
				if ($(el).hasClass('team_standings_table_header')) return
				matches.push({
					id: $(el).find('td').eq(4).find('a').attr('href')!.split('/')[2],
					team_home: $(el).find('td').eq(2).find('a').text().trim(),
					team_away: $(el).find('td').eq(3).find('a').text().trim(),
					score_home: parseInt(
						$(el).find('td').eq(4).text().split('-')[0].trim()
					),
					score_away: parseInt(
						$(el).find('td').eq(4).text().split('-')[1].trim()
					),
					location: $(el).find('td').eq(6).text().trim(),
					date: parseDate($(el).find('td').eq(1).text().trim()),
				})
			})

		$('table.team_standings_table_full')
			.eq(1)
			.find('tr.gamerow[rel]:not(:has(th))')
			.each((_, el) => {
				let tableid = $(el).attr('rel')
				if (tables.find((x) => x.id === tableid)) {
					tables
						.find((x) => x.id === tableid)
						?.rows.push({
							position: parseInt(
								$(el).find('td').eq(0).text().replace('. ', '')
							),
							team: {
								id: $(el)
									.find('td')
									.eq(1)
									.find('a')
									.attr('href')
									?.split('/')[2]!,
								name: $(el).find('td').eq(1).find('a').text().trim(),
							},
							played: parseInt($(el).find('td').eq(2).text().trim()),
							w: parseInt($(el).find('td').eq(3).text().trim()),
							d: parseInt($(el).find('td').eq(4).text().trim()),
							l: parseInt($(el).find('td').eq(5).text().trim()),
							goal_pos: parseInt($(el).find('td').eq(6).text().trim()),
							goal_neg: parseInt($(el).find('td').eq(7).text().trim()),
							goal_diff: parseInt($(el).find('td').eq(8).text().trim()),
							points: parseInt($(el).find('td').eq(9).text().trim()),
						})
				} else {
					tables.push({
						id: tableid!,
						title: $(el).text().trim().replace('Tabella - ', '').trim(),
						rows: [],
					})
				}
			})

		let data: League = {
			id,
			organiser: $('table.team_rank_table_keret')
				.find('tr')
				.eq(1)
				.find('td')
				.eq(1)
				.text(),
			title: $('div.news_top_rounded_player').text().split('- ')[1].trim(),
			season_start: moment(
				$('table.team_rank_table_keret')
					.find('tr')
					.eq(1)
					.find('td')
					.eq(0)
					.text()
					.split('-')[0]
					.trim(),
				'YYYY/MM/DD'
			).toDate(),
			season_end: moment(
				$('table.team_rank_table_keret')
					.find('tr')
					.eq(1)
					.find('td')
					.eq(0)
					.text()
					.split('-')[1]
					.trim(),
				'YYYY/MM/DD'
			).toDate(),
			matches,
			tables,
		}

		return data
	}
}
