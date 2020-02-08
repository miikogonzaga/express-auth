import React, { Component } from 'react'
import requireAuth from './requireAuth'

class Feature extends Component {
    render() {
        return (
            <div>
                Protected Route
            </div>
        )
    }
}

export default requireAuth(Feature)