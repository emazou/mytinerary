import React, { useState } from 'react'
import Activities from './Activities'
import ItineraryDelete from './ItineraryDelete'
import ItineraryEditButton from './ItineraryEditButton'
import '../styles/Itinerary.css'
import { useLocation } from 'react-router-dom'
import Likes from './Likes'
import DisplayComments from './DisplayComments'

export default function Itinerary(props) {
  const [buttonState, setButtonState] = useState(false)
  const itinerary = props.itinerary
  const { pathname } = useLocation()
  
  const handleComment = () => {
    setButtonState(!buttonState)
  }
  return (
    <div className='Itinerary-container'>
      <h2>{itinerary.name}</h2>
      <div className='Itinerary-user-container'>
        <img src={itinerary.user.photo} />
        <div className='Itinerary-information'>
          <p>{itinerary.user.name} {itinerary.user.lastName}</p>
          <p><img src='/reloj.png' className='Itinerary-icon' /> {itinerary.duration}h</p>
        </div>
      </div>
      <div className='Itinerary-price-tags-container'>
        <div className='Itinerary-tags-container'>
          {
            itinerary?.tags.map((tag, index) => <p key={index}>{tag}</p>)
          }
        </div>
        <div className='Itinerary-price-container'>
          <p><img src='/billete-de-dolar.png' className='Itinerary-icon' /> {itinerary.price}</p>
        </div>
      </div>
      <Activities id={itinerary._id} />
      <div className='Itinerary-interactions'>
        <Likes itinerary={itinerary} />
        <button className='Itinerary-comment-btn' onClick={handleComment}>Comments</button>
        {pathname === "/mytineraries" && <ItineraryEditButton idItinerary={itinerary._id}/>} 
        {pathname === "/mytineraries" && <ItineraryDelete idItinerary={itinerary._id}/>} 
      </div>
      {
        buttonState && <DisplayComments itinerary={itinerary} />
      }
    </div>
  )
}
