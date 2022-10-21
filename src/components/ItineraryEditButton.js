import React from "react";
import { useDispatch } from 'react-redux'
import {change} from '../features/modalSlice'
import {setId} from '../features/editSlice'
import '../styles/ItineraryEditButton.css'

export default function ItineraryEditButton(props) {
  const dispatch = useDispatch()
  const edit = () => {
    dispatch(change())
    dispatch(setId(props.idItinerary))
  };
  return (<button className="itinerary-edit-button" onClick={edit}><img src="/edit.png" /></button>)
}
