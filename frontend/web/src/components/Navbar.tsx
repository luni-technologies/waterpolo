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

	&:hover {
		cursor: pointer;
	}
`

const NavMenu = styled.div<{ pos: number }>`
	position: absolute;
	left: ${(props) => props.pos}px;
	top: 45px;
	transform: translateX(-50%);
	background-color: #ffffff;
	border: 2px solid #000000;
	padding: 10px;

	display: flex;
	flex-direction: column;
	align-items: end;

	& > a:not(:last-child) {
		margin-bottom: 5px;
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

	const [menuPosition, setMenuPosition] = useState<number>(0)
	const [showMenu, setShowMenu] = useState<boolean>(false)

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
				<NavContentGroup
					ref={(el) => {
						if (!el) return
						let rect = el.getBoundingClientRect()
						setMenuPosition(rect.x + rect.width / 2)
					}}
				>
					{!loading && data?.me ? (
						<NavLink
							onClick={() => {
								setShowMenu(!showMenu)
							}}
						>
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
			{showMenu && (
				<NavMenu pos={menuPosition}>
					<Link href={'/account'} passHref>
						<NavLink>fiók</NavLink>
					</Link>
					<Link href={'/favourites'} passHref>
						<NavLink>kedvencek</NavLink>
					</Link>
					<Link href={'/logout'} passHref>
						<NavLink>kijelentkezés</NavLink>
					</Link>
				</NavMenu>
			)}
		</Nav>
	)
}
