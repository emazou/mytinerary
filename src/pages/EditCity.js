import React, { useState, useRef, useEffect } from 'react'
import SelectForm from '../components/SelectForm'
import '../styles/EditCity.css'
import InputEditCity from '../components/InputEditCity'
import { useNavigate } from 'react-router-dom'
import { useEditCityMutation, useGetAllCitiesQuery, useGetCityQuery } from '../features/citiesAPI'
import toast from "react-hot-toast";

export default function EditCity() {
  const navigate = useNavigate()
  const [idEditCity, setIdEditCity] = useState()
  const [city, setCity] = useState({})
  const [country, setCountry] = useState({})
  const [photo, setPhoto] = useState({})
  const [population, setPopulation] = useState({})
  const [fundation, setFundation] = useState({})
  const [editCity] = useEditCityMutation()
  const { data } = useGetCityQuery(idEditCity)
  const { data: citiesdb } = useGetAllCitiesQuery('')
  let array = [city, country, photo, population, fundation]
  let citydb
  let cities
  if (data) {
    citydb = data?.response
  } else {
    citydb = {}
  }
  if (citiesdb) {
    cities = citiesdb?.response
  } else {
    cities = []
  }

  useEffect(() => {
    setCity(citydb.city)
    setCountry(citydb.country)
    setPhoto(citydb.photo)
    setPopulation(citydb.population)
    setFundation((new Date(citydb.fundation)).getUTCFullYear())
  }, [citydb])

  const select = useRef()
  const formData = [{
    name: 'city',
    type: 'text',
    min: 4,
    max: 30
  },
  {
    name: 'country',
    type: 'text',
    min: 4,
    max: 30
  },
  {
    name: 'photo',
    type: 'text',
    min: 4,
    max: 30
  },
  {
    name: 'population',
    type: 'number',
    min: 1000,
    max: 100000000
  },
  {
    name: 'fundation',
    type: 'number',
    min: 1,
    max: 2022
  }
  ]
  const formRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(formRef.current)
    const body = Object.fromEntries(form)
    editCity({
      _id: idEditCity,
      ...body
    })
      .then(response => {
        console.log(response)
        if(response.data?.success) {
          navigate(`/cities/${idEditCity}`, { replace: true })
          toast(`${response.data.message}`, {
            icon: "👍",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          })
        }else{
          toast.error(`${response.error.data.message}`, {
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
        toast.error(`Could't be modified`, {
          icon: "😞",
          style: {
            borderRadius: ".5rem",
            background: "#3f3d56",
            color: "aliceblue",
          },
        })
        console.log(error)
      })
  }

  const edit = () => {
    setIdEditCity(select.current.value)
  }

  const showForm = (obj, i) => (
    <fieldset key={i} className='NewCitiesPage-fieldset'>
      <legend >{obj.name[0].toUpperCase() + obj.name.substring(1)}</legend>
      <InputEditCity min={obj.min} max={obj.max} type={obj.type} fnc={e => {
        if (obj.name === "city") {
          return setCity(e.target.value)
        } else if (obj.name === "country") {
          return setCountry(e.target.value)
        } else if (obj.name === "photo") {
          return setPhoto(e.target.value)
        } else if (obj.name === "population") {
          return setPopulation(e.target.value)
        } else {
          return setFundation(e.target.value)
        }
      }} name={obj.name} value={array[i]} />
    </fieldset>
  )

  return (
    <div className='EditCity-container'>
      <div className='EditCity-form-container'>
        <h3>Edit City</h3>
        <div className='EditCity-cityInformation'>
          <SelectForm refe={select} cities={cities} option={edit} />
        </div>
        <form className='NewCitiesPage-form' onSubmit={handleSubmit} ref={formRef}>
          {formData.map(showForm)}
          <button className='NewCitiesPage-btn' type='submit'>Edit</button>
        </form>
      </div>
    </div>
  )
}