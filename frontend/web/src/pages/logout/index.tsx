import { Formik } from 'formik'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Submit } from '../../components/Form/Submit'
import { Wrapper } from '../../components/Form/Wrapper'
import { PageWrapper } from '../../components/PageWrapper'
import { useLogoutMutation } from '../../generated/graphql'

const Logout: NextPage = () => {
	const router = useRouter()
	const [logout] = useLogoutMutation()
	return (
		<PageWrapper title="Logout | Waterpolo" navbar={false}>
			<Formik
				initialValues={{}}
				onSubmit={async (_, { setErrors }) => {
					try {
						const response = await logout()
						if (response.data?.logout === true) {
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
				{() => (
					<Wrapper title="">
						<Submit value="Logout" />
					</Wrapper>
				)}
			</Formik>
		</PageWrapper>
	)
}

export default Logout
