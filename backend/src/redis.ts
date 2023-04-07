import Redis from 'ioredis'

export const redis = new Redis({
	port: parseInt(process.env.REDIS_PORT || '6379'),
	host: process.env.REDIS_HOST,
	username: process.env.REDIS_USER,
	password: process.env.REDIS_PASS,
	db: 0,
})
