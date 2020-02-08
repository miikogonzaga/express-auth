import axios from 'axios'
import { AUTH_USER, AUTH_ERROR } from './types'

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/signup', formProps)
        dispatch({ type: AUTH_USER, payload: response.data.token })
        localStorage.setItem('token', response.data.token)
        callback()
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email is in use' })
    }
}

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/signin', formProps)
        dispatch({ type: AUTH_USER, payload: response.data.token })
        localStorage.setItem('token', response.data.token)
        callback()
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
    }
}

export const signout = () => {
    // Clear local storage
    localStorage.removeItem('token')

    return {
        type: AUTH_USER,
        payload: ''
    }
}