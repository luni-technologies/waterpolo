import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class TeamMin {
	@Field(() => String)
	id: string

	@Field(() => String)
	name: string
}
