import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles/NewItineraryButton.css'
export default function NewItineraryButton(props) {

  return (
    <LinkRouter className='NewItineraryButton' to={`/newitinerary/${props.id}`}>Add itinerary <img src="/anadir-simbolo.png" alt="Icon" /></LinkRouter>
  )
}
