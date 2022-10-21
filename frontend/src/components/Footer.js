import React from 'react'
import '../styles/Footer.css'
import { Link as LinkRouter } from "react-router-dom"

export default function Footer () {
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  const today = new Date()
  return (
    <>
    <div className='Footer-container'>
        <nav className='Footer-container-nav'>
              <LinkRouter className='Footer-link' to='/'>Home</LinkRouter>
              <LinkRouter className='Footer-link' to='/cities'>Cities</LinkRouter>
        </nav>
        <div className='Footer-continer-socialmedia'>
            <a href="https://www.facebook.com/"><img src="/facebook.png" alt='social media' /></a>
            <a href="https://www.instagram.com/"><img src="/instagram.png" alt='social media' /></a>
            <a href="https://github.com/emazou/mytinerary-devthrone"><img src="/github.png" alt='social media' /></a>
        </div>
        <p>©{today.getFullYear()} MyTinerary</p>
        <button className='scroll' onClick={scroll}></button>
    </div>
    </>
  )
}
