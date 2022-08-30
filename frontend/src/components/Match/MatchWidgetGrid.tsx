import React from 'react'
import styled from 'styled-components'
import { MatchMin } from '../../generated/graphql'
import { MatchWidget } from './MatchWidget'

const MatchWidgetGridWrapper = styled.div`
	margin-top: 50px;
`

const MatchWidgetGridHeader = styled.header`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	margin-bottom: 10px;
`

const MatchWidgetGridTitle = styled.h3`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	font-weight: 700;
	text-transform: uppercase;
	margin-right: 10px;
`

const MatchWidgetGridLink = styled.a`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 12px;
	font-weight: 400;
	color: #6f6f6f;
	text-decoration: none;
`

const MatchWidgetGridItems = styled.div`
	display: grid;
	grid-template-columns: calc(100% / 3 - 20px) calc(100% / 3 - 20px) calc(
			100% / 3 - 20px
		);
	grid-auto-rows: 120px;
	grid-gap: 20px;
`

interface MatchWidgetGridProps {
	title?: string
	matches: MatchMin[]
}

export const MatchWidgetGrid: React.FC<MatchWidgetGridProps> = ({
	title,
	matches,
}) => {
	return (
		<MatchWidgetGridWrapper>
			<MatchWidgetGridHeader>
				{title ? <MatchWidgetGridTitle>{title}</MatchWidgetGridTitle> : null}
			</MatchWidgetGridHeader>
			<MatchWidgetGridItems>
				{matches.map((x) => (
					<MatchWidget key={x.id} match={x} grid={true} />
				))}
			</MatchWidgetGridItems>
		</MatchWidgetGridWrapper>
	)
}
