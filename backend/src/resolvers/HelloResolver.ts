import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
	@Query()
	hello(): String {
		return 'hi'
	}
}
