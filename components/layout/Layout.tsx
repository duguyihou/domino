import React from 'react'

import { Footer } from '../footer'
import { Head } from '../head'
import { Navbar } from '../navbar'
import { LayoutProps } from './Layout.types'

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
