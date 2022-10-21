import React from 'react'
import CallToAction from '../components/CallToAction'
import '../styles/Hero.css'
export default function Hero() {
  return (
    <div className='Hero-container'>
        <h1>MyTinerary</h1>
        <p>Find your perfect trip, designed by insiders who know and love their cities!</p>
        <CallToAction/>
    </div>
  )
}
