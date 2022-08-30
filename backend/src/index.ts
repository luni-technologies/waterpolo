import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/HelloResolver'
import { LeagueResolver } from './resolvers/LeagueResolver'
import { MatchResolver } from './resolvers/MatchResolver'
import { Context } from './types/Context'

const main = async () => {
	dotenv.config()

	const app = express()

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, LeagueResolver, MatchResolver],
			validate: true,
		}),
		context: ({ req, res }: Context) => ({ req, res }),
	})

	app.set('trust proxy', 1)
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN!,
			credentials: true,
		})
	)

	apolloServer.applyMiddleware({ app, cors: false })
	const port = process.env.PORT || 4000
	app.listen(port, () => {
		console.log(`api is listening at http://localhost:${port}/graphql...`)
	})
}

main()
