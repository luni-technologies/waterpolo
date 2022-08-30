import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

const PageWrapperDiv = styled.div`
	width: 100%;
	min-height: 100vh;
	padding: 0 30px;
	margin: 20px 0;
`

interface PageWrapperProps {
	title: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
	title,
	children,
}) => {
	return (
		<PageWrapperDiv>
			<Head>
				<title>{title}</title>
			</Head>
			{children}
		</PageWrapperDiv>
	)
}
