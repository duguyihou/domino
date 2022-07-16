import React from 'react'

import Link from 'next/link'

import { Logo } from './logo'
import styles from './Navbar.module.scss'
import { NavLinkProps } from './Navbar.types'
import { SearchBar } from './searchBar'

const NavLink = (navLinkProps: NavLinkProps) => {
  const { placeholder, href } = navLinkProps
  return (
    <li className={styles.navLink}>
      <Link href={href}>
        <a>{placeholder}</a>
      </Link>
    </li>
  )
}

const navlinks = [
  {
    placeholder: 'Board',
    href: '/board',
  },
  {
    placeholder: 'Timeline',
    href: '/timeline',
  },
  {
    placeholder: 'Create',
    href: '/create',
  },
]
const Nav = () => {
  return (
    <nav className={styles.container}>
      <Logo />
      <SearchBar />
      <ul>
        {navlinks.map(({ placeholder, href }) => (
          <NavLink key={placeholder} placeholder={placeholder} href={href} />
        ))}
      </ul>
    </nav>
  )
}

export default Nav
