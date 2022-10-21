import React from 'react'
import City from '../components/City'
import CityButton from '../components/CityButton.'
import '../styles/CityDetails.css'
import { useParams } from 'react-router-dom'
import {useGetCityQuery} from '../features/citiesAPI'
import Itineraries from '../components/Itineraries'
import NewItineraryButton from '../components/NewItineraryButton'
import { useSelector } from 'react-redux'
export default function CityDetails() {
  const logged = useSelector((state)=> state.logged.loggedState)
  const {id} = useParams()
  const {data} = useGetCityQuery(id)
  let city = data?.response
  return (
    <div className='CityDetails-container'>
        <CityButton />
        <City city={city?.city} country={city?.country} fundation={city?.fundation} population={city?.population} photo={city?.photo}/>
        <Itineraries id={id} />
        {
          logged && <NewItineraryButton id={id} />
        }
    </div>
  )
}
