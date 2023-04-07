import { Form as FormikForm } from 'formik'
import React from 'react'
import styled from 'styled-components'

const FormWrapper = styled.div`
	height: calc(100vh - 40px);
	width: 100%;
	color: #000000;
`

const Form = styled(FormikForm)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`

const FormTitle = styled.h1`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 30px;
	font-weight: 700;
	text-transform: uppercase;
	margin: 0;
	margin-bottom: 35px;
`

interface WrapperProps {
	title: string
}

export const Wrapper: React.FC<WrapperProps> = ({ title, children }) => {
	return (
		<FormWrapper>
			<Form>
				<FormTitle>{title}</FormTitle>
				{children}
			</Form>
		</FormWrapper>
	)
}
