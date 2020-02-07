import React from 'react'
import Nav from './Nav'

export default ({ children }) => {
    return (
        <div>
            <Nav />
            {children}
        </div>
    )
}