import React, { useRef } from 'react'
import InputForm from '../components/InputForm'
import '../styles/NewCitiesPage.css'
import { usePostCityMutation } from '../features/citiesAPI'
import Alert from "../components/Alert";
import toast from "react-hot-toast";
export default function NewCitiesPage() {
  const [postCity] = usePostCityMutation()
  const formData = [{
    name: 'city',
    placeholder: 'Name City',
    type: 'text',
    min: 2,
    max: 30
  },
  {
    name: 'country',
    placeholder: 'Country',
    type: 'text',
    min: 4,
    max: 30
  },
  {
    name: 'photo',
    placeholder: 'https://direction-image.jpg',
    type: 'text',
    min: 4,
    max: 500
  },
  {
    name: 'population',
    placeholder: 'Population',
    type: 'number',
    min: 1000,
    max: 100000000
  },
  {
    name: 'fundation',
    placeholder: '1900',
    type: 'number',
    min: 1,
    max: 2022
  }
  ]
  const formRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(formRef.current)
    postCity(Object.fromEntries(form))
      .then(response => {
        console.log(response)
        if (response.data?.success) {
          toast("City created successfully!", {
            icon: "👍",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          });
        } else {
          toast.error("Could't be created", {
            icon: "😞",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          })
        }
      })
      .catch((error) => {
        toast.error("Could't be created", {
          icon: "😞",
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        })
        console.log(error)}
        );
  }

  const showForm = (obj, i) => (
    <fieldset className='NewCitiesPage-fieldset' key={i}>
      <legend>{obj.name[0].toUpperCase() + obj.name.substring(1)}</legend>
      <InputForm min={obj.min} max={obj.max} type={obj.type} placeholder={obj.placeholder} name={obj.name} />
    </fieldset>
  )
  return (
    <div className='NewCitiesPage-container'>
      <div className='NewCitiesPage-container-form'>
        <img src='https://i.ibb.co/NpTg7ng/buenosaires.jpg' />
        <form className='NewCitiesPage-form' onSubmit={handleSubmit} ref={formRef}>
          <h3>Another destiny?</h3>
          {formData.map(showForm)}
          <button className='NewCitiesPage-btn' type='submit'>Send</button>
        </form>
      </div>
      <Alert />
    </div>
  )
}