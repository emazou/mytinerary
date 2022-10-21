import React, { useRef, useState } from 'react'
import '../styles/NewItinerary.css'
import { useCreateItineraryMutation } from '../features/itinerariesAPI'
import { useCreateActivityMutation } from '../features/activitiesAPI'
import { useParams, useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm'
import toast from "react-hot-toast";
import { useSelector } from 'react-redux'
export default function NewItinerary() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [idItinerary, setIdItinerary] = useState('')
  const [stateFormActivities, setStateFormActivities] = useState(false)
  let user = useSelector((state) => state.logged.user)
  const [createItinerary] = useCreateItineraryMutation()
  const [createActivity] = useCreateActivityMutation()
  const itineraryRef = useRef()
  const activitiesRef = useRef()
  const formData = [
    {
      nameForm: "Name Itinerary",
      name: "name",
      type: "text",
      placeholder: "Itinerary",
      min: 4,
      max: 50,
    },
    {
      nameForm: "Price",
      name: "price",
      type: "number",
      placeholder: "1-5",
      min: 1,
      max: 5,
    },
    {
      nameForm: "Duration",
      name: "duration",
      type: "number",
      placeholder: "1-6",
      min: 1,
      max: 6,
    },
    {
      nameForm: "Tag",
      name: "tag1",
      type: "text",
      placeholder: "#tag",
      min: 1,
      max: 15,
    },
    {
      nameForm: "Tag",
      name: "tag2",
      type: "text",
      placeholder: "#tag",
      min: 1,
      max: 15,
    },
    {
      nameForm: "Tag",
      name: "tag3",
      type: "text",
      placeholder: "#tag",
      min: 1,
      max: 15,
    },
  ]
  const formActivity = [
    {
      nameForm: "1st Activity",
      name: "activity1",
      type: "string",
      placeholder: "Activity",
      min: 4,
      max: 50
    },
    {
      nameForm: "Photo",
      name: "photo1",
      type: "string",
      placeholder: "http://image.png",
      min: 4,
      max: 300
    },
    {
      nameForm: "2nd Activity",
      name: "activity2",
      type: "string",
      placeholder: "Activity",
      min: 4,
      max: 50
    },
    {
      nameForm: "Photo",
      name: "photo2",
      type: "string",
      placeholder: "http://image.png",
      min: 4,
      max: 300
    },
    {
      nameForm: "3rd Activity",
      name: "activity3",
      type: "string",
      placeholder: "Activity",
      min: 4,
      max: 50
    },
    {
      nameForm: "Photo",
      name: "photo3",
      type: "string",
      placeholder: "http://image.png",
      min: 4,
      max: 300
    }
  ]
  const showForm = (obj, i) => (
    <fieldset className='NewCitiesPage-fieldset' key={i}>
      <legend>{obj.nameForm}</legend>
      <InputForm type={obj.type} placeholder={obj.placeholder} min={obj.min} max={obj.max} name={obj.name} />
    </fieldset>
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    setStateFormActivities(true)
    const form = new FormData(itineraryRef.current)
    const obj = Object.fromEntries(form)
    const body = {
      name: obj.name,
      price: obj.price,
      duration: obj.duration,
      city: id,
      user: user.id,
      likes: [],
      tags: [obj.tag1, obj.tag2, obj.tag3]
    }
    createItinerary(body)
      .then(response => {
        if (response.data?.success) {
          setIdItinerary(response.data.id)
          setStateFormActivities(true)
          toast(`Itinerary created`, {
            icon: "👍",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          })
        }else{
          toast.error(`Could't be created`, {
            icon: "😞",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          })
        }
      })
      .catch(error => console.log(error))
  }
  const createActivities = (e) => {
    e.preventDefault()
    const form = new FormData(activitiesRef.current)
    const obj = Object.fromEntries(form)
    createActivity({
      name: obj.activity1,
      photo: obj.photo1,
      itinerary: idItinerary
    }).then(response => {
      console.log(response)
    })
      .catch(error => console.log(error))
    createActivity({
      name: obj.activity2,
      photo: obj.photo2,
      itinerary: idItinerary
    }).then(response => {
      console.log(response)
    })
      .catch(error => console.log(error))
    createActivity({
      name: obj.activity3,
      photo: obj.photo3,
      itinerary: idItinerary
    }).then(response => {
      if (response.data?.success) {
        toast(`Activities created`, {
          icon: "👍",
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        })
        navigate(`/cities/${id}`, { replace: true })
      }else{
        toast.error(`Could't be created`, {
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
        console.log(error)
        toast.error(`Could't be created`, {
          icon: "😞",
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        })
      })
  }
  return (
    <div className='NewItinerary-container'>
      <div className='NewItinerary-form-container'>
        <form ref={itineraryRef} onSubmit={handleSubmit}>
          {
            formData.map(showForm)
          }
          <button className='form-btn' type="submit">Add activities</button>
        </form>
        {stateFormActivities &&

          <form ref={activitiesRef} onSubmit={createActivities}>
            {
              formActivity.map(showForm)
            }
            <button className='form-btn' type="sumbit">Create itinerary</button>
          </form>
        }
      </div>
    </div>
  )
}
