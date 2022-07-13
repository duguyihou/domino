import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

// import logoSrc from '../../public/logo.png'
import { Logo } from './Logo'
import styles from './Nav.module.scss'
import { NavLinkProps } from './Nav.types'
import SearchBar from './SearchBar/SearchBar'

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

// const Logo = () => {
//   return <Image src={logoSrc} width={24} height={24} alt="logo" />
// }

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
