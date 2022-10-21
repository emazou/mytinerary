import React from 'react'
import { useDeleteItineraryMutation } from '../features/itinerariesAPI'
import '../styles/ItineraryDelete.css'
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { reload } from '../features/reloadSlice';
export default function ItineraryDelete(props) {
  const [deleteItinerary] = useDeleteItineraryMutation()
  const dispatch = useDispatch()
  const itineraryDelete = () => {
    deleteItinerary(props.idItinerary)
      .then(response => {
        if (response.data?.success) {
          dispatch(reload())
          toast(`${response.data.message}`, {
            icon: "👏",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          })
        }else{
          toast.error(`Could't be deleted`, {
            icon: "😞",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          })
        }
      })
      .catch(error => {
        toast.error(`Could't be deleted`, {
          icon: "😞",
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        })
      }
        )
  }
  return (
    <button className='itinerary-delete-btn' onClick={itineraryDelete}><img src='/trash.png' /></button>
  )
}
