import React from 'react'
import '../styles/CityCard.css'
import {Link as LinkRouter} from 'react-router-dom'
export default function CityCard(props) {

  return (
    <div className='CardCity-container'>
        <img src={props.url}/>
        <div className='CardCity-body'>
            <h3>{props.name}</h3>
            <LinkRouter to={'/cities/'+props.id} className='CardCity-btn'>See More</LinkRouter>
        </div>
    </div>
  )
}
