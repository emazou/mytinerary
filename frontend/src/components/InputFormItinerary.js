import React from 'react'

export default function InputFormItinerary(props) {
  return (
    <input className='Input-container' value={`${props.value ? props.value : ''}`} name={props.name} type={props.type} ref={props.refe} onChange={props.fnc} min={props.min} max={props.max} minLength={props.min} maxLength={props.max} required />
  )
}
