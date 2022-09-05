import { Field, Int, ObjectType } from 'type-graphql'
import { LeagueMid } from './League'

@ObjectType()
export class MatchMin {
	@Field(() => String)
	id: string

	@Field(() => String)
	team_home: string

	@Field(() => String)
	team_away: string

	@Field(() => Int)
	score_home: number

	@Field(() => Int)
	score_away: number

	@Field(() => String, { nullable: true })
	location: string | null

	@Field(() => Date, { nullable: true })
	date: Date | null
}

@ObjectType()
export class Time {
	@Field(() => String)
	quarter: string

	@Field(() => Int)
	seconds: number
}

@ObjectType()
export class Player {
	@Field(() => String)
	name: string

	@Field(() => Int)
	number: number
}

@ObjectType()
export class Event {
	@Field(() => Time)
	time: Time

	@Field(() => String)
	team: string

	@Field(() => Player)
	player: Player

	@Field(() => String)
	eventType: string
}

@ObjectType()
export class QuarterScore {
	@Field(() => Int)
	score_home: number

	@Field(() => Int)
	score_away: number
}

@ObjectType()
export class Match extends MatchMin {
	@Field(() => [QuarterScore])
	quarters: QuarterScore[]

	@Field(() => [Event])
	events: Event[]

	@Field(() => String)
	league: string

	@Field(() => [Player])
	lineup_home: Player[]

	@Field(() => [Player])
	lineup_away: Player[]
}

@ObjectType()
export class MatchesOnDate {
	@Field(() => Date)
	date: Date

	@Field(() => [LeagueMid])
	leagues: LeagueMid[]
}
