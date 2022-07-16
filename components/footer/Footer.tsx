import React from 'react'

import Image from 'next/image'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <a
        href="https://github.com/duguyihou/domino"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  )
}

export default Footer
