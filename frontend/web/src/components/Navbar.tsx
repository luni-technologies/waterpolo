import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMeQuery } from '../generated/graphql'
import { GreetingsList } from './constants'

const Nav = styled.div`
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	border-bottom: 2px solid #000000;
`

const NavContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 30px;
	margin: 10px 0;
`

const NavContentGroup = styled.div`
	display: flex;
	align-items: center;

	& :not(:first-child) {
		padding-left: 10px;
	}
`

const NavLink = styled.a`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 700;
	font-size: 14px;
	text-transform: uppercase;
	color: #000000;
	text-decoration: none;

	& span {
		font-weight: 400;
	}
`

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const { loading, data } = useMeQuery()

	const [randGreeting, setRandGreeting] = useState<string>()
	useEffect(() => {
		setRandGreeting(
			GreetingsList[Math.floor(Math.random() * GreetingsList.length)].greeting
		)
	}, [setRandGreeting])

	return (
		<Nav>
			<NavContent>
				<NavContentGroup>
					<Image
						src={'/logo.png'}
						alt={'blue waterpolo byluni logo'}
						height={'20px'}
						width={'20px'}
					/>
					<Link href={'/'} passHref>
						<NavLink>meccsek</NavLink>
					</Link>
					<Link href={'/leagues/'} passHref>
						<NavLink>bajnokságok</NavLink>
					</Link>
				</NavContentGroup>
				<NavContentGroup>
					{!loading && data?.me ? (
						<NavLink>
							<span>{randGreeting}, </span>
							{data.me.first_name}
						</NavLink>
					) : (
						<Link href={'/login'} passHref>
							<NavLink>bejelentkezés</NavLink>
						</Link>
					)}
				</NavContentGroup>
			</NavContent>
		</Nav>
	)
}
