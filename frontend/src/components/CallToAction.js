import React from 'react'
import '../styles/CallToAction.css'
import {Link as LinkRouter} from 'react-router-dom'
export default function CallToAction() {
  return (
    <LinkRouter className='CallToAction-a' to='/cities'>Choose your destiny</LinkRouter>
  )
}
