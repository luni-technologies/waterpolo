import { Formik } from 'formik'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Input } from '../../components/Form/Input'
import { Submit } from '../../components/Form/Submit'
import { Subtext } from '../../components/Form/Subtext'
import { Wrapper } from '../../components/Form/Wrapper'
import { PageWrapper } from '../../components/PageWrapper'
import { UserList } from '../../components/constants'
import { useRegisterMutation } from '../../generated/graphql'

const Register: NextPage = () => {
	const router = useRouter()
	const [register] = useRegisterMutation()

	const randUser = UserList[Math.floor(Math.random() * UserList.length)]
	const randPassLength = Math.floor(Math.random() * 6) + 8

	return (
		<PageWrapper title="Register | Waterpolo" navbar={false}>
			<Formik
				initialValues={{
					email: '',
					first_name: '',
					last_name: '',
					password: '',
				}}
				onSubmit={async (values, { setErrors }) => {
					try {
						const response = await register({
							variables: {
								options: {
									email: values.email,
									first_name: values.first_name,
									last_name: values.last_name,
									password: values.password,
								},
							},
						})
						if (response.data?.register !== null && response.data?.register) {
							router.push('/login')
						}
					} catch (err: any) {
						const errors: { [key: string]: string } = {}
						err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
							(validationErr: any) => {
								Object.values(validationErr.constraints).forEach(
									(message: any) => {
										errors[validationErr.property] = message
									}
								)
							}
						)
						setErrors(errors)
					}
				}}
			>
				{({ errors }) => (
					<Wrapper title="Register">
						<Input
							type={'text'}
							name="email"
							placeholder={randUser.email}
							description="Used for logging in"
							error={errors.email}
						/>
						<Input
							type={'text'}
							name="first_name"
							placeholder={randUser.first_name}
							description="Your first name used for interactions"
							error={errors.first_name}
						/>
						<Input
							type={'text'}
							name="last_name"
							placeholder={randUser.last_name}
							description="Your last name used for interactions"
							error={errors.last_name}
						/>
						<Input
							type={'password'}
							name="password"
							placeholder={Array(randPassLength).fill('*').join('')}
							description="The password you secure your account with"
							error={errors.password}
						/>
						<Submit value="Submit" />
						<Subtext>
							If you already have an account,{' '}
							<Link href={'/login'} passHref>
								<a>login</a>
							</Link>{' '}
							here.
						</Subtext>
					</Wrapper>
				)}
			</Formik>
		</PageWrapper>
	)
}

export default Register
