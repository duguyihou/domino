import React, { useRef } from 'react'

import styles from './SearchBar.module.scss'

const SearchBar = () => {
  const clickPoint = useRef<HTMLInputElement | null>(null)
  const handleFocus = () => {
    if (clickPoint.current) clickPoint.current.style.display = 'none'
  }

  const handleBlur = () => {
    if (clickPoint.current) clickPoint.current.style.display = 'block'
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search ..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className={styles.spotlight} ref={clickPoint}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="20"
          aria-hidden="true"
          className="mr-1 header-search-key-slash"
        >
          <path
            fill="none"
            stroke="#979A9C"
            opacity=".4"
            d="M3.5.5h12c1.7 0 3 1.3 3 3v13c0 1.7-1.3 3-3 3h-12c-1.7 0-3-1.3-3-3v-13c0-1.7 1.3-3 3-3z"
          ></path>
          <path fill="#979A9C" d="M11.8 6L8 15.1h-.9L10.8 6h1z"></path>
        </svg>
      </div>
    </div>
  )
}

export default SearchBar
