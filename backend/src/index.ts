import { ApolloServer } from 'apollo-server-express'
import RedisStore from 'connect-redis'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { DataSource } from 'typeorm'
import { User } from './entities/User'
import { redis } from './redis'
import { HelloResolver } from './resolvers/HelloResolver'
import { LeagueResolver } from './resolvers/LeagueResolver'
import { MatchResolver } from './resolvers/MatchResolver'
import { SearchResolver } from './resolvers/SearchResolver'
import { UserResolver } from './resolvers/UserResolver'
import { Context } from './types/Context'

const main = async () => {
	dotenv.config()

	const app = express()

	const dataSource = new DataSource({
		type: 'postgres',
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT || '5432'),
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		entities: [User],
		synchronize: true,
		logging: true,
	})

	await dataSource.initialize()

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				HelloResolver,
				LeagueResolver,
				MatchResolver,
				SearchResolver,
				UserResolver,
			],
			validate: false,
		}),
		context: ({ req, res }: Context) => ({ req, res }),
	})

	const redisStore = new RedisStore({
		client: redis,
		prefix: 'wp:',
	})

	app.set('trust proxy', 1)
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN!,
			credentials: true,
		})
	)

	app.use(
		session({
			store: redisStore,
			name: 'wp_qid',
			secret: process.env.SESSION_SECRET!,
			resave: false,
			saveUninitialized: false,
			cookie: {
				domain:
					process.env.NODE_ENV === 'production' ? '.byluni.com' : undefined,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24 * 365 * 1 /* 1 year in milliseconds */,
			},
		})
	)

	apolloServer.applyMiddleware({ app, cors: false })
	const port = process.env.PORT || 4000
	app.listen(port, () => {
		console.log(`api is listening at http://localhost:${port}/graphql...`)
	})
}

main()
