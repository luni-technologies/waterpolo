import React from 'react'
import styled from 'styled-components'
import { Table as TableType } from '../../generated/graphql'

const TableWrapper = styled.div`
	width: 100%;
	font-family: 'Roboto Condensed', sans-serif;
	border: 2px solid #000000;
`

const TableTitle = styled.h4`
	text-transform: uppercase;
	text-align: left;
	width: 100%;
	border-bottom: 2px solid #000000;
	padding-left: 20px;
`

const Table = styled.table`
	width: 100%;
`

const TableHeaderText = styled.th`
	text-transform: uppercase;
	text-align: left;
	font-weight: 700;
`

const TableDataNumber = styled.td`
	width: 5%;
	text-align: center;
`

interface TableWidgetProps {
	table: TableType
}

export const TableWidget: React.FC<TableWidgetProps> = ({ table }) => {
	return (
		<TableWrapper>
			<TableTitle>{table.title}</TableTitle>
			<Table>
				<tbody>
					<tr>
						<th>#</th>
						<TableHeaderText>Csapat</TableHeaderText>
						<th>J</th>
						<th>NY</th>
						<th>D</th>
						<th>V</th>
						<th>+/-</th>
						<th>GK</th>
						<th>P</th>
					</tr>
					{table.rows.map((x) => (
						<tr key={x.position}>
							<TableDataNumber>{x.position}</TableDataNumber>
							<td>{x.team.name}</td>
							<TableDataNumber>{x.played}</TableDataNumber>
							<TableDataNumber>{x.w}</TableDataNumber>
							<TableDataNumber>{x.d}</TableDataNumber>
							<TableDataNumber>{x.l}</TableDataNumber>
							<TableDataNumber>
								{x.goal_pos}/{x.goal_neg}
							</TableDataNumber>
							<TableDataNumber>{x.goal_diff}</TableDataNumber>
							<TableDataNumber>{x.points}</TableDataNumber>
						</tr>
					))}
				</tbody>
			</Table>
		</TableWrapper>
	)
}
