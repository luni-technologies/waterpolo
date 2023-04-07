import { IsEmail, Length, Matches, MinLength } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IsEmailAvailable } from '../validators/isEmailAvailable'

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Field(() => String)
	@Column('text')
	first_name: string

	@Field(() => String)
	@Column('text')
	last_name: string

	@Field(() => String)
	@Column('text', { unique: true })
	email: string

	@Column('boolean', { default: false })
	email_verified: boolean

	@Column('text')
	@MinLength(8, { message: 'password_short' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password_weak',
	})
	password: string
}

@InputType()
export class RegisterInput {
	@Field(() => String)
	@Length(1, 255)
	first_name: string

	@Field(() => String)
	@Length(1, 255)
	last_name: string

	@Field(() => String)
	@Length(1, 255)
	@IsEmail({}, { message: 'email_invalid' })
	@IsEmailAvailable({ message: 'email_unavailable' })
	email: string

	@Field(() => String)
	@MinLength(8, { message: 'password_short' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password_weak',
	})
	password: string
}

@InputType()
export class LoginInput {
	@Field(() => String)
	@IsEmail({}, { message: 'email_invalid' })
	email: string

	@Field(() => String)
	@MinLength(8, { message: 'password_short' })
	password: string
}

@InputType()
export class VerifyInput {
	@Field(() => String)
	key: string
}
