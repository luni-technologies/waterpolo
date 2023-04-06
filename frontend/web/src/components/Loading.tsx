import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const LoadingText = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	font-family: 'Roboto Condensed', sans-serif;
	font-size: 20px;
	font-weight: 700;
	text-transform: uppercase;
`

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
	const [dots, setDots] = useState<number>(1)

	useEffect(() => {
		let interval = setInterval(() => {
			if (dots % 3 === 0) {
				setDots(1)
			} else {
				setDots(dots + 1)
			}
		}, 500)
		return () => clearInterval(interval)
	})

	return <LoadingText>Betöltés{Array(dots).fill('.').join('')}</LoadingText>
}
