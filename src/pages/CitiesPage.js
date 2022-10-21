import React, { useState, useRef } from 'react'
import CityCard from '../components/CityCard'
import '../styles/CitiesPage.css'
import InputForm from '../components/InputForm'
import { useGetAllCitiesQuery } from '../features/citiesAPI';

export default function CitiesPage() {
  const [cityId, setCityId] = useState()
  const [value, setValue] = useState('')
  const inputSearch = useRef()
  const { data } = useGetAllCitiesQuery(value)

  const handleDetail = (id) => {
    setCityId(id)
  }
  const fn = () => {
    setValue(inputSearch.current.value)
  }
  return (
    <div className='CitiesPage-container'>
      <InputForm placeholder={' Search City'} type={'text'} refe={inputSearch} fnc={fn} />
      <div className='CitiesPage-cards'>{data?.response?.map((city) => <CityCard key={city._id} url={city.photo} id={city._id} city={cityId} handleDetail={handleDetail} name={city.city} />)}</div>
      {data?.response.length === 0 && <h3>No results</h3>}
    </div>
  )
}
