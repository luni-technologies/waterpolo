import { Formik } from 'formik'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Submit } from '../../../components/Form/Submit'
import { Wrapper } from '../../../components/Form/Wrapper'
import { PageWrapper } from '../../../components/PageWrapper'
import { useConfirmRegisterMutation } from '../../../generated/graphql'

const ConfirmRegister: NextPage = () => {
	const router = useRouter()
	const key = router.query.key
	const [confirmRegister] = useConfirmRegisterMutation()

	return (
		<PageWrapper title="Confirm Registration | Waterpolo" navbar={false}>
			<Formik
				initialValues={{}}
				onSubmit={async (_, { setErrors }) => {
					try {
						const response = await confirmRegister({
							variables: {
								options: {
									key: key as string,
								},
							},
						})
						if (response.data?.confirmRegister === true) {
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
				{() => (
					<Wrapper title="">
						<Submit value="Confirm Registration" />
					</Wrapper>
				)}
			</Formik>
		</PageWrapper>
	)
}

export default ConfirmRegister
