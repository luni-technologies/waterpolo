import { Arg, Query, Resolver } from 'type-graphql'
import { SearchResult } from '../entities/Search'
import { LeagueResolver } from './LeagueResolver'

@Resolver()
export class SearchResolver {
	@Query(() => SearchResult)
	async search(
		@Arg('query', () => String) query: string
	): Promise<SearchResult> {
		let data: SearchResult = {
			query: query,
			leagues: [],
			players: [],
		}
		const allLeagues = await new LeagueResolver().all()
		data.leagues = allLeagues.mens.filter((x) =>
			x.title.toLowerCase().replace(/ /g, '').includes(query)
		)

		return data
	}
}
