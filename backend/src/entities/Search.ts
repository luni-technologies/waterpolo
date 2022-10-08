import { Field, ObjectType } from 'type-graphql'
import { LeagueMin } from './League'

@ObjectType()
export class SearchResult {
	@Field(() => String)
	query: string

	@Field(() => [LeagueMin])
	leagues: LeagueMin[]

	@Field(() => [String])
	players: String[]
}
