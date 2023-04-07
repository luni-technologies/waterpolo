import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator'
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
	@MinLength(8, { message: 'Password must be longer than 8 characters' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'Password must include: uppercase letters, lowercase letters and numbers',
	})
	password: string
}

@InputType()
export class RegisterInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'First name must not be empty' })
	first_name: string

	@Field(() => String)
	@IsNotEmpty({ message: 'Last name must not be empty' })
	last_name: string

	@Field(() => String)
	@IsEmail({}, { message: 'Must be a valid email' })
	@IsEmailAvailable({ message: 'Email is already in use' })
	email: string

	@Field(() => String)
	@MinLength(8, { message: 'Password must be longer than 8 characters' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'Password must include: uppercase letters, lowercase letters and numbers',
	})
	password: string
}

@InputType()
export class LoginInput {
	@Field(() => String)
	@IsEmail({}, { message: 'Must be a valid email' })
	email: string

	@Field(() => String)
	@MinLength(8, { message: 'Password must be longer than 8 characters' })
	password: string
}

@InputType()
export class VerifyInput {
	@Field(() => String)
	key: string
}
