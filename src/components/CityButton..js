import React from 'react'
import {Link as LinkRouter} from 'react-router-dom'
import '../styles/CityButton.css'

export default function CityButton() {
  return (
    <LinkRouter className='CityButton' to='/cities'><img src='/left-arrow.png' />Go Back</LinkRouter>
  )
}
