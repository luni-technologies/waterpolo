import { hash as argonHash, verify as argonVerify } from 'argon2'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { v4 as uuidv4 } from 'uuid'
import { LoginInput, RegisterInput, User, VerifyInput } from '../entities/User'
import { redis } from '../redis'
import { Context } from '../types/Context'

@Resolver()
export class UserResolver {
	@Mutation(() => Boolean)
	async register(
		@Arg('options', () => RegisterInput, { validate: true })
		options: RegisterInput
	): Promise<boolean> {
		const hashedPassword = await argonHash(options.password)

		try {
			const user = await User.create({
				...options,
				password: hashedPassword,
			}).save()

			const key = uuidv4()
			redis.set(
				`ver:${key}`,
				user.id,
				'EX',
				60 * 60 * 24 * 1 /* 1 day in seconds */
			)
			console.log(key)

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}

	@Mutation(() => Boolean)
	async confirmRegister(
		@Arg('options', () => VerifyInput, { validate: false }) options: VerifyInput
	): Promise<boolean> {
		const id = await redis.get(`ver:${options.key}`)
		if (!id) {
			return false
		} else {
			const user = await User.findOne({ where: { id: id } })
			if (!user) return false

			try {
				await User.update({ id: id }, { email_verified: true })
				await redis.del(`ver:${options.key}`)
				return true
			} catch (e) {
				console.error(e)
				return false
			}
		}
	}

	@Mutation(() => Boolean)
	async login(
		@Arg('options', () => LoginInput, { validate: true }) options: LoginInput,
		@Ctx() ctx: Context
	): Promise<boolean> {
		const user = await User.findOne({ where: { email: options.email } })
		if (!user) return false

		const passVerified = await argonVerify(user.password, options.password)
		if (!passVerified) return false

		const userVerified = user.email_verified
		if (!userVerified) return false

		ctx.req.session.userId = user.id
		return true
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() ctx: Context): Promise<User | null> {
		const id = ctx.req.session.userId
		if (!id) return null

		const user = await User.findOne({ where: { id: id } })
		if (!user) return null

		return user
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: Context): Promise<boolean> {
		return new Promise((res, rej) => {
			ctx.req.session.destroy((err) => {
				if (err) {
					console.error(err)
					return rej(false)
				}

				ctx.res.clearCookie('wp_qid')
				return res(true)
			})
		})
	}

	@Mutation(() => Boolean)
	async deleteUser(
		@Arg('options', () => LoginInput, { validate: true }) options: LoginInput
	): Promise<boolean> {
		const user = await User.findOne({ where: { email: options.email } })
		if (!user) return false

		const passVerified = await argonVerify(user.password, options.password)
		if (!passVerified) return false

		const key = uuidv4()
		await redis.set(
			`del:${key}`,
			user.id,
			'EX',
			60 * 30 /* 30 minutes in seconds */
		)
		console.log(key)

		return true
	}

	@Mutation(() => Boolean)
	async confirmDeleteUser(
		@Arg('options', () => VerifyInput, { validate: false }) options: VerifyInput
	): Promise<boolean> {
		const id = await redis.get(`del:${options.key}`)
		if (!id) return false

		const user = await User.findOne({ where: { id: id } })
		if (!user) return false

		try {
			await User.delete({ id: id })
			await redis.del(`del:${options.key}`)
			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}
}
