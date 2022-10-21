import React from 'react'
import '../styles/SelectForm.css'

export default function SelectForm(props) {
  const option = (city) => (
    <option value={city._id} key={city._id}>{city.city}</option>
  )

  return (
    <select className='SelectForm-select' defaultValue={'Select'} ref={props.refe} name='select' onChange={props.option}>
      <option disabled value="Select">Select city</option>
      {
        props.cities.map(option)
      }
    </select>
  )
}