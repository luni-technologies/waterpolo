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

	@Field(() => Boolean)
	isGK: boolean
}

@ObjectType()
export class Referee {
	@Field(() => String)
	name: string
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

	@Field(() => Number)
	score: number
}

@ObjectType()
export class QuarterScore {
	@Field(() => Int)
	score_home: number

	@Field(() => Int)
	score_away: number
}

@ObjectType()
export class GoalScorer {
	@Field(() => String)
	name: number

	@Field(() => Int)
	amount: number
}

@ObjectType()
export class PlayerScore {
	@Field(() => Player)
	player: Player

	@Field(() => Number)
	score: number
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

	@Field(() => [GoalScorer])
	goalscorers_home: GoalScorer[]

	@Field(() => [GoalScorer])
	goalscorers_away: GoalScorer[]

	@Field(() => [PlayerScore])
	playerScores: PlayerScore[]

	@Field(() => [Referee])
	referees: Referee[]

	@Field(() => [Coach])
	coaches_home: Coach[]

	@Field(() => [Coach])
	coaches_away: Coach[]
}

@ObjectType()
export class Coach {
	@Field(() => String)
	name: string
}

@ObjectType()
export class MatchesOnDate {
	@Field(() => Date)
	date: Date

	@Field(() => [LeagueMid])
	leagues: LeagueMid[]
}
