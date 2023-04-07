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
import { useLoginMutation } from '../../generated/graphql'

const Login: NextPage = () => {
	const router = useRouter()
	const [login] = useLoginMutation()

	const randUser = UserList[Math.floor(Math.random() * UserList.length)]
	const randPassLength = Math.floor(Math.random() * 6) + 8

	return (
		<PageWrapper title="Login | Waterpolo" navbar={false}>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					try {
						const response = await login({
							variables: {
								options: {
									email: values.email,
									password: values.password,
								},
							},
						})
						if (!response.data?.login) {
							setErrors({
								email: 'Invalid email or password',
								password: 'Invalid email or password',
							})
						} else {
							router.push('/')
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
					<Wrapper title="Login">
						<Input
							type={'text'}
							name="email"
							placeholder={randUser.email}
							description="The email you registered with"
							error={errors.email}
						/>
						<Input
							type={'password'}
							name="password"
							placeholder={Array(randPassLength).fill('*').join('')}
							description="The password you registered with"
							error={errors.password}
						/>
						<Submit value="Submit" />
						<Subtext>
							If you don{"'"}t have an account yet,{' '}
							<Link href={'/register'} passHref>
								<a>register</a>
							</Link>{' '}
							here.
						</Subtext>
					</Wrapper>
				)}
			</Formik>
		</PageWrapper>
	)
}

export default Login
