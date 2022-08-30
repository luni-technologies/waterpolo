import React from 'react'
import styled from 'styled-components'
import { Table } from '../../generated/graphql'
import { TableWidget } from './TableWidget'

const TableWidgetRowWrapper = styled.div`
	margin-top: 50px;
`

const TableWidgetRowHeader = styled.header`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	margin-bottom: 10px;
`

const TableWidgetRowTitle = styled.h3`
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 15px;
	font-weight: 700;
	text-transform: uppercase;
	margin-right: 10px;
`

const TableWidgetRowItems = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	& > :not(:last-child) {
		margin-bottom: 20px;
	}
`

interface TableWidgetWrapperProps {
	tables: Table[]
}

export const TableWidgetWrapper: React.FC<TableWidgetWrapperProps> = ({
	tables,
}) => {
	return (
		<TableWidgetRowWrapper>
			<TableWidgetRowHeader>
				<TableWidgetRowTitle>Tabellák</TableWidgetRowTitle>
			</TableWidgetRowHeader>
			<TableWidgetRowItems>
				{tables.map((x) => (
					<TableWidget table={x} key={x.id} />
				))}
			</TableWidgetRowItems>
		</TableWidgetRowWrapper>
	)
}
