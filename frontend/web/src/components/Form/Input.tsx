import { Field as FormikField } from 'formik'
import styled from 'styled-components'

const FieldWrapper = styled.div<{ iserror: boolean }>`
	position: relative;
	width: 500px;
	padding: 20px 15px;
	background: none;
	border: 1.5px solid ${(props) => (props.iserror ? '#ff6464' : '#000000')};

	&:not(:last-child) {
		margin-bottom: 15px;
	}
`

const Field = styled(FormikField)<{ isError: boolean }>`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	width: 100%;
	color: ${(props) => (props.isError ? '#ff6464' : '#000000')};
	border: none;
	padding: 0;
	margin: 0;
	background: none;
	position: relative;

	&::placeholder {
		color: ${(props) => (props.isError ? '#ff646480' : '#00000080')};
		margin: 0;
	}

	&:focus {
		outline: none;
	}
`

const LabelWrapper = styled.div`
	position: absolute;
	right: 515px;
	top: calc(50% + 2.5px);
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	text-align: right;
`

const Label = styled.label`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	font-weight: 700;
	color: #000000;
	text-transform: uppercase;
`

const Description = styled.span<{ iserror: boolean }>`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 12px;
	font-weight: 400;
	color: ${(props) => (props.iserror ? '#ff6464' : '#000000bf')};
	white-space: nowrap;
	margin-top: -5px;
`

interface InputProps {
	type: string
	name: string
	placeholder: string
	description: string
	error?: string
}

export const Input: React.FC<InputProps> = ({
	type,
	name,
	placeholder,
	description,
	error,
}) => {
	return (
		<FieldWrapper iserror={!!error}>
			<LabelWrapper>
				<Label htmlFor="name">{name.replace(/_/g, ' ')}</Label>
				<Description iserror={!!error}>{error || description}</Description>
			</LabelWrapper>
			<Field
				type={type}
				name={name}
				placeholder={placeholder}
				isError={!!error}
			/>
		</FieldWrapper>
	)
}
