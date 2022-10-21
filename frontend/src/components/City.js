import React from 'react'
import '../styles/City.css'

export default function City(props) {
  let population 
  if (props.population >= 1000 && props.population <= 100000000) {
    population = props.population
  }

  return (
    <div className='City-container'>
        <h2>{props.city}</h2>
        <img className='City-img' src={props.photo} />
        <div className='City-description'>
            <p><span className='City-img-country'>oo</span>{props.country}</p>
            <p><span className='City-img-fundation'>oo</span>{(new Date(props.fundation)).getUTCFullYear()}</p>
            {props.population && <p><span className='City-img-population'>oo</span>{population}</p>}
        </div>
    </div>
  )
}
