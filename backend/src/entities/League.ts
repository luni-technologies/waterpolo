import { Field, Int, ObjectType } from 'type-graphql'
import { MatchMin } from './Match'
import { TeamMin } from './Team'

@ObjectType()
export class TableRow {
	@Field(() => Int)
	position: number

	@Field(() => TeamMin)
	team: TeamMin

	@Field(() => Int)
	played: number

	@Field(() => Int)
	w: number

	@Field(() => Int)
	d: number

	@Field(() => Int)
	l: number

	@Field(() => Int)
	goal_pos: number

	@Field(() => Int)
	goal_neg: number

	@Field(() => Int)
	goal_diff: number

	@Field(() => Int)
	points: number
}

@ObjectType()
export class Table {
	@Field(() => String)
	id: string

	@Field(() => String)
	title: string

	@Field(() => [TableRow])
	rows: TableRow[]
}

@ObjectType()
export class League {
	@Field(() => String)
	id: string

	@Field(() => String, { nullable: true })
	organiser: string | null

	@Field(() => String)
	title: string

	@Field(() => Date, { nullable: true })
	season_start: Date | null

	@Field(() => Date, { nullable: true })
	season_end: Date | null

	@Field(() => [MatchMin])
	matches: MatchMin[]

	@Field(() => [Table])
	tables: Table[]
}

@ObjectType()
export class LeagueMin {
	@Field(() => String)
	id: string

	@Field(() => String)
	title: string
}

@ObjectType()
export class LeagueMid extends LeagueMin {
	@Field(() => [MatchMin])
	matches: MatchMin[]
}

@ObjectType()
export class LeagueResponse {
	@Field(() => [LeagueMin])
	mens: LeagueMin[]

	@Field(() => [LeagueMin])
	womens: LeagueMin[]
}
