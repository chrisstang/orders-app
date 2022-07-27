import React from 'react'
import Navigation from '../Navigation'

export default function Header() {
  return (
    <header>
        <div className="container d-flex justify-content-between align-items-center border-bottom py-3 mb-3">
          <h1 className='fs-2'>Orders Application</h1>
          <Navigation />
        </div>
    </header>
  )
}
