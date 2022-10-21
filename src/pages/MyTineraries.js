import React, {useEffect, useState} from 'react'
import '../styles/MyTineraries.css'
import { useAllItinerariesUserMutation } from '../features/itinerariesAPI'
import Itinerary from '../components/Itinerary'
import Modal from '../components/Modal'
import { useSelector } from 'react-redux'
import PatchItinerary from '../components/PatchItinerary'

export default function MyTineraries() {
  const [allItinerariesUser] = useAllItinerariesUserMutation()
  const [itineraries, setItineraries] = useState([]) 
  const reloadState = useSelector((state) => state.reload.reloadState)
  const user = useSelector((state) => state.logged.user)
  const openModal = useSelector((state) => state.modal.modalState)
  async function allItineraries () {
    try {
      let res = await allItinerariesUser(user.id)
      if (res.data?.success) {
        setItineraries(res.data?.response)
      } else {
        console.log(res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    allItineraries()
  }
  ,[reloadState])

  return (
    <div className='MyTineraries-container'>
        <div className='MyTineraries-itineraries'>
        {
          itineraries?.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary}/>)
        }
        </div>
        {openModal && 
          <Modal>
            <PatchItinerary />
          </Modal>        
        }
    </div>
  )
}
