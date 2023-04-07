import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { Navbar } from './Navbar'

const PageWrapperDiv = styled.div`
	width: 100%;
	min-height: 100vh;
	padding: 20px 30px;

	& ::selection {
		color: #ffffff;
		background-color: #0484dc;
	}
`

interface PageWrapperProps {
	title: string
	navbar?: boolean
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
	title,
	navbar,
	children,
}) => {
	return (
		<PageWrapperDiv>
			<Head>
				<title>{title}</title>
			</Head>
			{navbar !== false && <Navbar />}
			{children}
		</PageWrapperDiv>
	)
}
