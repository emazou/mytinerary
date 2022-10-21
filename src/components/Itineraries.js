import React, {useEffect, useState} from 'react'
import '../styles/Itineraries.css'
import { useAllItinerariesMutation } from '../features/itinerariesAPI'
import Itinerary from './Itinerary'
import { useSelector } from 'react-redux'
export default function Itineraries(props) {
  const [allItineraries] = useAllItinerariesMutation()
  const [itineraries, setItineraries] = useState([])
  const reload = useSelector((state) => state.reload.reloadState)
  async function getItineraries () {
    try {
      let res = await allItineraries(props.id)
      if (res.data?.success) {
        setItineraries(res.data?.response)
      }else {
        console.log(res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getItineraries()
  },[reload])
  return (
    <div className='Itineraries-container'>
      {
        itineraries?.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary}/>)
      }
      {
        itineraries.length === 0 && <h3>No itineraries yet</h3>
      }
    </div>
  )
}
