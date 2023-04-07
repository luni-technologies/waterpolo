import { Field } from 'formik'
import React from 'react'
import styled from 'styled-components'

const Button = styled(Field)`
	font-family: 'Roboto Condensed', sans-serif;
	background-color: #000000;
	color: #ffffff;
	width: 500px;
	padding: 20px 0;
	text-align: center;
	border: none;
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
`

interface SubmitProps {
	value: string
}

export const Submit: React.FC<SubmitProps> = ({ value }) => {
	return <Button type={'submit'} value={value} />
}
